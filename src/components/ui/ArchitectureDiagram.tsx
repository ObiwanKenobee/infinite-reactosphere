
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "./AnimatedTransition";

interface ArchitectureDiagramProps {
  className?: string;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ className }) => {
  return (
    <div className={cn("relative h-[500px] w-full", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Central node */}
        <AnimatedTransition animationType="scale" delay={300}>
          <div className="relative z-20">
            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-primary/60 shadow-lg shadow-primary/20 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-background/90 flex items-center justify-center">
                <span className="font-display font-bold text-primary">WASM</span>
              </div>
            </div>
            <div className="absolute -inset-3 rounded-full border border-primary/20 animate-pulse-subtle"></div>
            <div className="absolute -inset-6 rounded-full border border-primary/10"></div>
          </div>
        </AnimatedTransition>
        
        {/* Frontend layer */}
        <AnimatedTransition animationType="fade" delay={600} className="absolute top-8 left-1/2 -translate-x-1/2">
          <div className="glass-card px-4 py-2 rounded-lg">
            <h4 className="text-sm font-medium">Frontend (React + Vite)</h4>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-primary mx-auto mt-2"></div>
        </AnimatedTransition>
        
        {/* Backend layer */}
        <AnimatedTransition animationType="fade" delay={750} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="glass-card px-4 py-2 rounded-lg">
            <h4 className="text-sm font-medium">Backend (Rust + Edge)</h4>
          </div>
          <div className="w-px h-16 bg-gradient-to-t from-transparent via-primary/30 to-primary mx-auto mb-2"></div>
        </AnimatedTransition>
        
        {/* Left module */}
        <AnimatedTransition animationType="fade" delay={900} className="absolute left-8 top-1/2 -translate-y-1/2">
          <div className="glass-card px-4 py-2 rounded-lg">
            <h4 className="text-sm font-medium">WASM Compilation</h4>
          </div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary/30 to-primary mt-6 ml-auto"></div>
        </AnimatedTransition>
        
        {/* Right module */}
        <AnimatedTransition animationType="fade" delay={1050} className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="glass-card px-4 py-2 rounded-lg">
            <h4 className="text-sm font-medium">API & Data Flow</h4>
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent via-primary/30 to-primary mt-6 mr-auto"></div>
        </AnimatedTransition>
        
        {/* Top-right module */}
        <AnimatedTransition animationType="fade" delay={1200} className="absolute top-20 right-20">
          <div className="glass-card px-4 py-2 rounded-lg">
            <h4 className="text-sm font-medium">DevOps</h4>
          </div>
          <div className="h-px w-12 bg-gradient-to-bl from-transparent to-primary/30 transform rotate-45 origin-bottom-left ml-4 mt-1"></div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
