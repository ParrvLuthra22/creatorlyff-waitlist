import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  variant?: "blue" | "violet";
  style?: CSSProperties;
}

export function GlowBorder({
  children,
  className,
  variant = "blue",
  style,
}: GlowBorderProps) {
  return (
    <div
      className={cn(
        variant === "blue" ? "glow-border" : "glow-border-violet",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
