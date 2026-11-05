
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";
import { Button } from "@/components/ui/button";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("border-t border-border bg-secondary/30 py-12", className)}>
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              The next generation full-stack architecture for high-performance React applications.
            </p>
            <div className="mt-4 flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <GithubIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LinkedinIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="font-display text-sm font-medium">Platform</h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <Link to="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/tech-stack" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Tech Stack
                  </Link>
                </li>
                <li>
                  <Link to="/module-store" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Module Store
                  </Link>
                </li>
                <li>
                  <Link to="/components" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Component Library
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-sm font-medium">Resources</h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Developer Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/ai-optimization" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    AI Optimization
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Community Hub
                  </Link>
                </li>
                <li>
                  <a href="#roadmap" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-display text-sm font-medium">Subscribe</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Get the latest news and updates.
            </p>
            <div className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button className="rounded-l-none">
                →
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} React Infinite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
