
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { 
  ArrowRightIcon, 
  BarChart4Icon, 
  BoxIcon, 
  BugIcon, 
  GaugeIcon, 
  KeyIcon, 
  PlusIcon, 
  SparklesIcon, 
  ZapIcon 
} from "lucide-react";
import { Link } from "react-router-dom";

const DeveloperDashboard = () => {
  const projects = [
    { 
      id: 1, 
      name: "E-Commerce Super App", 
      lastModified: "2 hours ago", 
      performance: 98, 
      status: "Optimized" 
    },
    { 
      id: 2, 
      name: "Cross-Platform Dashboard", 
      lastModified: "1 day ago", 
      performance: 89, 
      status: "Needs Optimization" 
    },
    { 
      id: 3, 
      name: "Web3 Marketplace", 
      lastModified: "3 days ago", 
      performance: 95, 
      status: "Optimized" 
    },
  ];

  const performanceInsights = [
    { 
      metric: "Average Load Time", 
      value: "12ms", 
      change: "-8ms", 
      trend: "improved" 
    },
    { 
      metric: "Memory Usage", 
      value: "4.2MB", 
      change: "-1.8MB", 
      trend: "improved" 
    },
    { 
      metric: "UI Interactions", 
      value: "98%", 
      change: "+2%", 
      trend: "improved" 
    },
    { 
      metric: "Battery Impact", 
      value: "Low", 
      change: "Unchanged", 
      trend: "stable" 
    },
  ];

  return (
    <DashboardLayout
      title="Developer Dashboard"
      description="Manage your React Infinite projects and monitor performance insights"
    >
      <div className="grid gap-8">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="group">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Project
          </Button>
          <Button variant="secondary" className="group">
            <SparklesIcon className="mr-2 h-4 w-4" />
            Optimize My App
          </Button>
          <Button variant="outline" asChild>
            <Link to="/module-store" className="group">
              <BoxIcon className="mr-2 h-4 w-4" />
              Explore WebAssembly Marketplace
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Projects Section */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Your Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <AnimatedTransition key={project.id} delay={100 * index} animationType="slide-up">
                <GlassMorphicCard className="p-4" hoverEffect="lift">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">Last modified: {project.lastModified}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-6 flex items-center">
                        <GaugeIcon className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-medium">{project.performance}%</span>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs ${
                        project.status === "Optimized" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                </GlassMorphicCard>
              </AnimatedTransition>
            ))}
          </div>
        </section>

        {/* Performance Insights */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Live WASM Performance Insights</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {performanceInsights.map((insight, index) => (
              <AnimatedTransition key={insight.metric} delay={150 * index} animationType="slide-up">
                <GlassMorphicCard className="p-4" hoverEffect="glow">
                  <h3 className="text-sm font-medium text-muted-foreground">{insight.metric}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="font-display text-2xl font-semibold">{insight.value}</span>
                    <span className={`ml-2 text-xs ${
                      insight.trend === "improved" 
                        ? "text-green-600 dark:text-green-400" 
                        : insight.trend === "declined" 
                          ? "text-red-600 dark:text-red-400" 
                          : "text-muted-foreground"
                    }`}>
                      {insight.change}
                    </span>
                  </div>
                </GlassMorphicCard>
              </AnimatedTransition>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Development Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatedTransition delay={100} animationType="scale">
              <GlassMorphicCard className="flex h-full flex-col p-6" hoverEffect="lift">
                <div className="mb-4 rounded-full bg-primary/10 p-2 text-primary w-fit">
                  <BugIcon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-medium">Instant Debugging & Logs</h3>
                <p className="mt-2 flex-grow text-sm text-muted-foreground">
                  Monitor WebGPU rendering, inspect WASM execution, and view AI-driven UI corrections in real-time.
                </p>
                <Button variant="outline" className="mt-4 w-full">Open DevTools</Button>
              </GlassMorphicCard>
            </AnimatedTransition>
            
            <AnimatedTransition delay={200} animationType="scale">
              <GlassMorphicCard className="flex h-full flex-col p-6" hoverEffect="lift">
                <div className="mb-4 rounded-full bg-primary/10 p-2 text-primary w-fit">
                  <ZapIcon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-medium">Pre-Built WASM Widgets</h3>
                <p className="mt-2 flex-grow text-sm text-muted-foreground">
                  Install and test high-performance UI components optimized for WebAssembly execution.
                </p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link to="/components">Browse Components</Link>
                </Button>
              </GlassMorphicCard>
            </AnimatedTransition>
            
            <AnimatedTransition delay={300} animationType="scale">
              <GlassMorphicCard className="flex h-full flex-col p-6" hoverEffect="lift">
                <div className="mb-4 rounded-full bg-primary/10 p-2 text-primary w-fit">
                  <KeyIcon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-medium">Web3 & Decentralization</h3>
                <p className="mt-2 flex-grow text-sm text-muted-foreground">
                  Activate blockchain-based UI elements and integrate decentralized authentication.
                </p>
                <Button variant="outline" className="mt-4 w-full">Configure Web3</Button>
              </GlassMorphicCard>
            </AnimatedTransition>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DeveloperDashboard;
