"use client";

import { useRef, forwardRef, ReactNode, MouseEvent, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  function MagneticButton(
    { children, className, onClick, style, id, type = "button", disabled, "aria-label": ariaLabel },
    forwardedRef
  ) {
    const localRef = useRef<HTMLButtonElement>(null);

    // Merge forwarded ref + local ref onto the same DOM node
    function setRef(el: HTMLButtonElement | null) {
      (localRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef)
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    }

    const RADIUS = 80;

    async function onMouseMove(e: MouseEvent<HTMLButtonElement>) {
      const el = localRef.current;
      if (!el || disabled) return;
      const { gsap } = await import("gsap");
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < RADIUS) {
        const s = (RADIUS - dist) / RADIUS;
        gsap.to(el, { x: dx * s * 0.5, y: dy * s * 0.5, duration: 0.3, ease: "power2.out" });
      }
    }

    async function onMouseLeave() {
      if (disabled) return;
      const { gsap } = await import("gsap");
      gsap.to(localRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
    }

    return (
      <button
        ref={setRef}
        id={id}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        data-magnetic="true"
        className={cn("relative", className)}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
