"use client";

import { useRef, forwardRef, ReactNode, MouseEvent, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  function MagneticButton(
    { children, className, onMouseMove: userOnMouseMove, onMouseLeave: userOnMouseLeave, type = "button", ...props },
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
      userOnMouseMove?.(e);
      const el = localRef.current;
      if (!el || props.disabled) return;
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

    async function onMouseLeave(e: MouseEvent<HTMLButtonElement>) {
      userOnMouseLeave?.(e);
      if (props.disabled) return;
      const { gsap } = await import("gsap");
      gsap.to(localRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
    }

    return (
      <button
        ref={setRef}
        type={type}
        data-magnetic="true"
        className={cn("relative", className)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </button>
    );
  }
);
