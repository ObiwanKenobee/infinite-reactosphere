
import { cn } from "@/lib/utils";
import React from "react";

interface GlassMorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "scale" | "none" | "tilt" | "shine";
  blur?: "none" | "sm" | "md" | "lg";
  border?: "none" | "thin" | "subtle" | "accent" | "gradient";
  intensity?: "low" | "medium" | "high";
}

const GlassMorphicCard = ({
  children,
  className,
  hoverEffect = "lift",
  blur = "md",
  border = "subtle",
  intensity = "medium",
  ...props
}: GlassMorphicCardProps) => {
  const blurClasses = {
    none: "",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  };

  const borderClasses = {
    none: "border-0",
    thin: "border border-white/10",
    subtle: "border border-white/20",
    accent: "border border-primary/20",
    gradient: "border-2 border-gradient-to-r from-primary/30 to-secondary/30",
  };

  const intensityClasses = {
    low: "bg-white/5 dark:bg-black/10",
    medium: "bg-white/10 dark:bg-black/20",
    high: "bg-white/20 dark:bg-black/30",
  };

  const hoverClasses = {
    none: "",
    lift: "hover:-translate-y-1 hover:shadow-lg",
    glow: "hover:shadow-lg hover:shadow-primary/10",
    scale: "hover:scale-[1.02]",
    tilt: "hover:rotate-1 hover:-translate-y-1",
    shine: "hover:before:opacity-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 overflow-hidden",
  };

  return (
    <div
      className={cn(
        "relative rounded-lg",
        intensityClasses[intensity],
        blurClasses[blur],
        borderClasses[border],
        "shadow-sm",
        "transition-all duration-300 ease-out",
        hoverClasses[hoverEffect],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassMorphicCard;
