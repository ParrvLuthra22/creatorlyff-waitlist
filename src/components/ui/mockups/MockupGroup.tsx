"use client";

import { useRef, useEffect } from "react";
import { MockupDashboard } from "./MockupDashboard";
import { MockupPhone } from "./MockupPhone";
import { MockupChat } from "./MockupChat";

export function MockupGroup() {
  const groupRef    = useRef<HTMLDivElement>(null);
  const desktopRef  = useRef<HTMLDivElement>(null);
  const phoneRef    = useRef<HTMLDivElement>(null);
  const chatRef     = useRef<HTMLDivElement>(null);

  // ── Mouse parallax tilt (Desktop only) ─────────────────────────────
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    let tiltX: ((v: number) => void) | undefined;
    let tiltY: ((v: number) => void) | undefined;
    let isActive = false;

    (async () => {
      const { gsap } = await import("gsap");
      tiltX = gsap.quickTo(group, "rotationY", { duration: 0.6, ease: "power2.out" }) as (v: number) => void;
      tiltY = gsap.quickTo(group, "rotationX", { duration: 0.6, ease: "power2.out" }) as (v: number) => void;
      isActive = true;
    })();

    function onMove(e: MouseEvent) {
      if (!isActive || !tiltX || !tiltY) return;
      const { innerWidth, innerHeight } = window;
      if (innerWidth < 768) return; // Disable on mobile

      const nx = (e.clientX / innerWidth  - 0.5) * 2; // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      tiltX(nx *  6);
      tiltY(ny * -4);
    }
    function onLeave() {
      if (window.innerWidth < 768) return;
      tiltX?.(0);
      tiltY?.(0);
    }

    if (!window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── Scroll reveal + float + parallax ──────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mm: gsap.MatchMedia;

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const desktop = desktopRef.current;
      const phone   = phoneRef.current;
      const chat    = chatRef.current;
      if (!desktop || !phone || !chat || !groupRef.current) return;

      mm = gsap.matchMedia();

      // DESKTOP (>= 768px)
      mm.add("(min-width: 768px)", () => {
        gsap.set(desktop, { clipPath: "inset(8% 8% 8% 8%)", opacity: 0 });
        gsap.set(phone,   { y: 80, opacity: 0, rotation: -20 });
        gsap.set(chat,    { y: 80, opacity: 0, rotation: 20 });

        ScrollTrigger.create({
          trigger: groupRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(desktop, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.2, ease: "expo.out" });
            gsap.to(phone, { y: 0, opacity: 1, rotation: -6, duration: 1, ease: "expo.out", delay: 0.2 });
            gsap.to(chat, { y: 0, opacity: 1, rotation: 4, duration: 1, ease: "expo.out", delay: 0.4 });

            gsap.to(desktop, { y: "+=10", duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
            gsap.to(phone,   { y: "+=14", duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
            gsap.to(chat,    { y: "+=8",  duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
          },
        });

        const parallaxItems = [ { el: desktop, speed: 0.5 }, { el: phone, speed: 0.7 }, { el: chat, speed: 0.6 } ];
        parallaxItems.forEach(({ el, speed }) => {
          ScrollTrigger.create({
            trigger: groupRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              gsap.set(el, { y: `+=${self.getVelocity() * speed * -0.001}` });
            },
          });
        });
      });

      // MOBILE (< 768px)
      mm.add("(max-width: 767px)", () => {
        gsap.set([desktop, phone, chat], { opacity: 0, y: 30, rotation: 0, clipPath: "inset(0% 0% 0% 0%)" });
        ScrollTrigger.create({
          trigger: groupRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to([desktop, phone, chat], { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "expo.out" });
          }
        });
      });
    })();

    return () => {
      if (mm) mm.revert();
    };
  }, []);

  return (
    <div
      ref={groupRef}
      className="relative w-full max-w-[900px] mx-auto h-auto md:h-[520px] flex flex-col md:block items-center gap-8 perspective-[1200px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ── Desktop panel ────────────────────────────── */}
      <div
        ref={desktopRef}
        className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-[660px] aspect-[16/10] z-20 rounded-[16px] overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 100px rgba(74,158,255,0.15), 0 40px 80px rgba(0,0,0,0.6)",
          willChange: "transform",
        }}
      >
        <MockupDashboard />
      </div>

      {/* ── Phone ──────────────────────── */}
      <div
        ref={phoneRef}
        className="relative md:absolute md:left-[2%] md:top-1/2 md:-translate-y-1/2 w-[85%] max-w-[260px] md:w-[210px] aspect-[9/19] z-30 rounded-[36px] overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 60px rgba(181,122,255,0.2), 0 30px 60px rgba(0,0,0,0.5)",
          willChange: "transform",
        }}
      >
        <MockupPhone />
      </div>

      {/* ── Chat card ──────────────────── */}
      <div
        ref={chatRef}
        className="relative md:absolute md:right-[1%] md:top-1/2 md:-translate-y-[42%] w-[90%] max-w-[280px] md:w-[240px] z-30"
        style={{ willChange: "transform" }}
      >
        <MockupChat />
      </div>
    </div>
  );
}
