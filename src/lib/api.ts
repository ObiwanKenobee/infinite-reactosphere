// ─── Types ────────────────────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  latencyMs: number;
}

export interface GraphQLResponse<T> {
  data: T | null;
  errors: { message: string }[] | null;
  latencyMs: number;
}

export type WsMessageHandler<T = unknown> = (data: T) => void;
export type WsStatus = "connecting" | "open" | "closed" | "error";

// ─── REST Client ──────────────────────────────────────────────────────────────

export class RestClient {
  constructor(private baseUrl: string) {}

  async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const t0 = performance.now();
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = res.ok ? ((await res.json()) as T) : null;
      const error = res.ok ? null : `HTTP ${res.status}: ${res.statusText}`;
      return { data, error, status: res.status, latencyMs: performance.now() - t0 };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Network error",
        status: 0,
        latencyMs: performance.now() - t0,
      };
    }
  }

  get<T>(path: string, headers?: Record<string, string>) {
    return this.request<T>("GET", path, undefined, headers);
  }

  post<T>(path: string, body: unknown, headers?: Record<string, string>) {
    return this.request<T>("POST", path, body, headers);
  }

  put<T>(path: string, body: unknown) {
    return this.request<T>("PUT", path, body);
  }

  delete<T>(path: string) {
    return this.request<T>("DELETE", path);
  }
}

// ─── GraphQL Client ───────────────────────────────────────────────────────────

export class GraphQLClient {
  constructor(private endpoint: string) {}

  async query<T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<GraphQLResponse<T>> {
    const t0 = performance.now();
    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
      });
      const json = await res.json();
      return {
        data: json.data ?? null,
        errors: json.errors ?? null,
        latencyMs: performance.now() - t0,
      };
    } catch (err) {
      return {
        data: null,
        errors: [{ message: err instanceof Error ? err.message : "GraphQL error" }],
        latencyMs: performance.now() - t0,
      };
    }
  }

  mutate<T>(mutation: string, variables?: Record<string, unknown>) {
    return this.query<T>(mutation, variables);
  }
}

// ─── WebSocket Manager ────────────────────────────────────────────────────────

export class WsManager {
  private ws: WebSocket | null = null;
  private handlers = new Map<string, Set<WsMessageHandler>>();
  private statusListeners = new Set<(s: WsStatus) => void>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectDelay = 2000;

  status: WsStatus = "closed";

  constructor(private url: string) {}

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    this._setStatus("connecting");

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => this._setStatus("open");

      this.ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data as string) as { type: string; payload: unknown };
          this.handlers.get(msg.type)?.forEach((h) => h(msg.payload));
          this.handlers.get("*")?.forEach((h) => h(msg));
        } catch {
          // non-JSON frame — ignore
        }
      };

      this.ws.onerror = () => this._setStatus("error");

      this.ws.onclose = () => {
        this._setStatus("closed");
        this.reconnectTimer = setTimeout(() => this.connect(), this.reconnectDelay);
      };
    } catch {
      this._setStatus("error");
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  send(type: string, payload: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  on<T>(type: string, handler: WsMessageHandler<T>): () => void {
    if (!this.handlers.has(type)) this.handlers.set(type, new Set());
    this.handlers.get(type)!.add(handler as WsMessageHandler);
    return () => this.handlers.get(type)?.delete(handler as WsMessageHandler);
  }

  onStatusChange(listener: (s: WsStatus) => void): () => void {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }

  private _setStatus(s: WsStatus): void {
    this.status = s;
    this.statusListeners.forEach((l) => l(s));
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createApiLayer(baseUrl: string, wsUrl: string) {
  return {
    rest: new RestClient(baseUrl),
    graphql: new GraphQLClient(`${baseUrl}/graphql`),
    ws: new WsManager(wsUrl),
  };
}

export type ApiLayer = ReturnType<typeof createApiLayer>;
