
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Architecture from "@/components/sections/Architecture";
import Performance from "@/components/sections/Performance";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import AnimatedTransition from "@/components/ui/AnimatedTransition";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to hash on load
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Architecture />
        <Performance />
        
        {/* CTA Section */}
        <section className="section-padding bg-primary/5">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="rounded-lg border border-primary/20 bg-white/50 backdrop-blur-sm dark:bg-black/20 shadow-lg p-8 sm:p-12">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                  <AnimatedTransition animationType="slide-up" delay={100}>
                    <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      Ready to Transform Your 
                      <br />
                      <span className="text-gradient">React Development?</span>
                    </h2>
                  </AnimatedTransition>
                  
                  <AnimatedTransition animationType="slide-up" delay={200}>
                    <p className="mt-4 text-muted-foreground">
                      Join thousands of developers building the future with React Infinite. Get started today and experience the next generation of web development.
                    </p>
                  </AnimatedTransition>
                  
                  <AnimatedTransition animationType="slide-up" delay={300} className="mt-6 space-y-4 sm:space-x-4 sm:space-y-0">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Get Started
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Documentation
                    </Button>
                  </AnimatedTransition>
                </div>
                
                <AnimatedTransition animationType="fade" delay={400}>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium">Install the CLI</h3>
                        <p className="text-sm text-muted-foreground">
                          <code className="code-text">npm install -g @react-infinite/cli</code>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium">Create a New Project</h3>
                        <p className="text-sm text-muted-foreground">
                          <code className="code-text">infinite create my-app</code>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-medium">Start Building</h3>
                        <p className="text-sm text-muted-foreground">
                          <code className="code-text">cd my-app && infinite dev</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedTransition>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
