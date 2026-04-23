"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";

interface LenisContextValue {
  lenis: unknown | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    // Dynamic imports keep GSAP and Lenis out of the SSR bundle entirely
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("@studio-freight/lenis"),
          import("gsap"),
          import("gsap/dist/ScrollTrigger"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.08,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Sync Lenis RAF with GSAP ticker
      gsap.ticker.add((time: number) => {
        (lenis as { raf: (t: number) => void }).raf(time * 1000);
      });

      // Disable GSAP lag smoothing to prevent jitter
      gsap.ticker.lagSmoothing(0);

      // Keep ScrollTrigger in sync
      lenis.on("scroll", ScrollTrigger.update);

      cleanup = () => {
        lenis.destroy();
        lenisRef.current = null;
      };
    })();

    return () => cleanup?.();
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
