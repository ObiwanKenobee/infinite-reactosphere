
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { 
  DownloadIcon, 
  ListIcon, 
  BarChartIcon, 
  MessageSquareIcon, 
  CreditCardIcon, 
  ShoppingCartIcon, 
  CarIcon, 
  WalletIcon, 
  WandSparklesIcon, 
  FileTextIcon
} from "lucide-react";

const ComponentLibrary = () => {
  const componentCategories = [
    {
      name: "AI-Powered Infinite List",
      icon: <ListIcon className="h-6 w-6" />,
      description: "Dynamically preloads content based on user behavior for instant rendering.",
      performanceMetric: "Renders 10,000 items in 8ms",
      installCmd: "infinite install @infinite/ai-list"
    },
    {
      name: "WebGPU-Accelerated Charts",
      icon: <BarChartIcon className="h-6 w-6" />,
      description: "GPU-optimized charting components that render complex visualizations.",
      performanceMetric: "Renders in <5ms",
      installCmd: "infinite install @infinite/gpu-charts"
    },
    {
      name: "Super App UI Kit: Messaging",
      icon: <MessageSquareIcon className="h-6 w-6" />,
      description: "Real-time messaging interface optimized for WebAssembly.",
      performanceMetric: "Zero latency UI",
      installCmd: "infinite install @infinite/messaging-ui"
    },
    {
      name: "Super App UI Kit: Payments",
      icon: <CreditCardIcon className="h-6 w-6" />,
      description: "Secure, high-performance payment processing components.",
      performanceMetric: "PCI-compliant & WASM-optimized",
      installCmd: "infinite install @infinite/payments-ui"
    },
    {
      name: "Super App UI Kit: Marketplace",
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      description: "E-commerce components with AI-driven product recommendations.",
      performanceMetric: "98% render optimization",
      installCmd: "infinite install @infinite/marketplace-ui"
    },
    {
      name: "Super App UI Kit: Ride-Hailing",
      icon: <CarIcon className="h-6 w-6" />,
      description: "Location-based service UI with real-time mapping.",
      performanceMetric: "60fps map animations",
      installCmd: "infinite install @infinite/ride-hailing-ui"
    },
    {
      name: "Decentralized UI Components",
      icon: <WalletIcon className="h-6 w-6" />,
      description: "Web3-enabled frontend elements for blockchain applications.",
      performanceMetric: "Native wallet integration",
      installCmd: "infinite install @infinite/web3-components"
    }
  ];

  return (
    <DashboardLayout
      title="WASM Component Library"
      description="Pre-built high-performance UI components powered by WebAssembly"
    >
      <div className="grid gap-8">
        {/* Component grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {componentCategories.map((component, index) => (
            <AnimatedTransition key={index} delay={100 * index} animationType="scale">
              <GlassMorphicCard className="flex h-full flex-col p-6" hoverEffect="lift">
                <div className="mb-4 rounded-full bg-primary/10 p-2 text-primary w-fit">
                  {component.icon}
                </div>
                <h3 className="font-display text-lg font-medium">{component.name}</h3>
                <div className="mt-1 rounded-full bg-primary/5 px-3 py-1 text-xs text-primary w-fit">
                  {component.performanceMetric}
                </div>
                <p className="mt-3 flex-grow text-sm text-muted-foreground">
                  {component.description}
                </p>
                <div className="mt-4 rounded-md bg-muted/50 p-2 font-mono text-xs">
                  {component.installCmd}
                </div>
                <div className="mt-4 flex gap-3">
                  <Button size="sm" className="flex-1">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Install
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <WandSparklesIcon className="mr-2 h-4 w-4" />
                    Customize
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1">
                    <FileTextIcon className="mr-2 h-4 w-4" />
                    Docs
                  </Button>
                </div>
              </GlassMorphicCard>
            </AnimatedTransition>
          ))}
        </div>

        {/* Component visualization placeholder */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Component Preview</h2>
          <GlassMorphicCard className="p-6" blur="lg">
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20">
              <p className="text-center text-muted-foreground">
                Select a component to preview its WASM-powered rendering
              </p>
            </div>
          </GlassMorphicCard>
        </section>

        {/* Integration Guide */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Quick Integration Guide</h2>
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Install the component</h3>
                  <p className="text-sm text-muted-foreground">
                    Use React Infinite CLI to add the component to your project
                  </p>
                  <div className="mt-2 rounded-md bg-muted/50 p-2 font-mono text-xs">
                    infinite install @infinite/component-name
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Import into your project</h3>
                  <p className="text-sm text-muted-foreground">
                    Add the import statement to your React component
                  </p>
                  <div className="mt-2 rounded-md bg-muted/50 p-2 font-mono text-xs">
                    import { WasmComponent } from '@infinite/component-name';
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Use the component</h3>
                  <p className="text-sm text-muted-foreground">
                    Add the component to your JSX/TSX code
                  </p>
                  <div className="mt-2 rounded-md bg-muted/50 p-2 font-mono text-xs">
                    {'<WasmComponent {...props} />'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ComponentLibrary;
