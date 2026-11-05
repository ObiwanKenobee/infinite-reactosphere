import React, { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "../ui/AnimatedTransition";
import GlassMorphicCard from "../ui/GlassMorphicCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LayersIcon, CpuIcon, MonitorIcon, ServerIcon, BrainIcon, CodeIcon,
  CheckIcon, CircleIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon,
  ExternalLinkIcon,
} from "lucide-react";

interface RoadmapProps { className?: string; }

type PhaseStatus = "done" | "active" | "upcoming";

interface PhaseItem {
  label: string;
  done: boolean;
  link?: string;
}

interface Phase {
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: PhaseStatus;
  description: string;
  items: PhaseItem[];
  link?: string;
  linkLabel?: string;
}

const phases: Phase[] = [
  {
    number: 1,
    title: "Architectural Foundation",
    subtitle: "Phase 1 — In Progress",
    icon: <LayersIcon className="h-5 w-5" />,
    status: "active",
    description:
      "Establishing the core React + TypeScript foundation, module system, API contracts, and the runtime capability layer that all other phases build on.",
    items: [
      { label: "Core architecture defined", done: true },
      { label: "React + TypeScript foundation", done: true },
      { label: "Module system design", done: true },
      { label: "createApp API", done: true, link: "/tech-stack" },
      { label: "Runtime capability detection", done: true, link: "/tech-stack" },
      { label: "Performance benchmarks baseline", done: false },
      { label: "API contracts defined", done: true, link: "/tech-stack" },
    ],
    link: "/tech-stack",
    linkLabel: "View Tech Stack",
  },
  {
    number: 2,
    title: "Execution Engine",
    subtitle: "Phase 2 — In Progress",
    icon: <CpuIcon className="h-5 w-5" />,
    status: "active",
    description:
      "WebAssembly module registry, execution manager, Rust integration stubs, and the WASM pipeline that enables near-native computation in the browser.",
    items: [
      { label: "WASM module registry", done: true, link: "/tech-stack" },
      { label: "WasmExecutionManager", done: true, link: "/tech-stack" },
      { label: "useWasm hook", done: true, link: "/docs" },
      { label: "SIMD + Threads detection", done: true, link: "/tech-stack" },
      { label: "Rust wasm-bindgen integration", done: false },
      { label: "AssemblyScript compilation pipeline", done: false },
      { label: "Module execution management", done: true, link: "/tech-stack" },
    ],
    link: "/tech-stack",
    linkLabel: "View WASM Pipeline",
  },
  {
    number: 3,
    title: "Rendering Infrastructure",
    subtitle: "Phase 3 — Upcoming",
    icon: <MonitorIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "Rendering abstraction layer that selects between DOM and WebGPU at runtime, GPU-accelerated visualization components, and performance benchmarks.",
    items: [
      { label: "Renderer abstraction (DOM / WebGPU)", done: false },
      { label: "WebGPU adapter detection", done: true, link: "/tech-stack" },
      { label: "WebGPU prototype renderer", done: false },
      { label: "OffscreenCanvas integration", done: false },
      { label: "Rendering performance benchmarks", done: false },
      { label: "GPU-accelerated chart components", done: false },
      { label: "Visualization examples", done: false },
    ],
    link: "/components",
    linkLabel: "Component Library",
  },
  {
    number: 4,
    title: "Distributed Infrastructure",
    subtitle: "Phase 4 — Upcoming",
    icon: <ServerIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "Backend services in Rust, edge execution via Cloudflare Workers, live WebSocket server, GraphQL endpoint, and distributed caching.",
    items: [
      { label: "REST API layer (typed client)", done: true, link: "/tech-stack" },
      { label: "GraphQL client", done: true, link: "/tech-stack" },
      { label: "WebSocket manager (auto-reconnect)", done: true, link: "/tech-stack" },
      { label: "Live WebSocket server", done: false },
      { label: "GraphQL endpoint", done: false },
      { label: "Edge runtime deployment", done: false },
      { label: "Distributed caching layer", done: false },
      { label: "gRPC integration", done: false },
    ],
    link: "/dashboard",
    linkLabel: "Developer Dashboard",
  },
  {
    number: 5,
    title: "Intelligence & Optimization",
    subtitle: "Phase 5 — Upcoming",
    icon: <BrainIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "AI-assisted performance profiling, adaptive resource management, predictive preloading, and real-time optimization recommendations.",
    items: [
      { label: "Runtime metrics (FPS, heap, uptime)", done: true, link: "/tech-stack" },
      { label: "Performance profiling infrastructure", done: false },
      { label: "AI optimization recommendations", done: false },
      { label: "Adaptive caching strategy", done: false },
      { label: "Predictive resource preloading", done: false },
      { label: "Energy efficiency mode", done: false },
      { label: "Workload analysis engine", done: false },
    ],
    link: "/ai-optimization",
    linkLabel: "AI Optimization",
  },
  {
    number: 6,
    title: "Developer Ecosystem",
    subtitle: "Phase 6 — Upcoming",
    icon: <CodeIcon className="h-5 w-5" />,
    status: "upcoming",
    description:
      "CLI tooling, published documentation, interactive playground, benchmarking suite, and the first public developer preview release.",
    items: [
      { label: "Documentation structure", done: true, link: "/docs" },
      { label: "Component library scaffold", done: true, link: "/components" },
      { label: "Module store scaffold", done: true, link: "/module-store" },
      { label: "Community hub scaffold", done: true, link: "/community" },
      { label: "CLI implementation", done: false },
      { label: "Interactive playground", done: false },
      { label: "Benchmarking suite", done: false },
      { label: "Developer preview release", done: false },
    ],
    link: "/community",
    linkLabel: "Community Hub",
  },
];

