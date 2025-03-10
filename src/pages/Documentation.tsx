
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { 
  BookIcon, 
  CodeIcon, 
  BugIcon, 
  KeyIcon, 
  GlobeIcon, 
  PlayIcon, 
  SparklesIcon, 
  UsersIcon, 
  CheckIcon,
  CopyIcon
} from "lucide-react";

const Documentation = () => {
  const documentationSections = [
    {
      title: "Getting Started",
      icon: <BookIcon className="h-6 w-6" />,
      description: "Install & scaffold a React Infinite project with Vite + TypeScript + WASM",
      subsections: ["Installation", "Project Setup", "Directory Structure", "First Steps"]
    },
    {
      title: "Building Custom Components",
      icon: <CodeIcon className="h-6 w-6" />,
      description: "Create WebAssembly-optimized UI blocks for maximum performance",
      subsections: ["WASM Component Basics", "TypeScript to WebAssembly", "Component Optimization", "Component API"]
    },
    {
      title: "Debugging & Performance",
      icon: <BugIcon className="h-6 w-6" />,
      description: "Use DevTools & AI-assisted debugging to optimize your app",
      subsections: ["DevTools Overview", "Performance Profiling", "Memory Analysis", "AI-Driven Optimization"]
    },
    {
      title: "Web3 & XR Integrations",
      icon: <KeyIcon className="h-6 w-6" />,
      description: "Connect to blockchain or Metaverse-ready UI layers",
      subsections: ["Web3 Authentication", "Smart Contract UI", "XR Environment Setup", "Cross-Reality Components"]
    },
    {
      title: "Deploying at Scale",
      icon: <GlobeIcon className="h-6 w-6" />,
      description: "Optimize for Super Apps serving billions of users",
      subsections: ["Edge Deployment", "WebAssembly CDN", "Performance Monitoring", "Global Scaling"]
    }
  ];

  return (
    <DashboardLayout
      title="Developer Documentation"
      description="Interactive developer guide with real-world examples and AI-powered tutorials"
    >
      <div className="grid gap-8">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="group">
            <PlayIcon className="mr-2 h-4 w-4" />
            Start Building
          </Button>
          <Button variant="secondary" className="group">
            <SparklesIcon className="mr-2 h-4 w-4" />
            Run AI Optimizations
          </Button>
          <Button variant="outline" className="group">
            <UsersIcon className="mr-2 h-4 w-4" />
            Join Developer Forum
          </Button>
        </div>

        {/* Quick start guide */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Quick Start Guide</h2>
          <GlassMorphicCard className="p-6" hoverEffect="lift">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-medium">1. Install React Infinite CLI</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Install the command-line interface to scaffold and manage your projects
                </p>
                <div className="mt-3 flex items-center justify-between rounded-md bg-muted p-3 font-mono text-sm">
                  <code>npm install -g @react-infinite/cli</code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-medium">2. Create a new project</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Scaffold a new React Infinite project with all dependencies pre-configured
                </p>
                <div className="mt-3 flex items-center justify-between rounded-md bg-muted p-3 font-mono text-sm">
                  <code>infinite create my-awesome-app</code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-medium">3. Start the development server</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Launch the development server with WASM hot reloading
                </p>
                <div className="mt-3 flex items-center justify-between rounded-md bg-muted p-3 font-mono text-sm">
                  <code>cd my-awesome-app && infinite dev</code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-medium">4. Build your first WASM component</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generate a new WebAssembly-optimized React component
                </p>
                <div className="mt-3 flex items-center justify-between rounded-md bg-muted p-3 font-mono text-sm">
                  <code>infinite generate component WasmButton</code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </GlassMorphicCard>
        </section>

        {/* Documentation sections */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Documentation Sections</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {documentationSections.map((section, index) => (
              <AnimatedTransition key={index} delay={100 * index} animationType="scale">
                <GlassMorphicCard className="flex h-full flex-col p-6" hoverEffect="lift">
                  <div className="mb-4 rounded-full bg-primary/10 p-2 text-primary w-fit">
                    {section.icon}
                  </div>
                  <h3 className="font-display text-lg font-medium">{section.title}</h3>
                  <p className="mt-2 flex-grow text-sm text-muted-foreground">
                    {section.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-center text-sm">
                        <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>{subsection}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-6">
                    Read Documentation
                  </Button>
                </GlassMorphicCard>
              </AnimatedTransition>
            ))}
          </div>
        </section>

        {/* Interactive example */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Interactive Example</h2>
          <GlassMorphicCard className="overflow-hidden" hoverEffect="none">
            <div className="border-b border-muted/40 p-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-muted-foreground">
                example.tsx
              </div>
              <div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-muted/30 p-4 font-mono text-sm">
              <div className="text-primary">import React from 'react';</div>
              <div className="text-primary">import {'{ useWasm }'} from '@react-infinite/core';</div>
              <div className="text-primary">import type {'{ WasmModule }'} from '@react-infinite/types';</div>
              <br />
              <div className="text-foreground">const ExampleComponent = () => {'{'}</div>
              <div className="ml-4 text-foreground">{'// Load the WebAssembly module'}</div>
              <div className="ml-4 text-indigo-500">const module = useWasm<WasmModule>('./path/to/module.wasm');</div>
              <br />
              <div className="ml-4 text-foreground">{'// Use the WASM functions'}</div>
              <div className="ml-4 text-indigo-500">const result = module ? module.calculate(10, 20) : null;</div>
              <br />
              <div className="ml-4 text-foreground">return (</div>
              <div className="ml-8 text-green-600">{'<div className="wasm-example">'}</div>
              <div className="ml-12 text-green-600">{'<h2>WASM Example</h2>'}</div>
              <div className="ml-12 text-green-600">{'<p>Result: {result ?? "Loading..."}</p>'}</div>
              <div className="ml-8 text-green-600">{'</div>'}</div>
              <div className="ml-4 text-foreground">);</div>
              <div className="text-foreground">{'}'};</div>
              <br />
              <div className="text-primary">export default ExampleComponent;</div>
            </div>
            <div className="border-t border-muted/40 p-4">
              <Button size="sm">
                <PlayIcon className="mr-2 h-4 w-4" />
                Run Example
              </Button>
            </div>
          </GlassMorphicCard>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Documentation;
