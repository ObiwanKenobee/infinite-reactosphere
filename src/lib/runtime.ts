import type { AppConfig, Renderer, Execution } from "./createApp";

export interface RuntimeCapabilities {
  webgpu: boolean;
  webgpuAdapterInfo: string | null;
  wasm: boolean;
  wasmThreads: boolean;
  wasmSIMD: boolean;
  sharedArrayBuffer: boolean;
  serviceWorker: boolean;
  webSockets: boolean;
  webRTC: boolean;
  offscreenCanvas: boolean;
}

export interface RuntimeContext {
  renderer: Renderer;
  execution: Execution;
  capabilities: RuntimeCapabilities;
  backend: {
    runtime: string;
    baseUrl: string;
    wsUrl: string;
  };
  performance: {
    startTime: number;
    marks: Record<string, number>;
  };
}

export interface RuntimeMetrics {
  fps: number;
  memoryMB: number | null;
  jsHeapMB: number | null;
  uptime: number;
}

async function detectWebGPUAdapter(): Promise<string | null> {
  if (!("gpu" in navigator)) return null;
  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    if (!adapter) return null;
    const info = await adapter.requestAdapterInfo?.();
    return info?.description ?? info?.vendor ?? "WebGPU available";
  } catch {
    return null;
  }
}

async function detectWasmFeatures(): Promise<{ threads: boolean; simd: boolean }> {
  if (typeof WebAssembly === "undefined") return { threads: false, simd: false };

  // SIMD detection via a minimal wasm binary
  const simdBytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00, 0x01, 0x05, 0x01, 0x60,
    0x00, 0x01, 0x7b, 0x03, 0x02, 0x01, 0x00, 0x0a, 0x0a, 0x01, 0x08, 0x00,
    0xfd, 0x0f, 0x00, 0x00, 0x00, 0x00, 0x0b,
  ]);

  let simd = false;
  try {
    await WebAssembly.compile(simdBytes);
    simd = true;
  } catch {
    simd = false;
  }

  const threads = typeof SharedArrayBuffer !== "undefined";
  return { threads, simd };
}

export async function detectCapabilities(): Promise<RuntimeCapabilities> {
  const [webgpuAdapterInfo, wasmFeatures] = await Promise.all([
    detectWebGPUAdapter(),
    detectWasmFeatures(),
  ]);

  return {
    webgpu: webgpuAdapterInfo !== null,
    webgpuAdapterInfo,
    wasm: typeof WebAssembly !== "undefined",
    wasmThreads: wasmFeatures.threads,
    wasmSIMD: wasmFeatures.simd,
    sharedArrayBuffer: typeof SharedArrayBuffer !== "undefined",
    serviceWorker: "serviceWorker" in navigator,
    webSockets: typeof WebSocket !== "undefined",
    webRTC: typeof RTCPeerConnection !== "undefined",
    offscreenCanvas: typeof OffscreenCanvas !== "undefined",
  };
}

export function selectRenderer(caps: RuntimeCapabilities, preferred?: Renderer): Renderer {
  if (preferred === "webgpu" && caps.webgpu) return "webgpu";
  return "dom";
}

export function selectExecution(caps: RuntimeCapabilities, preferred?: Execution): Execution {
  if (preferred === "wasm" && caps.wasm) return "wasm";
  return "js";
}

export async function createRuntime(config: AppConfig): Promise<RuntimeContext> {
  const capabilities = await detectCapabilities();
  const renderer = selectRenderer(capabilities, config.renderer);
  const execution = selectExecution(capabilities, config.execution);

  const ctx: RuntimeContext = {
    renderer,
    execution,
    capabilities,
    backend: {
      runtime: config.backend?.runtime ?? "edge",
      baseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
      wsUrl: import.meta.env.VITE_WS_URL ?? `ws://${location.host}/ws`,
    },
    performance: {
      startTime: performance.now(),
      marks: {},
    },
  };

  return ctx;
}

export function markPerformance(ctx: RuntimeContext, label: string): void {
  ctx.performance.marks[label] = performance.now() - ctx.performance.startTime;
}

export function getRuntimeMetrics(): RuntimeMetrics {
  const mem = (performance as any).memory;
  return {
    fps: 0, // populated by useRuntime hook via rAF
    memoryMB: mem ? Math.round(mem.totalJSHeapSize / 1024 / 1024) : null,
    jsHeapMB: mem ? Math.round(mem.usedJSHeapSize / 1024 / 1024) : null,
    uptime: Math.round(performance.now() / 1000),
  };
}
