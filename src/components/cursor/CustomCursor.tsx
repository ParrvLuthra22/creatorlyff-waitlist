"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const blob = blobRef.current as HTMLDivElement;
    const dot  = dotRef.current as HTMLDivElement;
    if (!blob || !dot) return;

    let blobX: (v: number) => void;
    let blobY: (v: number) => void;
    let dotX:  (v: number) => void;
    let dotY:  (v: number) => void;
    let ready = false;

    (async () => {
      const { gsap } = await import("gsap");

      gsap.set([blob, dot], { x: -100, y: -100 });

      // quickTo for buttery smooth following
      blobX = gsap.quickTo(blob, "x", { duration: 0.5,  ease: "power2.out" }) as (v: number) => void;
      blobY = gsap.quickTo(blob, "y", { duration: 0.5,  ease: "power2.out" }) as (v: number) => void;
      dotX  = gsap.quickTo(dot,  "x", { duration: 0.15, ease: "power2.out" }) as (v: number) => void;
      dotY  = gsap.quickTo(dot,  "y", { duration: 0.15, ease: "power2.out" }) as (v: number) => void;

      ready = true;

      // Store gsap ref for expand/collapse tweens
      window.__cursorGsap = gsap;
    })();

    function onMouseMove(e: MouseEvent) {
      if (!ready) return;
      blobX(e.clientX);
      blobY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);

      if (!isVisible.current) {
        isVisible.current = true;
        blob.style.opacity = "1";
        dot.style.opacity  = "1";
      }
    }

    function onMouseEnter(e: MouseEvent) {
      if (!ready || !window.__cursorGsap) return;
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-magnetic]") ||
        target.closest("[data-cursor-expand]");

      if (isInteractive) {
        window.__cursorGsap.to(blob, {
          width: 72, height: 72, opacity: 0.6,
          borderRadius: "40%",
          boxShadow: "0 0 0 1.5px rgba(255,255,255,0.5)",
          duration: 0.3, ease: "power2.out",
        });
      }
    }

    function onMouseLeave(e: MouseEvent) {
      if (!ready || !window.__cursorGsap) return;
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-magnetic]") ||
        target.closest("[data-cursor-expand]");

      if (isInteractive) {
        window.__cursorGsap.to(blob, {
          width: 28, height: 28, opacity: 0.4,
          borderRadius: "50%", boxShadow: "none",
          duration: 0.3, ease: "power2.out",
        });
      }
    }

    document.addEventListener("mousemove",  onMouseMove);
    document.addEventListener("mouseover",  onMouseEnter);
    document.addEventListener("mouseout",   onMouseLeave);

    return () => {
      document.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseover",  onMouseEnter);
      document.removeEventListener("mouseout",   onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Blob — slow follower, glows over dark bg via screen blend */}
      <div
        ref={blobRef}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           28,
          height:          28,
          borderRadius:    "50%",
          background:      "rgba(74, 158, 255, 0.40)",
          backdropFilter:  "blur(4px)",
          mixBlendMode:    "screen",
          pointerEvents:   "none",
          zIndex:          9999,
          transform:       "translate(-50%, -50%)",
          opacity:         0,
          willChange:      "transform",
          transition:      "opacity 0.3s",
        }}
      />
      {/* Dot — fast precision follower */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         5,
          height:        5,
          borderRadius:  "50%",
          background:    "#ffffff",
          pointerEvents: "none",
          zIndex:        10000,
          transform:     "translate(-50%, -50%)",
          opacity:       0,
          willChange:    "transform",
          transition:    "opacity 0.3s",
        }}
      />
    </>
  );
}

// Minimal global augment so onMouseEnter can reach gsap without prop-drilling
declare global {
  interface Window {
    __cursorGsap?: {
      to: (target: Element, vars: Record<string, unknown>) => void;
    };
  }
}
