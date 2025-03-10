
import { cn } from "@/lib/utils";
import React from "react";

interface GlassMorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "glow" | "scale" | "none";
  blur?: "none" | "sm" | "md" | "lg";
  border?: "none" | "thin" | "subtle" | "accent";
}

const GlassMorphicCard = ({
  children,
  className,
  hoverEffect = "lift",
  blur = "md",
  border = "subtle",
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
  };

  const hoverClasses = {
    none: "",
    lift: "hover:-translate-y-1 hover:shadow-lg",
    glow: "hover:shadow-lg hover:shadow-primary/10",
    scale: "hover:scale-[1.02]",
  };

  return (
    <div
      className={cn(
        "relative rounded-lg bg-white/10 dark:bg-black/20",
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
