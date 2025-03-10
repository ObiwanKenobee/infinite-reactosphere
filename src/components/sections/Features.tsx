
import React from "react";
import { cn } from "@/lib/utils";
import GlassMorphicCard from "../ui/GlassMorphicCard";
import AnimatedTransition from "../ui/AnimatedTransition";
import { 
  BoxIcon, 
  CircuitBoardIcon, 
  CloudIcon, 
  CodeIcon, 
  CpuIcon, 
  DatabaseIcon, 
  GaugeIcon, 
  GlobeIcon, 
  KeyIcon, 
  LayoutIcon, 
  ShieldIcon, 
  ZapIcon 
} from "lucide-react";

interface FeaturesProps {
  className?: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  return (
    <AnimatedTransition delay={delay} animationType="scale">
      <GlassMorphicCard className="h-full p-6" hoverEffect="lift">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </GlassMorphicCard>
    </AnimatedTransition>
  );
};

const Features: React.FC<FeaturesProps> = ({ className }) => {
  const features = [
    {
      title: "WebGPU Rendering",
      description: "Ultra-fast UI rendering powered by WebGPU and Vulkan for seamless visual experiences.",
      icon: <LayoutIcon className="h-5 w-5" />,
      delay: 100
    },
    {
      title: "AI-Driven Optimization",
      description: "Intelligent preloading and caching mechanisms that adapt to user behavior patterns.",
      icon: <CpuIcon className="h-5 w-5" />,
      delay: 200
    },
    {
      title: "WASM Execution",
      description: "Direct WebAssembly bytecode execution for near-native performance with zero lag.",
      icon: <ZapIcon className="h-5 w-5" />,
      delay: 300
    },
    {
      title: "Edge Computing",
      description: "Distributed computing on the edge network for minimal latency and global scalability.",
      icon: <CloudIcon className="h-5 w-5" />,
      delay: 400
    },
    {
      title: "Custom Compilation",
      description: "Advanced compilation pipeline converting TypeScript directly to optimized WebAssembly.",
      icon: <CodeIcon className="h-5 w-5" />,
      delay: 500
    },
    {
      title: "Cross-Platform",
      description: "Build once, deploy everywhere: Web, iOS, Android, XR, and IoT devices all from one codebase.",
      icon: <GlobeIcon className="h-5 w-5" />,
      delay: 600
    },
    {
      title: "Real-Time Data",
      description: "WebSockets and Pub/Sub systems enabling instant data updates and UI synchronization.",
      icon: <DatabaseIcon className="h-5 w-5" />,
      delay: 700
    },
    {
      title: "Web3 Ready",
      description: "Built-in integration with decentralized authentication and blockchain technologies.",
      icon: <KeyIcon className="h-5 w-5" />,
      delay: 800
    },
    {
      title: "GraphQL API",
      description: "Efficient data fetching with a type-safe GraphQL API layer that minimizes payloads.",
      icon: <CircuitBoardIcon className="h-5 w-5" />,
      delay: 900
    },
    {
      title: "Auto-Scaling",
      description: "Intelligent resource allocation that scales with demand for optimal performance.",
      icon: <GaugeIcon className="h-5 w-5" />,
      delay: 1000
    },
    {
      title: "End-to-End Security",
      description: "Enterprise-grade security with encryption at rest and in transit for sensitive data.",
      icon: <ShieldIcon className="h-5 w-5" />,
      delay: 1100
    },
    {
      title: "Containerized",
      description: "Fully containerized architecture for consistent development and deployment environments.",
      icon: <BoxIcon className="h-5 w-5" />,
      delay: 1200
    },
  ];

  return (
    <section id="features" className={cn("section-padding relative overflow-hidden", className)}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <AnimatedTransition delay={50} animationType="slide-up">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Next-Generation <span className="text-gradient">Features</span>
            </h2>
          </AnimatedTransition>
          <AnimatedTransition delay={150} animationType="slide-up">
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              React Infinite combines cutting-edge technologies to deliver an unparalleled development and user experience.
            </p>
          </AnimatedTransition>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
