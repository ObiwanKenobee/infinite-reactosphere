
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { 
  ZapIcon, 
  KeyIcon, 
  RotateCwIcon, 
  MonitorSmartphoneIcon, 
  PlusIcon, 
  UploadIcon, 
  CodeIcon, 
  SearchIcon,
  StarIcon
} from "lucide-react";

const ModuleStore = () => {
  const moduleCategories = [
    {
      name: "Performance Enhancements",
      icon: <ZapIcon className="h-6 w-6" />,
      modules: [
        {
          name: "AI Prediction Engine",
          description: "Predicts user interactions for preemptive rendering",
          author: "React Infinite Team",
          rating: 4.9,
          downloads: "12.8k",
          price: "Free"
        },
        {
          name: "Memory Optimizer",
          description: "Advanced memory management for large datasets",
          author: "Performance Labs",
          rating: 4.7,
          downloads: "8.3k",
          price: "$49"
        }
      ]
    },
    {
      name: "Web3 & Decentralized UI",
      icon: <KeyIcon className="h-6 w-6" />,
      modules: [
        {
          name: "Wallet Connect Kit",
          description: "Universal crypto wallet connection components",
          author: "Web3 Foundation",
          rating: 4.8,
          downloads: "15.2k",
          price: "Free"
        },
        {
          name: "Smart Contract UI",
          description: "Dynamic UI components for contract interaction",
          author: "DeFi Dev Group",
          rating: 4.6,
          downloads: "7.1k",
          price: "$39"
        }
      ]
    },
    {
      name: "AI-Driven Animations",
      icon: <RotateCwIcon className="h-6 w-6" />,
      modules: [
        {
          name: "Neural Transitions",
          description: "AI-optimized animation system for smooth UI transitions",
          author: "Motion AI",
          rating: 4.9,
          downloads: "9.4k",
          price: "$29"
        },
        {
          name: "Intelligent Microanimations",
          description: "Context-aware microanimations for better UX",
          author: "UX Motion Labs",
          rating: 4.7,
          downloads: "6.8k",
          price: "Free"
        }
      ]
    },
    {
      name: "Cross-Platform Adapters",
      icon: <MonitorSmartphoneIcon className="h-6 w-6" />,
      modules: [
        {
          name: "XR Renderer",
          description: "Extend React Infinite to AR/VR environments",
          author: "Metaverse Dev Team",
          rating: 4.8,
          downloads: "5.2k",
          price: "$79"
        },
        {
          name: "IoT Dashboard Kit",
          description: "UI components optimized for IoT data visualization",
          author: "Connected Systems",
          rating: 4.6,
          downloads: "3.9k",
          price: "$59"
        }
      ]
    }
  ];

  return (
    <DashboardLayout
      title="WASM Module Store"
      description="Extend React Infinite with WebAssembly modules for enhanced performance"
    >
      <div className="grid gap-8">
        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <Button className="group">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add to My Project
            </Button>
            <Button variant="secondary" className="group">
              <UploadIcon className="mr-2 h-4 w-4" />
              Submit a WASM Module
            </Button>
            <Button variant="outline" className="group">
              <CodeIcon className="mr-2 h-4 w-4" />
              View Module Code
            </Button>
          </div>
          
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search modules..." 
              className="rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Module search for mobile */}
        <div className="relative md:hidden">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search modules..." 
            className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Module categories */}
        <div className="space-y-8">
          {moduleCategories.map((category, categoryIndex) => (
            <AnimatedTransition key={categoryIndex} delay={100 * categoryIndex} animationType="slide-up">
              <section>
                <div className="mb-4 flex items-center">
                  <div className="mr-3 rounded-full bg-primary/10 p-2 text-primary">
                    {category.icon}
                  </div>
                  <h2 className="font-display text-xl font-semibold">{category.name}</h2>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {category.modules.map((module, moduleIndex) => (
                    <GlassMorphicCard key={moduleIndex} className="p-5" hoverEffect="lift">
                      <div className="flex justify-between">
                        <h3 className="font-display font-medium">{module.name}</h3>
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {module.price}
                        </div>
                      </div>
                      
                      <p className="mt-2 text-sm text-muted-foreground">{module.description}</p>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          By <span className="font-medium text-foreground">{module.author}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <StarIcon className="mr-1 h-3.5 w-3.5 text-amber-500" />
                          <span className="font-medium">{module.rating}</span>
                          <span className="mx-1.5 text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{module.downloads} downloads</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="flex-1">Install</Button>
                        <Button size="sm" variant="outline" className="flex-1">Preview</Button>
                      </div>
                    </GlassMorphicCard>
                  ))}
                </div>
              </section>
            </AnimatedTransition>
          ))}
        </div>

        {/* Featured module */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Featured Module</h2>
          <GlassMorphicCard className="overflow-hidden" hoverEffect="glow" border="gradient">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-6 md:p-8">
                <div className="rounded-full bg-primary/10 p-2 text-primary w-fit">
                  <ZapIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">WebGPU Render Engine</h3>
                <div className="mt-2 flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 text-amber-500" />
                  <span className="font-medium">4.9</span>
                  <span className="mx-1.5 text-muted-foreground">•</span>
                  <span className="text-muted-foreground">23.4k downloads</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Revolutionary WebGPU-powered rendering system that brings native-quality graphics to the web. Optimized for complex visualizations and smooth animations at 120fps+.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button>Install Module</Button>
                  <Button variant="outline">View Documentation</Button>
                </div>
              </div>
              <div className="flex items-center justify-center bg-muted/20 p-6 md:p-8">
                <div className="h-full w-full rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-muted-foreground">Module Preview</p>
                    <Button size="sm" className="mt-4">Load Demo</Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassMorphicCard>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ModuleStore;
