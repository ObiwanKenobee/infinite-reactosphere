import React from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "../ui/AnimatedTransition";
import GlassMorphicCard from "../ui/GlassMorphicCard";
import {
  LayersIcon,
  CpuIcon,
  MonitorIcon,
  ServerIcon,
  BrainIcon,
  CodeIcon,
} from "lucide-react";

interface RoadmapProps {
  className?: string;
}

const phases = [
  {
    number: 1,
    title: "Architectural Foundation",
    icon: <LayersIcon className="h-5 w-5" />,
    status: "active",
    items: ["Core architecture", "React + TypeScript foundation", "Module system design", "Performance benchmarks", "API contracts"],
  },
  {
    number: 2,
    title: "Execution Engine",
    icon: <CpuIcon className="h-5 w-5" />,
    status: "upcoming",
    items: ["WebAssembly modules", "Rust integration", "Compilation pipelines", "Module execution management"],
  },
  {
    number: 3,
    title: "Rendering Infrastructure",
    icon: <MonitorIcon className="h-5 w-5" />,
    status: "upcoming",
    items: ["Rendering abstraction", "WebGPU prototype", "Rendering performance", "Visualization examples"],
  },
  {
    number: 4,
    title: "Distributed Infrastructure",
    icon: <ServerIcon className="h-5 w-5" />,
    status: "upcoming",
    items: ["Backend services", "Edge execution", "Real-time communication", "Caching infrastructure"],
  },
  {
    number: 5,
    title: "Intelligence & Optimization",
    icon: <BrainIcon className="h-5 w-5" />,
    status: "upcoming",
    items: ["Performance profiling", "Optimization recommendations", "Adaptive resource management", "AI-assisted optimization"],
  },
  {
    number: 6,
    title: "Developer Ecosystem",
    icon: <CodeIcon className="h-5 w-5" />,
    status: "upcoming",
    items: ["CLI tooling", "Documentation", "Interactive examples", "Benchmarking suite", "Developer preview"],
  },
];

const statusStyles = {
  active: "bg-primary text-primary-foreground",
  upcoming: "bg-muted text-muted-foreground",
  done: "bg-green-500 text-white",
};

const Roadmap: React.FC<RoadmapProps> = ({ className }) => {
  return (
    <section id="roadmap" className={cn("section-padding relative bg-muted/20", className)}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <AnimatedTransition delay={50} animationType="slide-up">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Development <span className="text-gradient">Roadmap</span>
            </h2>
          </AnimatedTransition>
          <AnimatedTransition delay={150} animationType="slide-up">
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              Six phases from architectural foundation to a full developer ecosystem.
            </p>
          </AnimatedTransition>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((phase, index) => (
            <AnimatedTransition key={phase.number} delay={100 * index} animationType="scale">
              <GlassMorphicCard
                className="h-full p-6"
                hoverEffect="lift"
                border={phase.status === "active" ? "accent" : "subtle"}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      statusStyles[phase.status as keyof typeof statusStyles]
                    )}
                  >
                    {phase.number}
                  </div>
                  <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                    {phase.icon}
                  </div>
                  {phase.status === "active" && (
                    <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Active
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-semibold">{phase.title}</h3>

                <ul className="mt-3 space-y-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassMorphicCard>
            </AnimatedTransition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
