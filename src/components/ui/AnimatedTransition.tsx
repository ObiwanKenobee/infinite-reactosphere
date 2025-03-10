
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "slide-up" | "slide-down" | "scale";
  delay?: number;
  duration?: number;
  show?: boolean;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  animationType = "fade",
  delay = 0,
  duration = 400,
  show = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, delay]);

  const animations = {
    fade: `transition-opacity duration-${duration} ${isVisible ? "opacity-100" : "opacity-0"}`,
    "slide-up": `transition-all duration-${duration} ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`,
    "slide-down": `transition-all duration-${duration} ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
    }`,
    scale: `transition-all duration-${duration} ${
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`,
  };

  return (
    <div
      className={cn(
        "hardware-accelerated",
        animations[animationType],
        className
      )}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