const statusConfig: Record<PhaseStatus, { dot: string; badge: string; badgeText: string; connector: string }> = {
  done:     { dot: "bg-green-500 border-green-500", badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", badgeText: "Complete", connector: "bg-green-500" },
  active:   { dot: "bg-primary border-primary", badge: "bg-primary/10 text-primary", badgeText: "In Progress", connector: "bg-primary" },
  upcoming: { dot: "bg-muted border-border", badge: "bg-muted text-muted-foreground", badgeText: "Upcoming", connector: "bg-border" },
};

function phaseProgress(phase: Phase): number {
  const done = phase.items.filter((i) => i.done).length;
  return Math.round((done / phase.items.length) * 100);
}

const Roadmap: React.FC<RoadmapProps> = ({ className }) => {
  const [expanded, setExpanded] = useState<number | null>(1);

  const toggle = (n: number) => setExpanded((prev) => (prev === n ? null : n));

  return (
    <section id="roadmap" className={cn("section-padding relative bg-muted/20", className)}>
      <div className="container-padding mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedTransition delay={50} animationType="slide-up">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Development <span className="text-gradient">Roadmap</span>
            </h2>
          </AnimatedTransition>
          <AnimatedTransition delay={150} animationType="slide-up">
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Six phases from architectural foundation to a full developer ecosystem.
              Click any phase to expand its milestones.
            </p>
          </AnimatedTransition>

          {/* Overall progress */}
          <AnimatedTransition delay={250} animationType="fade">
            <div className="mt-8 mx-auto max-w-sm">
              {(() => {
                const allItems = phases.flatMap((p) => p.items);
                const doneCount = allItems.filter((i) => i.done).length;
                const pct = Math.round((doneCount / allItems.length) * 100);
                return (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overall progress</span>
                      <span className="font-medium">{doneCount} / {allItems.length} milestones</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{pct}% complete</p>
                  </div>
                );
              })()}
            </div>
          </AnimatedTransition>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical spine */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-8" />

          <div className="space-y-4">
            {phases.map((phase, index) => {
              const cfg = statusConfig[phase.status];
              const pct = phaseProgress(phase);
              const isOpen = expanded === phase.number;

              return (
                <AnimatedTransition key={phase.number} delay={80 * index} animationType="slide-up">
                  <div className="relative pl-16 md:pl-20">
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-3.5 top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background md:left-5",
                        cfg.dot
                      )}
                    >
                      {phase.status === "done" && <CheckIcon className="h-3 w-3 text-white" />}
                      {phase.status === "active" && (
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      )}
                      {phase.status === "upcoming" && (
                        <CircleIcon className="h-2.5 w-2.5 text-muted-foreground" />
                      )}
                    </div>

                    <GlassMorphicCard
                      className="overflow-hidden"
                      border={phase.status === "active" ? "accent" : "subtle"}
                      hoverEffect="lift"
                    >
                      {/* Phase header — always visible */}
                      <button
                        className="w-full text-left p-5"
                        onClick={() => toggle(phase.number)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="rounded-lg bg-primary/10 p-1.5 text-primary shrink-0">
                              {phase.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-display text-base font-semibold">
                                  Phase {phase.number}: {phase.title}
                                </span>
                                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", cfg.badge)}>
                                  {cfg.badgeText}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{phase.subtitle}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {/* Mini progress ring */}
                            <div className="hidden sm:flex flex-col items-end gap-1">
                              <span className="text-xs font-medium">{pct}%</span>
                              <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                                <div
                                  className={cn("h-full rounded-full transition-all duration-500",
                                    phase.status === "done" ? "bg-green-500" :
                                    phase.status === "active" ? "bg-primary" : "bg-muted-foreground/30"
                                  )}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                            {isOpen
                              ? <ChevronUpIcon className="h-4 w-4 text-muted-foreground" />
                              : <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                            }
                          </div>
                        </div>
                      </button>

                      {/* Expanded content */}
                      {isOpen && (
                        <div className="border-t border-border/40 px-5 pb-5 pt-4">
                          <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>

                          {/* Milestone checklist */}
                          <div className="grid gap-1.5 sm:grid-cols-2">
                            {phase.items.map((item) => (
                              <div
                                key={item.label}
                                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-muted/30 transition-colors"
                              >
                                <div className={cn(
                                  "flex h-4 w-4 shrink-0 items-center justify-center rounded",
                                  item.done
                                    ? "bg-primary text-primary-foreground"
                                    : "border border-border bg-background"
                                )}>
                                  {item.done && <CheckIcon className="h-2.5 w-2.5" />}
                                </div>
                                <span className={cn(
                                  "text-sm flex-1",
                                  item.done ? "text-foreground" : "text-muted-foreground"
                                )}>
                                  {item.label}
                                </span>
                                {item.link && item.done && (
                                  <Link to={item.link} className="text-primary hover:text-primary/80">
                                    <ExternalLinkIcon className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Phase progress bar */}
                          <div className="mt-4 space-y-1.5">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{phase.items.filter((i) => i.done).length} of {phase.items.length} complete</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={cn("h-full rounded-full transition-all duration-700",
                                  phase.status === "done" ? "bg-green-500" :
                                  phase.status === "active" ? "bg-primary" : "bg-muted-foreground/40"
                                )}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>

                          {phase.link && (
                            <Button asChild size="sm" variant="outline" className="mt-4 group">
                              <Link to={phase.link}>
                                {phase.linkLabel ?? "View"}
                                <ArrowRightIcon className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </GlassMorphicCard>
                  </div>
                </AnimatedTransition>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <AnimatedTransition delay={600} animationType="fade">
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="group">
              <Link to="/roadmap">
                View Full Roadmap
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </AnimatedTransition>

      </div>
    </section>
  );
};

export default Roadmap;
