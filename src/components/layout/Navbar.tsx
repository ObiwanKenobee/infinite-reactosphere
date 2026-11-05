
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";
import { Button } from "@/components/ui/button";
import { GithubIcon, MenuIcon, XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { name: "Features", href: isHome ? "#features" : "/#features", internal: false },
    { name: "Architecture", href: isHome ? "#architecture" : "/#architecture", internal: false },
    { name: "Roadmap", href: "/roadmap", internal: true },
    { name: "Tech Stack", href: "/tech-stack", internal: true },
    { name: "Dashboard", href: "/dashboard", internal: true },
    { name: "Docs", href: "/docs", internal: true },
    { name: "Community", href: "/community", internal: true },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled ? "glass-navbar py-3" : "bg-transparent py-4",
        className
      )}
    >
      <div className="container-padding mx-auto flex max-w-7xl items-center justify-between">
        <Logo variant={isScrolled ? "primary" : "light"} />

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.internal ? (
                  <Link
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-foreground/80 hover:text-foreground"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-foreground/80 hover:text-foreground"
                        : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-white/10 bg-white/5 text-sm hover:bg-white/10",
              isScrolled
                ? "border-border bg-background/50 text-foreground"
                : "border-white/10 bg-white/5 text-white"
            )}
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button size="sm" className="text-sm">
            Get Started
          </Button>
        </div>

        <button
          className="p-1 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XIcon className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
          ) : (
            <MenuIcon className={cn("h-6 w-6", isScrolled ? "text-foreground" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full transform bg-card px-6 py-4 shadow-lg transition-transform md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="space-y-4 pb-4">
          {navLinks.map((link) => (
            link.internal ? (
              <Link
                key={link.name}
                to={link.href}
                className="block py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            )
          ))}
          <div className="flex flex-col space-y-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-center"
            >
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button
              size="sm"
              className="justify-center"
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
