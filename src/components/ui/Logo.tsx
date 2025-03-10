
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "light" | "dark";
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  variant = "primary",
  withText = true,
}) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  const variantClasses = {
    primary: "text-primary",
    light: "text-white",
    dark: "text-foreground",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          className={cn("h-full w-auto", variantClasses[variant])}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="8"
            className="fill-primary/10"
          />
          <path
            d="M16 8L24 16L16 24L8 16L16 8Z"
            className="fill-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="16"
            cy="16"
            r="4"
            className="fill-background"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {withText && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight",
            variantClasses[variant],
            {
              "text-sm": size === "sm",
              "text-base": size === "md",
              "text-lg": size === "lg",
            }
          )}
        >
          React Infinite
        </span>
      )}
    </div>
  );
};

export default Logo;
