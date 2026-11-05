// ─── Types ────────────────────────────────────────────────────────────────────

export type WasmModuleStatus = "unregistered" | "loading" | "compiled" | "instantiated" | "error";
export type WasmSource = "rust" | "assemblyscript" | "emscripten" | "raw";

export interface WasmModuleDescriptor {
  id: string;
  url: string;
  source: WasmSource;
  description: string;
  exports?: string[];
}

export interface WasmModuleEntry {
  descriptor: WasmModuleDescriptor;
  status: WasmModuleStatus;
  instance: WebAssembly.Instance | null;
  compiledModule: WebAssembly.Module | null;
  error: Error | null;
  loadTimeMs: number | null;
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export class WasmRegistry {
  private modules = new Map<string, WasmModuleEntry>();
  private listeners = new Set<(id: string, entry: WasmModuleEntry) => void>();

  register(descriptor: WasmModuleDescriptor): void {
    this.modules.set(descriptor.id, {
      descriptor,
      status: "unregistered",
      instance: null,
      compiledModule: null,
      error: null,
      loadTimeMs: null,
    });
  }

  async load(id: string, imports?: WebAssembly.Imports): Promise<WasmModuleEntry> {
    const entry = this.modules.get(id);
    if (!entry) throw new Error(`[WasmRegistry] Module "${id}" not registered.`);

    this._update(id, { status: "loading" });
    const t0 = performance.now();

    try {
      const response = await fetch(entry.descriptor.url);
      const compiledModule = await WebAssembly.compileStreaming(response);
      this._update(id, { status: "compiled", compiledModule });

      const instance = await WebAssembly.instantiate(compiledModule, imports ?? {});
      const loadTimeMs = Math.round(performance.now() - t0);

      this._update(id, { status: "instantiated", instance, loadTimeMs });
      return this.modules.get(id)!;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      this._update(id, { status: "error", error });
      return this.modules.get(id)!;
    }
  }

  get(id: string): WasmModuleEntry | undefined {
    return this.modules.get(id);
  }

  getAll(): WasmModuleEntry[] {
    return Array.from(this.modules.values());
  }

  call<T = unknown>(id: string, fn: string, ...args: unknown[]): T {
    const entry = this.modules.get(id);
    if (!entry?.instance) throw new Error(`[WasmRegistry] Module "${id}" not instantiated.`);
    const exported = entry.instance.exports[fn];
    if (typeof exported !== "function") {
      throw new Error(`[WasmRegistry] Export "${fn}" is not a function in module "${id}".`);
    }
    return (exported as (...a: unknown[]) => T)(...args);
  }

  onChange(listener: (id: string, entry: WasmModuleEntry) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private _update(id: string, patch: Partial<WasmModuleEntry>): void {
    const entry = this.modules.get(id)!;
    const updated = { ...entry, ...patch };
    this.modules.set(id, updated);
    this.listeners.forEach((l) => l(id, updated));
  }
}

// ─── Execution Manager ────────────────────────────────────────────────────────

export interface ExecutionTask {
  id: string;
  moduleId: string;
  fn: string;
  args: unknown[];
  startTime: number;
  endTime: number | null;
  result: unknown;
  error: Error | null;
}

export class WasmExecutionManager {
  private tasks: ExecutionTask[] = [];

  constructor(private registry: WasmRegistry) {}

  async run<T = unknown>(moduleId: string, fn: string, ...args: unknown[]): Promise<T> {
    const task: ExecutionTask = {
      id: `${moduleId}:${fn}:${Date.now()}`,
      moduleId,
      fn,
      args,
      startTime: performance.now(),
      endTime: null,
      result: null,
      error: null,
    };

    try {
      const result = this.registry.call<T>(moduleId, fn, ...args);
      task.endTime = performance.now();
      task.result = result;
      this.tasks.push(task);
      return result;
    } catch (err) {
      task.endTime = performance.now();
      task.error = err instanceof Error ? err : new Error(String(err));
      this.tasks.push(task);
      throw task.error;
    }
  }

  getHistory(): ExecutionTask[] {
    return [...this.tasks];
  }

  getStats() {
    const completed = this.tasks.filter((t) => t.error === null);
    const durations = completed.map((t) => (t.endTime ?? t.startTime) - t.startTime);
    const avg = durations.length
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;
    return {
      total: this.tasks.length,
      succeeded: completed.length,
      failed: this.tasks.filter((t) => t.error !== null).length,
      avgExecutionMs: Math.round(avg * 100) / 100,
    };
  }
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createWasmPipeline() {
  const registry = new WasmRegistry();
  const executor = new WasmExecutionManager(registry);
  return { registry, executor };
}

export type WasmPipeline = ReturnType<typeof createWasmPipeline>;
