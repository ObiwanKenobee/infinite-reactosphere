
import React from "react";
import { cn } from "@/lib/utils";
import ArchitectureDiagram from "../ui/ArchitectureDiagram";
import AnimatedTransition from "../ui/AnimatedTransition";
import GlassMorphicCard from "../ui/GlassMorphicCard";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BracesIcon, CircuitBoardIcon, CpuIcon, LayersIcon, ServerIcon } from "lucide-react";

interface ArchitectureProps {
  className?: string;
}

const Architecture: React.FC<ArchitectureProps> = ({ className }) => {
  const architectureComponents = [
    {
      title: "Frontend",
      icon: <LayersIcon className="h-5 w-5" />,
      details: [
        "Vite + React + TypeScript",
        "WebGPU/Vulkan UI renderer",
        "AI-driven preloading",
        "WASM execution layer"
      ]
    },
    {
      title: "Backend",
      icon: <ServerIcon className="h-5 w-5" />,
      details: [
        "Rust + WebAssembly",
        "Decentralized DB options",
        "Web3-based identity",
        "AI optimization layer"
      ]
    },
    {
      title: "WASM Pipeline",
      icon: <BracesIcon className="h-5 w-5" />,
      details: [
        "Custom Vite plugins",
        "AssemblyScript compilation",
        "LLVM toolchain",
        "Emscripten optimization"
      ]
    },
    {
      title: "API & Data Flow",
      icon: <CircuitBoardIcon className="h-5 w-5" />,
      details: [
        "GraphQL/gRPC endpoints",
        "WebSockets real-time data",
        "Smart contract integration",
        "Efficient caching system"
      ]
    }
  ];

  return (
    <section id="architecture" className={cn("section-padding relative bg-muted/30", className)}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <AnimatedTransition delay={100} animationType="slide-up">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                A Revolutionary <span className="text-gradient">Architecture</span>
              </h2>
            </AnimatedTransition>
            
            <AnimatedTransition delay={200} animationType="slide-up">
              <p className="mt-4 text-muted-foreground">
                React Infinite introduces a next-generation architecture designed from the ground up for exceptional performance, scalability, and developer experience.
              </p>
            </AnimatedTransition>

            <div className="mt-8 space-y-6">
              {architectureComponents.map((component, index) => (
                <AnimatedTransition key={index} delay={300 + (index * 100)} animationType="slide-up">
                  <GlassMorphicCard className="p-4" hoverEffect="lift" blur="sm">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-lg bg-primary/10 p-2 text-primary">
                        {component.icon}
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium leading-tight">
                          {component.title}
                        </h3>
                        <ul className="mt-2 space-y-1">
                          {component.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                              <span className="mr-2 text-primary">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassMorphicCard>
                </AnimatedTransition>
              ))}
            </div>

            <AnimatedTransition delay={700} animationType="slide-up" className="mt-8">
              <Button variant="outline" className="group">
                Explore Technical Details
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </AnimatedTransition>
          </div>

          <AnimatedTransition delay={400} animationType="fade">
            <div className="relative">
              <ArchitectureDiagram />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/30 pointer-events-none"></div>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
