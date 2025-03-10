
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboardIcon, 
  ComponentIcon, 
  BrainIcon, 
  PackageIcon, 
  BookIcon, 
  UsersIcon, 
  HomeIcon 
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
    { name: "Component Library", path: "/components", icon: ComponentIcon },
    { name: "AI Optimization", path: "/ai-optimization", icon: BrainIcon },
    { name: "Module Store", path: "/module-store", icon: PackageIcon },
    { name: "Documentation", path: "/docs", icon: BookIcon },
    { name: "Community Hub", path: "/community", icon: UsersIcon },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="container-padding mx-auto max-w-7xl py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Sidebar */}
          <aside className="md:col-span-1 lg:col-span-1">
            <nav className="sticky top-24 w-full space-y-1 rounded-lg border bg-card p-4 shadow-sm">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          
          {/* Main content */}
          <main className="md:col-span-3 lg:col-span-4">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-muted-foreground">{description}</p>
              )}
            </div>
            
            {children}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
