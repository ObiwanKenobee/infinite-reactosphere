
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import GlassMorphicCard from "@/components/ui/GlassMorphicCard";
import AnimatedTransition from "@/components/ui/AnimatedTransition";
import { 
  MessageSquareIcon, 
  ShareIcon, 
  CodeIcon, 
  TrophyIcon, 
  ThumbsUpIcon, 
  MessageCircleIcon, 
  GitBranchIcon, 
  CalendarIcon,
  StarIcon
} from "lucide-react";

const CommunityHub = () => {
  const communityFeatures = [
    {
      title: "Open Developer Forum",
      icon: <MessageSquareIcon className="h-6 w-6" />,
      description: "Ask questions, share optimizations, and help fellow developers",
      cta: "Browse Forum"
    },
    {
      title: "Feature Voting & Proposals",
      icon: <ShareIcon className="h-6 w-6" />,
      description: "Community-driven roadmap decisions and feature requests",
      cta: "Submit Proposal"
    },
    {
      title: "Hackathons & Challenges",
      icon: <TrophyIcon className="h-6 w-6" />,
      description: "Meta-backed competitions with prizes and recognition",
      cta: "Join Hackathon"
    },
    {
      title: "Open-Source Contributions",
      icon: <CodeIcon className="h-6 w-6" />,
      description: "Explore top community projects and contribute your own",
      cta: "View Projects"
    }
  ];

  const topContributors = [
    {
      name: "Alex Chen",
      role: "WASM Core Contributor",
      contributions: 247,
      avatar: "AC"
    },
    {
      name: "Sarah Johnson",
      role: "WebGPU Specialist",
      contributions: 189,
      avatar: "SJ"
    },
    {
      name: "Miguel Rodriguez",
      role: "Performance Optimizer",
      contributions: 156,
      avatar: "MR"
    },
    {
      name: "Priya Sharma",
      role: "AI Integration Expert",
      contributions: 132,
      avatar: "PS"
    }
  ];

  const upcomingEvents = [
    {
      title: "WASM Performance Hackathon",
      date: "August 15-20, 2023",
      participants: 842,
      type: "Online"
    },
    {
      title: "React Infinite Developer Conference",
      date: "September 5-7, 2023",
      participants: 1250,
      type: "Hybrid"
    }
  ];

  return (
    <DashboardLayout
      title="Community & Developer Hub"
      description="Collaborate, innovate, and join the React Infinite open-source community"
    >
      <div className="grid gap-8">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="group">
            <ShareIcon className="mr-2 h-4 w-4" />
            Submit a Feature Proposal
          </Button>
          <Button variant="secondary" className="group">
            <TrophyIcon className="mr-2 h-4 w-4" />
            Join a Hackathon
          </Button>
          <Button variant="outline" className="group">
            <CodeIcon className="mr-2 h-4 w-4" />
            View Open-Source Contributions
          </Button>
        </div>

        {/* Community features */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {communityFeatures.map((feature, index) => (
            <AnimatedTransition key={index} delay={100 * index} animationType="scale">
              <GlassMorphicCard className="flex h-full flex-col p-6" hoverEffect="lift">
                <div className="mb-4 rounded-full bg-primary/10 p-2 text-primary w-fit">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 flex-grow text-sm text-muted-foreground">
                  {feature.description}
                </p>
                <Button variant="outline" className="mt-6 w-full">
                  {feature.cta}
                </Button>
              </GlassMorphicCard>
            </AnimatedTransition>
          ))}
        </div>

        {/* Top contributors */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Top Contributors</h2>
          <GlassMorphicCard className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                    {contributor.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{contributor.name}</h3>
                    <p className="text-xs text-muted-foreground">{contributor.role}</p>
                    <div className="mt-1 flex items-center text-xs">
                      <GitBranchIcon className="mr-1 h-3 w-3 text-primary" />
                      <span>{contributor.contributions} contributions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassMorphicCard>
        </section>

        {/* Upcoming events */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <AnimatedTransition key={index} delay={100 * index} animationType="slide-up">
                <GlassMorphicCard className="p-5" hoverEffect="glow">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-medium">{event.title}</h3>
                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1.5 h-4 w-4" />
                        {event.date}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {event.type}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {event.participants} registered
                      </span>
                    </div>
                    <Button>Register Now</Button>
                  </div>
                </GlassMorphicCard>
              </AnimatedTransition>
            ))}
          </div>
        </section>

        {/* Featured community projects */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold">Featured Community Projects</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <GlassMorphicCard className="p-5" hoverEffect="lift">
              <div className="flex items-start">
                <div className="mr-4 rounded-lg bg-primary/10 p-2 text-primary">
                  <CodeIcon className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-medium">WASM Animation Library</h3>
                    <div className="flex items-center">
                      <StarIcon className="mr-1 h-4 w-4 text-amber-500" />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A high-performance animation library built with WebAssembly that delivers smooth 60fps animations on any device.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <GitBranchIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>86 forks</span>
                      <span className="mx-2">•</span>
                      <ThumbsUpIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>342 stars</span>
                      <span className="mx-2">•</span>
                      <MessageCircleIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>48 discussions</span>
                    </div>
                    <Button size="sm" variant="outline">View Project</Button>
                  </div>
                </div>
              </div>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-5" hoverEffect="lift">
              <div className="flex items-start">
                <div className="mr-4 rounded-lg bg-primary/10 p-2 text-primary">
                  <CodeIcon className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-medium">AI Performance Analyzer</h3>
                    <div className="flex items-center">
                      <StarIcon className="mr-1 h-4 w-4 text-amber-500" />
                      <span className="font-medium">4.9</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    An AI-powered tool that analyzes your React Infinite app and suggests optimizations for better performance.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <GitBranchIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>124 forks</span>
                      <span className="mx-2">•</span>
                      <ThumbsUpIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>517 stars</span>
                      <span className="mx-2">•</span>
                      <MessageCircleIcon className="mr-1.5 h-3.5 w-3.5" />
                      <span>73 discussions</span>
                    </div>
                    <Button size="sm" variant="outline">View Project</Button>
                  </div>
                </div>
              </div>
            </GlassMorphicCard>
          </div>
        </section>

        {/* Join the community */}
        <section className="mt-8">
          <GlassMorphicCard className="p-6 md:p-8" hoverEffect="glow" border="accent">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Join the React Infinite Community</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Be part of the next generation of web development. Connect with thousands of developers building the future with WebAssembly and AI-driven optimizations.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button size="lg">
                  <MessageSquareIcon className="mr-2 h-4 w-4" />
                  Join Discord
                </Button>
                <Button size="lg" variant="outline">
                  <GitBranchIcon className="mr-2 h-4 w-4" />
                  GitHub Community
                </Button>
              </div>
            </div>
          </GlassMorphicCard>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CommunityHub;
