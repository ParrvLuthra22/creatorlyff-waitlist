"use client";

import { useEffect, useRef } from "react";
import { auroraDrift } from "@/lib/animations";

export function AuroraBackground() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        if (blob1Ref.current) auroraDrift(gsap, blob1Ref.current, { x: 80,  y: 60,  duration: 22 });
        if (blob2Ref.current) auroraDrift(gsap, blob2Ref.current, { x: -100, y: -70, duration: 18 });
        if (blob3Ref.current) auroraDrift(gsap, blob3Ref.current, { x: 60,  y: -50, duration: 25 });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Blob 1 — electric blue, top-left */}
      <div
        ref={blob1Ref}
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,158,255,0.30) 0%, transparent 70%)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      {/* Blob 2 — violet, bottom-right */}
      <div
        ref={blob2Ref}
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(181,122,255,0.25) 0%, transparent 70%)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />
      {/* Blob 3 — blue, centre */}
      <div
        ref={blob3Ref}
        style={{
          position: "absolute",
          top: "35%",
          left: "35%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,158,255,0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
      {/* SVG grain — kills colour banding */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
        }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
