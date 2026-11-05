import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { useRuntime } from "@/hooks/useRuntime";
import { useWebSocket } from "@/hooks/useApi";
import { createWasmPipeline, type WasmModuleEntry } from "@/lib/wasm-pipeline";
import {
  LayersIcon,
  ServerIcon,
  CpuIcon,
  NetworkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ActivityIcon,
  ZapIcon,
  GaugeIcon,
  TerminalIcon,
  RefreshCwIcon,
  WifiIcon,
  WifiOffIcon,
  DatabaseIcon,
  CodeIcon,
  BracesIcon,
} from "lucide-react";

// ─── Shared ───────────────────────────────────────────────────────────────────

const Badge = ({
  ok,
  label,
  detail,
}: {
  ok: boolean;
  label: string;
  detail?: string | null;
}) => (
  <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
    <div className="flex items-center gap-2">
      {ok ? (
        <CheckCircleIcon className="h-4 w-4 text-green-500" />
      ) : (
        <XCircleIcon className="h-4 w-4 text-muted-foreground/50" />
      )}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {detail && <span className="text-xs text-muted-foreground truncate max-w-[140px]">{detail}</span>}
  </div>
);

const MetricPill = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col items-center rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
    <span className="font-display text-xl font-bold text-primary">{value}</span>
    <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
  </div>
);

// ─── Pillar 1: Frontend ───────────────────────────────────────────────────────

const FrontendPillar = ({ ctx, metrics, loading }: {
  ctx: ReturnType<typeof useRuntime>["ctx"];
  metrics: ReturnType<typeof useRuntime>["metrics"];
  loading: boolean;
}) => (
  <GlassMorphicCard className="p-6 h-full" hoverEffect="glow" border="accent">
    <div className="flex items-center gap-3 mb-5">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <LayersIcon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold">Frontend</h3>
        <p className="text-xs text-muted-foreground">React · TypeScript · Vite · WebGPU</p>
      </div>
    </div>

    {loading ? (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCwIcon className="h-4 w-4 animate-spin" /> Detecting capabilities…
      </div>
    ) : (
      <div className="space-y-2">
        <Badge ok={true} label="React 18" detail="Concurrent mode" />
        <Badge ok={true} label="TypeScript" detail="Strict mode" />
        <Badge ok={true} label="Vite + SWC" detail="HMR active" />
        <Badge
          ok={ctx?.capabilities.webgpu ?? false}
          label="WebGPU"
          detail={ctx?.capabilities.webgpuAdapterInfo ?? "Not available"}
        />
        <Badge
          ok={ctx?.capabilities.offscreenCanvas ?? false}
          label="OffscreenCanvas"
          detail={ctx?.capabilities.offscreenCanvas ? "Available" : "Not available"}
        />
      </div>
    )}

    <div className="mt-5 grid grid-cols-3 gap-2">
      <MetricPill label="FPS" value={metrics.fps} />
      <MetricPill label="Heap MB" value={metrics.jsHeapMB ?? "—"} />
      <MetricPill label="Uptime s" value={metrics.uptime} />
    </div>

    <div className="mt-4 rounded-md bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
      <span className="text-primary">renderer</span>
      {" = "}
      <span className="text-green-500">"{ctx?.renderer ?? "…"}"</span>
      {" · "}
      <span className="text-primary">execution</span>
      {" = "}
      <span className="text-green-500">"{ctx?.execution ?? "…"}"</span>
    </div>
  </GlassMorphicCard>
);

// ─── Pillar 2: Backend ────────────────────────────────────────────────────────

