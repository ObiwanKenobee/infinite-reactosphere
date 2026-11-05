import { useState, useEffect, useCallback, useRef } from "react";
import { createApiLayer, type ApiLayer, type WsStatus } from "@/lib/api";

// Singleton API layer — shared across the app
let _apiLayer: ApiLayer | null = null;

function getApiLayer(): ApiLayer {
  if (!_apiLayer) {
    _apiLayer = createApiLayer(
      import.meta.env.VITE_API_BASE_URL ?? "/api",
      import.meta.env.VITE_WS_URL ?? `ws://${location.host}/ws`
    );
  }
  return _apiLayer;
}

// ─── useApi ───────────────────────────────────────────────────────────────────

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
  refetch: () => void;
}

export function useFetch<T>(path: string, enabled = true): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const counterRef = useRef(0);

  const fetch = useCallback(() => {
    if (!enabled) return;
    const id = ++counterRef.current;
    setLoading(true);
    setError(null);

    getApiLayer()
      .rest.get<T>(path)
      .then((res) => {
        if (id !== counterRef.current) return;
        setData(res.data);
        setError(res.error);
        setLatencyMs(Math.round(res.latencyMs));
        setLoading(false);
      });
  }, [path, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, latencyMs, refetch: fetch };
}

// ─── useGraphQL ───────────────────────────────────────────────────────────────

export interface UseGraphQLResult<T> {
  data: T | null;
  loading: boolean;
  errors: string[] | null;
  latencyMs: number | null;
  execute: (variables?: Record<string, unknown>) => void;
}

export function useGraphQL<T>(query: string): UseGraphQLResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const execute = useCallback((variables?: Record<string, unknown>) => {
    setLoading(true);
    setErrors(null);

    getApiLayer()
      .graphql.query<T>(query, variables)
      .then((res) => {
        setData(res.data);
        setErrors(res.errors?.map((e) => e.message) ?? null);
        setLatencyMs(Math.round(res.latencyMs));
        setLoading(false);
      });
  }, [query]);

  return { data, loading, errors, latencyMs, execute };
}

// ─── useWebSocket ─────────────────────────────────────────────────────────────

export interface UseWebSocketResult {
  status: WsStatus;
  send: (type: string, payload: unknown) => void;
  lastMessage: { type: string; payload: unknown } | null;
}

export function useWebSocket(autoConnect = false): UseWebSocketResult {
  const [status, setStatus] = useState<WsStatus>("closed");
  const [lastMessage, setLastMessage] = useState<{ type: string; payload: unknown } | null>(null);

  useEffect(() => {
    const ws = getApiLayer().ws;
    const unsubStatus = ws.onStatusChange(setStatus);
    const unsubMsg = ws.on<{ type: string; payload: unknown }>("*", setLastMessage);

    if (autoConnect) ws.connect();

    return () => {
      unsubStatus();
      unsubMsg();
    };
  }, [autoConnect]);

  const send = useCallback((type: string, payload: unknown) => {
    getApiLayer().ws.send(type, payload);
  }, []);

  return { status, send, lastMessage };
}

export { getApiLayer };
