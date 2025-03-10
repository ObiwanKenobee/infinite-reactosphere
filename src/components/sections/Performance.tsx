
import React from "react";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import AnimatedTransition from "../ui/AnimatedTransition";
import GlassMorphicCard from "../ui/GlassMorphicCard";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BracesIcon, GaugeIcon } from "lucide-react";

interface PerformanceProps {
  className?: string;
}

const Performance: React.FC<PerformanceProps> = ({ className }) => {
  const performanceData = [
    { name: "Initial Load", traditional: 2.4, infinite: 0.6 },
    { name: "JS Execution", traditional: 1.8, infinite: 0.3 },
    { name: "Rendering", traditional: 1.2, infinite: 0.2 },
    { name: "Data Fetching", traditional: 0.9, infinite: 0.15 },
    { name: "User Interaction", traditional: 0.7, infinite: 0.1 },
  ];

  const scalabilityData = [
    { name: "1K", traditional: 98, infinite: 99.9 },
    { name: "10K", traditional: 96, infinite: 99.8 },
    { name: "100K", traditional: 85, infinite: 99.5 },
    { name: "1M", traditional: 65, infinite: 98.9 },
    { name: "10M", traditional: 40, infinite: 97.5 },
    { name: "100M", traditional: 15, infinite: 95.8 },
    { name: "1B", traditional: 5, infinite: 92.3 },
  ];

  return (
    <section id="performance" className={cn("section-padding relative", className)}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <AnimatedTransition delay={100} animationType="slide-up">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Unmatched <span className="text-gradient">Performance</span>
            </h2>
          </AnimatedTransition>
          
          <AnimatedTransition delay={200} animationType="slide-up">
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
              React Infinite delivers exceptional speed and efficiency across all key performance metrics.
            </p>
          </AnimatedTransition>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <AnimatedTransition delay={300} animationType="fade">
            <GlassMorphicCard className="overflow-hidden p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">Loading Performance</h3>
                  <p className="text-sm text-muted-foreground">Time in seconds (lower is better)</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <GaugeIcon className="h-5 w-5" />
                </div>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '0.5rem',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="traditional" 
                      name="Traditional React" 
                      fill="#94a3b8" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey="infinite" 
                      name="React Infinite" 
                      fill="rgba(37, 99, 235, 0.9)" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassMorphicCard>
          </AnimatedTransition>

          <AnimatedTransition delay={400} animationType="fade">
            <GlassMorphicCard className="overflow-hidden p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">Scalability</h3>
                  <p className="text-sm text-muted-foreground">Performance score vs. concurrent users</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <BracesIcon className="h-5 w-5" />
                </div>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={scalabilityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      axisLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '0.5rem',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="traditional" 
                      name="Traditional React" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="infinite" 
                      name="React Infinite" 
                      stroke="rgba(37, 99, 235, 0.9)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassMorphicCard>
          </AnimatedTransition>
        </div>

        <div className="mt-12 text-center">
          <AnimatedTransition delay={500} animationType="slide-up">
            <Button className="group">
              Run Performance Benchmark
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </AnimatedTransition>
        </div>
      </div>
    </section>
  );
};

export default Performance;