const BackendPillar = ({ ctx }: { ctx: ReturnType<typeof useRuntime>["ctx"] }) => {
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [pinging, setPinging] = useState(false);

  const ping = async () => {
    setPinging(true);
    const t0 = performance.now();
    try {
      await fetch("/api/health").catch(() => null);
    } finally {
      const ms = Math.round(performance.now() - t0);
      setPingResult(`${ms}ms`);
      setPinging(false);
    }
  };

  return (
    <GlassMorphicCard className="p-6 h-full" hoverEffect="glow" border="accent">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <ServerIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">Backend</h3>
          <p className="text-xs text-muted-foreground">Rust · Edge Runtime · gRPC · GraphQL</p>
        </div>
      </div>

      <div className="space-y-2">
        <Badge ok={true} label="Edge Runtime" detail={ctx?.backend.runtime ?? "edge"} />
        <Badge ok={true} label="REST API" detail={ctx?.backend.baseUrl ?? "/api"} />
        <Badge ok={true} label="GraphQL" detail="/api/graphql" />
        <Badge ok={true} label="gRPC" detail="Planned — Phase 4" />
        <Badge ok={true} label="Rust WASM backend" detail="Planned — Phase 2" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">API Base URL</span>
          <code className="text-xs bg-muted px-2 py-0.5 rounded">
            {ctx?.backend.baseUrl ?? "/api"}
          </code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">WebSocket URL</span>
          <code className="text-xs bg-muted px-2 py-0.5 rounded truncate max-w-[160px]">
            {ctx?.backend.wsUrl ?? "ws://…"}
          </code>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="mt-4 w-full"
        onClick={ping}
        disabled={pinging}
      >
        {pinging ? (
          <RefreshCwIcon className="mr-2 h-3.5 w-3.5 animate-spin" />
        ) : (
          <ActivityIcon className="mr-2 h-3.5 w-3.5" />
        )}
        {pingResult ? `Last ping: ${pingResult}` : "Ping API"}
      </Button>
    </GlassMorphicCard>
  );
};

// ─── Pillar 3: WebAssembly ────────────────────────────────────────────────────

const wasmPipeline = createWasmPipeline();

// Register demo modules (URLs are illustrative — real .wasm files would live in /public)
wasmPipeline.registry.register({
  id: "math-utils",
  url: "/wasm/math-utils.wasm",
  source: "rust",
  description: "Fast numeric computation (add, multiply, fibonacci)",
  exports: ["add", "multiply", "fibonacci"],
});
wasmPipeline.registry.register({
  id: "image-proc",
  url: "/wasm/image-proc.wasm",
  source: "assemblyscript",
  description: "GPU-assisted image processing filters",
  exports: ["grayscale", "blur", "sharpen"],
});
wasmPipeline.registry.register({
  id: "crypto-utils",
  url: "/wasm/crypto-utils.wasm",
  source: "rust",
  description: "Cryptographic hashing and key derivation",
  exports: ["sha256", "pbkdf2"],
});

