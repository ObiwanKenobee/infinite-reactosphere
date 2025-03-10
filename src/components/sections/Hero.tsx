
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "../ui/AnimatedTransition";
import { ArrowRightIcon, CodeIcon, Sparkles, ZapIcon } from "lucide-react";

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-background to-background via-primary/5",
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden">
        <div className="absolute -top-[40%] left-[50%] h-[80%] w-[100%] -translate-x-1/2 rounded-[50%] bg-primary/5 blur-3xl"></div>
        <div className="absolute top-[60%] left-[10%] h-[20%] w-[20%] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] h-[30%] w-[30%] rounded-full bg-primary/10 blur-3xl"></div>
      </div>

      <div className="container-padding relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center pt-24">
        <div className="text-center">
          <AnimatedTransition delay={100} animationType="fade">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                Introducing React Infinite
              </span>
            </div>
          </AnimatedTransition>

          <AnimatedTransition delay={300} animationType="slide-up">
            <h1 className="mt-6 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              The <span className="text-gradient">Full-Stack</span> Architecture
              <br />
              for the Future of React
            </h1>
          </AnimatedTransition>

          <AnimatedTransition delay={500} animationType="slide-up">
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              A next-generation platform optimized for ultra-fast UI rendering,
              AI-powered performance, and cross-platform scalability powered by
              WebAssembly.
            </p>
          </AnimatedTransition>

          <AnimatedTransition delay={700} animationType="slide-up" className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group font-medium">
              Get Started
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="font-medium">
              <CodeIcon className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </AnimatedTransition>
        </div>

        <AnimatedTransition delay={900} animationType="fade" className="mt-12 sm:mt-16">
          <div className="relative mx-auto max-w-4xl rounded-xl border border-white/10 bg-black/5 p-1 backdrop-blur-sm">
            <div className="rounded-lg bg-black/80 shadow-2xl">
              <div className="flex items-center border-b border-white/10 px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-xs text-white/60">React Infinite Demo</div>
              </div>
              <div className="p-4 sm:p-8">
                <pre className="font-mono text-xs leading-relaxed text-white/90 sm:text-sm">
                  <code>
                    <span className="text-blue-400">import</span>
                    <span className="text-white"> &#123; createApp &#125; </span>
                    <span className="text-blue-400">from</span>
                    <span className="text-green-400"> 'react-infinite'</span>;
                    <br />
                    <br />
                    <span className="text-blue-400">const</span>
                    <span className="text-white"> app = </span>
                    <span className="text-yellow-400">createApp</span>
                    <span className="text-white">&#40;&#123;</span>
                    <br />
                    <span className="text-white pl-8">name: </span>
                    <span className="text-green-400">'MyNextGenApp'</span>,
                    <br />
                    <span className="text-white pl-8">renderer: </span>
                    <span className="text-yellow-400">WebGPU</span>,
                    <br />
                    <span className="text-white pl-8">optimization: </span>
                    <span className="text-yellow-400">AI</span>,
                    <br />
                    <span className="text-white pl-8">backend: </span>
                    <span className="text-yellow-400">EdgeCompute</span>,
                    <br />
                    <span className="text-white pl-8">wasmCompile: </span>
                    <span className="text-blue-400">true</span>,
                    <br />
                    <span className="text-white">&#125;&#41;;</span>
                    <br />
                    <br />
                    <span className="text-white">app.</span>
                    <span className="text-yellow-400">optimize</span>
                    <span className="text-white">&#40;&#41;.</span>
                    <span className="text-yellow-400">deploy</span>
                    <span className="text-white">&#40;&#41;;</span>
                    <br />
                    <span className="text-gray-400">// App deployed in 0.42 seconds with 99.9% performance score</span>
                  </code>
                </pre>
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform rounded-full bg-primary px-4 py-1 text-xs font-medium text-white">
              <div className="flex items-center">
                <ZapIcon className="mr-1 h-3 w-3" />
                <span>10x faster than traditional React apps</span>
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </div>

      {/* Gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
