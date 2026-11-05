import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayersIcon, CpuIcon, MonitorIcon, ServerIcon, BrainIcon, CodeIcon,
  CheckIcon, CircleIcon, ArrowRightIcon, ExternalLinkIcon,
  GitBranchIcon, UsersIcon, ZapIcon, ShieldIcon, GlobeIcon, BarChart3Icon,
} from "lucide-react";

// ─── Shared phase data (single source of truth) ───────────────────────────────

type PhaseStatus = "done" | "active" | "upcoming";

interface Milestone {
  label: string;
  done: boolean;
  link?: string;
}

interface PhaseDetail {
  number: number;
  title: string;
  icon: React.ReactNode;
  status: PhaseStatus;
  description: string;
  techStack: string[];
  milestones: Milestone[];
  link?: string;
  linkLabel?: string;
  contributionAreas: string[];
}

const phases: PhaseDetail[] = [
  {
    number: 1,
    title: "Architectural Foundation",
    icon: <LayersIcon className="h-5 w-5" />,
    status: "active",
    description:
      "The foundation phase establishes the core React + TypeScript architecture, the runtime capability detection engine, the createApp API, and all typed contracts that subsequent phases depend on. This phase is the skeleton of React Infinite.",
    techStack: ["React 18", "TypeScript 5", "Vite + SWC", "Tailwind CSS", "React Router", "TanStack Query"],
    milestones: [
      { label: "Core architecture defined", done: true },
      { label: "React + TypeScript foundation", done: true },
      { label: "Module system design", done: true },
      { label: "createApp API", done: true, link: "/tech-stack" },
      { label: "Runtime capability detection", done: true, link: "/tech-stack" },
      { label: "AppConfig type system", done: true, link: "/tech-stack" },
      { label: "DashboardLayout + navigation", done: true, link: "/dashboard" },
      { label: "Landing page sections", done: true },
      { label: "Performance benchmarks baseline", done: false },
      { label: "API contracts defined", done: true, link: "/tech-stack" },
    ],
    link: "/tech-stack",
    linkLabel: "Tech Stack",
    contributionAreas: ["React architecture", "TypeScript patterns", "Design system", "Performance benchmarking"],
  },
  {
    number: 2,
    title: "Execution Engine",
    icon: <CpuIcon className="h-5 w-5" />,
    status: "active",
    description:
      "The execution engine introduces WebAssembly as a first-class execution target. The WASM registry, execution manager, and useWasm hook form the core of this phase. Rust integration and AssemblyScript compilation pipelines are the next milestones.",
    techStack: ["WebAssembly", "Rust + wasm-bindgen", "AssemblyScript", "WASM SIMD", "SharedArrayBuffer"],
    milestones: [
      { label: "WASM module registry", done: true, link: "/tech-stack" },
      { label: "WasmExecutionManager", done: true, link: "/tech-stack" },
      { label: "useWasm hook", done: true, link: "/docs" },
      { label: "SIMD + Threads detection", done: true, link: "/tech-stack" },
      { label: "Module load/compile/instantiate pipeline", done: true, link: "/tech-stack" },
      { label: "Execution history + stats", done: true, link: "/tech-stack" },
      { label: "Rust wasm-bindgen integration", done: false },
      { label: "AssemblyScript compilation pipeline", done: false },
      { label: "Custom Vite WASM plugin", done: false },
      { label: "LLVM toolchain integration", done: false },
    ],
    link: "/tech-stack",
    linkLabel: "WASM Pipeline",
    contributionAreas: ["Rust", "WebAssembly", "AssemblyScript", "Compiler infrastructure", "Vite plugins"],
  },
  {
    number: 3,
    title: "Rendering Infrastructure",
    icon: <MonitorIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "This phase builds the rendering abstraction that selects between React DOM and WebGPU at runtime based on device capabilities. GPU-accelerated components, OffscreenCanvas workers, and visualization benchmarks are the primary deliverables.",
    techStack: ["WebGPU", "WGSL shaders", "OffscreenCanvas", "Canvas 2D", "Web Workers", "Recharts"],
    milestones: [
      { label: "WebGPU adapter detection", done: true, link: "/tech-stack" },
      { label: "Renderer abstraction layer (DOM / WebGPU)", done: false },
      { label: "WebGPU device + context setup", done: false },
      { label: "WGSL shader pipeline", done: false },
      { label: "OffscreenCanvas worker integration", done: false },
      { label: "GPU-accelerated chart component", done: false },
      { label: "3D scene prototype", done: false },
      { label: "Rendering performance benchmarks", done: false },
      { label: "Fallback DOM renderer", done: false },
      { label: "Visualization examples", done: false },
    ],
    link: "/components",
    linkLabel: "Component Library",
    contributionAreas: ["WebGPU", "WGSL shaders", "Graphics programming", "Canvas API", "Performance engineering"],
  },
  {
    number: 4,
    title: "Distributed Infrastructure",
    icon: <ServerIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "The backend phase brings Rust-powered edge services, a live WebSocket server, GraphQL endpoint, gRPC integration, and distributed caching. This phase makes React Infinite a true full-stack platform.",
    techStack: ["Rust", "Cloudflare Workers", "GraphQL", "gRPC", "WebSockets", "Redis", "Docker", "Kubernetes"],
    milestones: [
      { label: "REST API typed client", done: true, link: "/tech-stack" },
      { label: "GraphQL client (query + mutation)", done: true, link: "/tech-stack" },
      { label: "WebSocket manager (auto-reconnect)", done: true, link: "/tech-stack" },
      { label: "Rust backend service scaffold", done: false },
      { label: "Live WebSocket server", done: false },
      { label: "GraphQL endpoint", done: false },
      { label: "gRPC integration", done: false },
      { label: "Edge runtime deployment (Cloudflare)", done: false },
      { label: "Distributed caching layer", done: false },
      { label: "Server-Sent Events", done: false },
      { label: "Pub/Sub system", done: false },
    ],
    link: "/dashboard",
    linkLabel: "Developer Dashboard",
    contributionAreas: ["Rust", "Edge computing", "GraphQL", "gRPC", "WebSockets", "Distributed systems"],
  },
  {
    number: 5,
    title: "Intelligence & Optimization",
    icon: <BrainIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "The intelligence phase adds AI-assisted performance profiling, adaptive caching, predictive resource preloading, and real-time optimization recommendations. The runtime metrics infrastructure built in Phase 1 feeds directly into this layer.",
    techStack: ["TensorFlow.js", "ONNX Runtime Web", "Web Workers", "IndexedDB", "Service Workers", "Performance API"],
    milestones: [
      { label: "Runtime metrics (FPS, heap, uptime)", done: true, link: "/tech-stack" },
      { label: "Performance mark system", done: true, link: "/tech-stack" },
      { label: "Performance profiling infrastructure", done: false },
      { label: "AI model integration (ONNX / TF.js)", done: false },
      { label: "Optimization recommendation engine", done: false },
      { label: "Adaptive caching strategy", done: false },
      { label: "Predictive resource preloading", done: false },
      { label: "Energy efficiency mode", done: false },
      { label: "Workload analysis engine", done: false },
      { label: "Before/after performance reports", done: false },
    ],
    link: "/ai-optimization",
    linkLabel: "AI Optimization",
    contributionAreas: ["AI/ML", "Performance engineering", "TensorFlow.js", "ONNX", "Service Workers"],
  },
  {
    number: 6,
    title: "Developer Ecosystem",
    icon: <CodeIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "The final phase delivers the developer-facing ecosystem: a CLI, published npm packages, interactive playground, benchmarking suite, and the first public developer preview. This phase turns React Infinite from an internal architecture into a community platform.",
    techStack: ["Node.js CLI", "npm packages", "Storybook", "Vitest", "Playwright", "GitHub Actions"],
    milestones: [
      { label: "Documentation structure", done: true, link: "/docs" },
      { label: "Component library scaffold", done: true, link: "/components" },
      { label: "Module store scaffold", done: true, link: "/module-store" },
      { label: "Community hub scaffold", done: true, link: "/community" },
      { label: "CLI scaffold (infinite create / dev / build)", done: false },
      { label: "npm package publishing (@react-infinite/core)", done: false },
      { label: "Interactive playground", done: false },
      { label: "Storybook component docs", done: false },
      { label: "Benchmarking suite", done: false },
      { label: "CI/CD pipeline", done: false },
      { label: "Developer preview release", done: false },
    ],
    link: "/community",
    linkLabel: "Community Hub",
    contributionAreas: ["CLI tooling", "Documentation", "Testing", "CI/CD", "Developer experience"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<PhaseStatus, { dot: string; badge: string; badgeText: string }> = {
  done:     { dot: "bg-green-500 border-green-500", badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", badgeText: "Complete" },
  active:   { dot: "bg-primary border-primary", badge: "bg-primary/10 text-primary", badgeText: "In Progress" },
  upcoming: { dot: "bg-muted border-border", badge: "bg-muted text-muted-foreground", badgeText: "Upcoming" },
};

function progress(phase: PhaseDetail) {
  const done = phase.milestones.filter((m) => m.done).length;
  return { done, total: phase.milestones.length, pct: Math.round((done / phase.milestones.length) * 100) };
}

// ─── Phase Card ───────────────────────────────────────────────────────────────

const PhaseCard = ({ phase, index }: { phase: PhaseDetail; index: number }) => {
  const [open, setOpen] = useState(phase.status === "active");
  const cfg = statusConfig[phase.status];
  const { done, total, pct } = progress(phase);

  return (
    <AnimatedTransition delay={80 * index} animationType="slide-up">
      <GlassMorphicCard
        className="overflow-hidden"
        border={phase.status === "active" ? "accent" : "subtle"}
        hoverEffect="lift"
      >
        {/* Header */}
        <button className="w-full text-left p-6" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-start gap-4">
            {/* Phase number + icon */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold",
                cfg.dot,
                phase.status !== "upcoming" ? "text-white" : "text-muted-foreground"
              )}>
                {phase.status === "done" ? <CheckIcon className="h-5 w-5" /> : phase.number}
              </div>
              <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                {phase.icon}
              </div>
            </div>

            {/* Title + progress */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-display text-lg font-semibold">Phase {phase.number}: {phase.title}</h3>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", cfg.badge)}>
                  {cfg.badgeText}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{phase.description}</p>

              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{done} / {total} milestones</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700",
                      phase.status === "done" ? "bg-green-500" :
                      phase.status === "active" ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Expanded body */}
        {open && (
          <div className="border-t border-border/40 px-6 pb-6 pt-4 space-y-6">

            {/* Tech stack */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {phase.techStack.map((t) => (
                  <span key={t} className="rounded bg-primary/5 border border-primary/10 px-2 py-0.5 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Milestones</h4>
              <div className="grid gap-1 sm:grid-cols-2">
                {phase.milestones.map((m) => (
                  <div key={m.label} className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-muted/30 transition-colors">
                    <div className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded",
                      m.done ? "bg-primary text-primary-foreground" : "border border-border bg-background"
                    )}>
                      {m.done && <CheckIcon className="h-2.5 w-2.5" />}
                    </div>
                    <span className={cn("text-sm flex-1", m.done ? "text-foreground" : "text-muted-foreground")}>
                      {m.label}
                    </span>
                    {m.link && m.done && (
                      <Link to={m.link} className="text-primary hover:text-primary/80 shrink-0">
                        <ExternalLinkIcon className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution areas */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contribution Areas</h4>
              <div className="flex flex-wrap gap-1.5">
                {phase.contributionAreas.map((a) => (
                  <span key={a} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {phase.link && (
              <Button asChild size="sm" variant="outline" className="group">
                <Link to={phase.link}>
                  {phase.linkLabel ?? "View"}
                  <ArrowRightIcon className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        )}
      </GlassMorphicCard>
    </AnimatedTransition>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const RoadmapPage = () => {
  const allMilestones = phases.flatMap((p) => p.milestones);
  const totalDone = allMilestones.filter((m) => m.done).length;
  const totalAll = allMilestones.length;
  const overallPct = Math.round((totalDone / totalAll) * 100);

  const activePhases = phases.filter((p) => p.status === "active").length;
  const donePhases = phases.filter((p) => p.status === "done").length;

  return (
    <DashboardLayout
      title="Development Roadmap"
      description="Six phases from architectural foundation to a full developer ecosystem"
    >
      <div className="grid gap-8">

        {/* Summary stats */}
        <AnimatedTransition animationType="slide-up" delay={50}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <BarChart3Icon className="h-5 w-5" />, label: "Overall Progress", value: `${overallPct}%`, sub: `${totalDone} / ${totalAll} milestones` },
              { icon: <ZapIcon className="h-5 w-5" />, label: "Active Phases", value: activePhases, sub: "Currently in progress" },
              { icon: <CheckIcon className="h-5 w-5" />, label: "Phases Complete", value: donePhases, sub: `of ${phases.length} total` },
              { icon: <GitBranchIcon className="h-5 w-5" />, label: "Contribution Areas", value: [...new Set(phases.flatMap((p) => p.contributionAreas))].length, sub: "Open to contributors" },
            ].map((stat) => (
              <GlassMorphicCard key={stat.label} className="p-5" hoverEffect="lift">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-primary/10 p-1.5 text-primary">{stat.icon}</div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="font-display text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </GlassMorphicCard>
            ))}
          </div>
        </AnimatedTransition>

        {/* Overall progress bar */}
        <AnimatedTransition animationType="fade" delay={150}>
          <GlassMorphicCard className="p-5" border="accent">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Roadmap Progress</span>
              <span className="text-sm font-bold text-primary">{overallPct}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {phases.map((p) => {
                const { pct } = progress(p);
                const cfg = statusConfig[p.status];
                return (
                  <div key={p.number} className="flex items-center gap-1.5">
                    <div className={cn("h-2 w-2 rounded-full", cfg.dot)} />
                    <span>P{p.number}: {pct}%</span>
                  </div>
                );
              })}
            </div>
          </GlassMorphicCard>
        </AnimatedTransition>

        {/* Phase cards */}
        <div className="space-y-4">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.number} phase={phase} index={i} />
          ))}
        </div>

        {/* Guiding principles */}
        <AnimatedTransition animationType="slide-up" delay={200}>
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">Guiding Principles</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: <ZapIcon className="h-5 w-5" />, title: "Performance First", desc: "Every optimization must be measurable. No theoretical claims without benchmarks." },
                { icon: <CodeIcon className="h-5 w-5" />, title: "Developer Experience", desc: "Advanced technology should simplify development, not complicate it." },
                { icon: <LayersIcon className="h-5 w-5" />, title: "Open Architecture", desc: "Modular components with clearly defined interfaces and extension points." },
                { icon: <GlobeIcon className="h-5 w-5" />, title: "Interoperability", desc: "Work with the existing JavaScript and Web ecosystem, not against it." },
                { icon: <ShieldIcon className="h-5 w-5" />, title: "Security by Design", desc: "Security is foundational — encryption, auth, and safe execution boundaries." },
                { icon: <BarChart3Icon className="h-5 w-5" />, title: "Evidence-Based", desc: "Architectural decisions supported by experiments and published benchmarks." },
              ].map((p) => (
                <GlassMorphicCard key={p.title} className="p-5" hoverEffect="lift">
                  <div className="mb-3 rounded-lg bg-primary/10 p-2 text-primary w-fit">{p.icon}</div>
                  <h3 className="font-display font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </GlassMorphicCard>
              ))}
            </div>
          </section>
        </AnimatedTransition>

        {/* Contribute CTA */}
        <AnimatedTransition animationType="fade" delay={300}>
          <GlassMorphicCard className="p-6 md:p-8" border="accent" hoverEffect="glow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <UsersIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-xl font-semibold">Contribute to React Infinite</h3>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Architecture discussions, research, experimental implementations, and code contributions are all welcome.
                  Every phase has open contribution areas.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button asChild>
                  <Link to="/community">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Community Hub
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/docs">
                    <CodeIcon className="mr-2 h-4 w-4" />
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </GlassMorphicCard>
        </AnimatedTransition>

      </div>
    </DashboardLayout>
  );
};

export default RoadmapPage;