const WasmPillar = ({ ctx }: { ctx: ReturnType<typeof useRuntime>["ctx"] }) => {
  const [modules, setModules] = useState<WasmModuleEntry[]>(
    wasmPipeline.registry.getAll()
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    return wasmPipeline.registry.onChange(() => {
      setModules(wasmPipeline.registry.getAll());
    });
  }, []);

  const load = async (id: string) => {
    setLoadingId(id);
    await wasmPipeline.registry.load(id);
    setLoadingId(null);
  };

  const stats = wasmPipeline.executor.getStats();

  const statusColor: Record<string, string> = {
    unregistered: "text-muted-foreground",
    loading: "text-amber-500",
    compiled: "text-blue-500",
    instantiated: "text-green-500",
    error: "text-red-500",
  };

  const sourceTag: Record<string, string> = {
    rust: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    assemblyscript: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    emscripten: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    raw: "bg-muted text-muted-foreground",
  };

  return (
    <GlassMorphicCard className="p-6 h-full" hoverEffect="glow" border="accent">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <CpuIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">WebAssembly Pipeline</h3>
          <p className="text-xs text-muted-foreground">Rust · AssemblyScript · LLVM · Emscripten</p>
        </div>
      </div>

      <div className="space-y-2">
        <Badge ok={ctx?.capabilities.wasm ?? false} label="WebAssembly" detail="Available" />
        <Badge ok={ctx?.capabilities.wasmSIMD ?? false} label="WASM SIMD" detail={ctx?.capabilities.wasmSIMD ? "Supported" : "Not supported"} />
        <Badge ok={ctx?.capabilities.wasmThreads ?? false} label="WASM Threads" detail={ctx?.capabilities.wasmThreads ? "SharedArrayBuffer active" : "Disabled"} />
      </div>

      <div className="mt-4 space-y-2">
        {modules.map((m) => (
          <div
            key={m.descriptor.id}
            className="flex items-center justify-between rounded-md border border-border/50 bg-muted/20 px-3 py-2"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">{m.descriptor.id}</span>
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${sourceTag[m.descriptor.source]}`}>
                  {m.descriptor.source}
                </span>
              </div>
              <span className={`text-xs ${statusColor[m.status]}`}>{m.status}</span>
              {m.loadTimeMs && (
                <span className="ml-2 text-xs text-muted-foreground">{m.loadTimeMs}ms</span>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="shrink-0 h-7 px-2 text-xs"
              disabled={m.status === "instantiated" || loadingId === m.descriptor.id}
              onClick={() => load(m.descriptor.id)}
            >
              {loadingId === m.descriptor.id ? (
                <RefreshCwIcon className="h-3 w-3 animate-spin" />
              ) : m.status === "instantiated" ? (
                <CheckCircleIcon className="h-3 w-3 text-green-500" />
              ) : (
                "Load"
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <MetricPill label="Total" value={stats.total} />
        <MetricPill label="OK" value={stats.succeeded} />
        <MetricPill label="Avg ms" value={stats.avgExecutionMs} />
      </div>
    </GlassMorphicCard>
  );
};

// ─── Pillar 4: API & Data Flow ────────────────────────────────────────────────

const ApiPillar = () => {
  const { status, send, lastMessage } = useWebSocket(false);
  const [log, setLog] = useState<string[]>([
    "// API & Data Flow layer initialized",
    "// REST · GraphQL · WebSocket · gRPC",
  ]);

  const appendLog = (line: string) =>
    setLog((prev) => [...prev.slice(-19), line]);

  useEffect(() => {
    if (lastMessage) {
      appendLog(`← ws: ${JSON.stringify(lastMessage)}`);
    }
  }, [lastMessage]);

  const simulateRest = async () => {
    appendLog("→ GET /api/health");
    const t0 = performance.now();
    try {
      const res = await fetch("/api/health");
      const ms = Math.round(performance.now() - t0);
      appendLog(`← ${res.status} (${ms}ms)`);
    } catch {
      appendLog("← Network error (no server running)");
    }
  };

  const simulateGraphQL = () => {
    appendLog('→ query { systemStatus { version uptime } }');
    appendLog("← (GraphQL endpoint not yet live — Phase 4)");
  };

  const connectWs = () => {
    appendLog(`→ WebSocket connect: ws://${location.host}/ws`);
    send("ping", { ts: Date.now() });
    appendLog("← (WebSocket server not yet live — Phase 4)");
  };

  const wsStatusColor: Record<string, string> = {
    open: "text-green-500",
    connecting: "text-amber-500",
    closed: "text-muted-foreground",
    error: "text-red-500",
  };

  return (
    <GlassMorphicCard className="p-6 h-full" hoverEffect="glow" border="accent">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <NetworkIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">API & Data Flow</h3>
          <p className="text-xs text-muted-foreground">REST · GraphQL · WebSocket · gRPC</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <Badge ok={true} label="REST Client" detail="Typed fetch wrapper" />
        <Badge ok={true} label="GraphQL Client" detail="Query + Mutation" />
        <Badge ok={typeof WebSocket !== "undefined"} label="WebSocket Manager" detail="Auto-reconnect" />
        <Badge ok={false} label="gRPC" detail="Planned — Phase 4" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        {status === "open" ? (
          <WifiIcon className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOffIcon className="h-4 w-4 text-muted-foreground" />
        )}
        <span className={`text-xs font-medium ${wsStatusColor[status]}`}>
          WebSocket: {status}
        </span>
      </div>

      {/* Terminal log */}
      <div className="rounded-md bg-black/80 p-3 font-mono text-xs h-32 overflow-y-auto space-y-0.5">
        {log.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("→")
                ? "text-blue-400"
                : line.startsWith("←")
                ? "text-green-400"
                : "text-white/40"
            }
          >
            {line}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" className="text-xs" onClick={simulateRest}>
          <DatabaseIcon className="mr-1.5 h-3 w-3" /> REST
        </Button>
        <Button size="sm" variant="outline" className="text-xs" onClick={simulateGraphQL}>
          <BracesIcon className="mr-1.5 h-3 w-3" /> GraphQL
        </Button>
        <Button size="sm" variant="outline" className="text-xs" onClick={connectWs}>
          <WifiIcon className="mr-1.5 h-3 w-3" /> WebSocket
        </Button>
      </div>
    </GlassMorphicCard>
  );
};

// ─── Tech Stack Table ─────────────────────────────────────────────────────────

const stackRows = [
  { layer: "Frontend", techs: ["React 18", "TypeScript", "Vite + SWC", "Tailwind CSS"], status: "active" },
  { layer: "Graphics", techs: ["WebGPU", "Canvas 2D", "OffscreenCanvas"], status: "partial" },
  { layer: "Execution", techs: ["WebAssembly", "WASM SIMD", "WASM Threads"], status: "partial" },
  { layer: "Compilation", techs: ["Rust + wasm-bindgen", "AssemblyScript", "LLVM", "Emscripten"], status: "planned" },
  { layer: "Backend", techs: ["Rust", "Edge Runtime", "Cloudflare Workers"], status: "planned" },
  { layer: "APIs", techs: ["REST", "GraphQL", "gRPC", "tRPC"], status: "partial" },
  { layer: "Real-time", techs: ["WebSockets", "Server-Sent Events", "Pub/Sub"], status: "partial" },
  { layer: "Infrastructure", techs: ["Docker", "Kubernetes", "CDN"], status: "planned" },
  { layer: "Optimization", techs: ["AI-assisted profiling", "Adaptive caching"], status: "planned" },
];

const statusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  partial: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  planned: "bg-muted text-muted-foreground",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const TechStack = () => {
  const { ctx, metrics, loading } = useRuntime({
    name: "TechStackDemo",
    renderer: "webgpu",
    execution: "wasm",
    optimization: { enabled: true, strategy: "adaptive" },
    backend: { runtime: "edge" },
  });

  return (
    <DashboardLayout
      title="Technology Stack"
      description="Live view of the Frontend · Backend · WebAssembly · API & Data Flow pillars"
    >
      <div className="grid gap-8">
        {/* Live runtime banner */}
        <AnimatedTransition animationType="slide-up" delay={50}>
          <GlassMorphicCard className="p-4" border="accent">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Runtime Active</span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GaugeIcon className="h-3.5 w-3.5" /> {metrics.fps} FPS
                </span>
                <span className="flex items-center gap-1">
                  <ActivityIcon className="h-3.5 w-3.5" /> {metrics.jsHeapMB ?? "—"} MB heap
                </span>
                <span className="flex items-center gap-1">
                  <ZapIcon className="h-3.5 w-3.5" /> {metrics.uptime}s uptime
                </span>
                <span className="flex items-center gap-1">
                  <TerminalIcon className="h-3.5 w-3.5" />
                  renderer: <strong className="text-foreground">{ctx?.renderer ?? "…"}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <CodeIcon className="h-3.5 w-3.5" />
                  execution: <strong className="text-foreground">{ctx?.execution ?? "…"}</strong>
                </span>
              </div>
            </div>
          </GlassMorphicCard>
        </AnimatedTransition>

        {/* Four pillars */}
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedTransition animationType="scale" delay={100}>
            <FrontendPillar ctx={ctx} metrics={metrics} loading={loading} />
          </AnimatedTransition>
          <AnimatedTransition animationType="scale" delay={200}>
            <BackendPillar ctx={ctx} />
          </AnimatedTransition>
          <AnimatedTransition animationType="scale" delay={300}>
            <WasmPillar ctx={ctx} />
          </AnimatedTransition>
          <AnimatedTransition animationType="scale" delay={400}>
            <ApiPillar />
          </AnimatedTransition>
        </div>

        {/* Tech stack table */}
        <AnimatedTransition animationType="slide-up" delay={500}>
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">Full Technology Stack</h2>
            <GlassMorphicCard className="overflow-hidden" border="subtle">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/30">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Layer</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Technologies</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stackRows.map((row, i) => (
                      <tr
                        key={row.layer}
                        className={`border-b border-border/30 ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                      >
                        <td className="px-4 py-3 font-medium">{row.layer}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {row.techs.map((t) => (
                              <span
                                key={t}
                                className="rounded bg-primary/5 border border-primary/10 px-2 py-0.5 text-xs"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[row.status]}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassMorphicCard>
          </section>
        </AnimatedTransition>
      </div>
    </DashboardLayout>
  );
};

export default TechStack;
