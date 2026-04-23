"use client";

import { useRef, useEffect, Fragment } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MockupGroup } from "@/components/ui/mockups/MockupGroup";
import { useModal } from "@/components/providers/ModalProvider";

// ── Headline config ────────────────────────────────────────────────────
const HEADLINE = "Connect with creators who actually move the needle.";
const GRADIENT_WORD = "needle.";

// ── Sub-copy ───────────────────────────────────────────────────────────
const SUBCOPY =
  "Creatorlyff is the infrastructure layer for brand-creator collaborations. Discovery, proposals, chat, payments in one place, built for people who are tired of DMs.";

// ── Render headline as per-word reveal spans ───────────────────────────
function SplitHeadline({ headlineRef }: { headlineRef: React.RefObject<HTMLHeadingElement | null> }) {
  const words = HEADLINE.split(" ");
  return (
    <h1
      ref={headlineRef}
      style={{
        fontSize: "clamp(48px, 7vw, 104px)",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        color: "#fff",
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="word-clip">
            <span
              className={`word-inner${word === GRADIENT_WORD ? " needle-gradient" : ""}`}
            >
              {word}
            </span>
          </span>
          {wi < words.length - 1 && (
            <span className="word-clip" style={{ width: "0.28em", display: "inline-block" }}>
              <span className="word-inner">&nbsp;</span>
            </span>
          )}
        </Fragment>
      ))}
    </h1>
  );
}

export function Hero() {
  const { open } = useModal();
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const subcopyRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const trustRef     = useRef<HTMLDivElement>(null);

  // ── GSAP headline + fade-in animations ────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    (async () => {
      const { gsap } = await import("gsap");

      // Collect all .word-inner spans from the headline
      const words = headlineRef.current?.querySelectorAll<HTMLElement>(".word-inner");
      if (words && words.length) {
        // Start below overflow clip
        gsap.set(words, { y: "105%", opacity: 0 });

        gsap.to(words, {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.055,
          delay: 0.3,
        });
      }

      // Eyebrow pill
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 0.1 }
      );

      // Subcopy
      gsap.fromTo(
        subcopyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.9 }
      );

      // CTA row
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", delay: 1.1 }
      );

      // Trust text
      gsap.fromTo(
        trustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "expo.out", delay: 1.35 }
      );
    })();
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 128,
        paddingBottom: 80,
        background: "linear-gradient(180deg, #000 0%, #0A0A1A 50%, #000 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          zIndex: 10,
          position: "relative",
        }}
      >
        {/* ── Eyebrow pill ────────────────────────────────────────── */}
        <div
          ref={eyebrowRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 9999,
            padding: "7px 16px",
            marginBottom: 36,
            opacity: 0,
          }}
        >
          <span
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#5EEAD4",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 400,
            }}
          >
            LAUNCHING Q2 2026
          </span>
        </div>

        {/* ── Headline ─────────────────────────────────────────────── */}
        <SplitHeadline headlineRef={headlineRef} />

        {/* ── Subcopy ──────────────────────────────────────────────── */}
        <p
          ref={subcopyRef}
          style={{
            maxWidth: 620,
            textAlign: "center",
            color: "rgba(255,255,255,0.55)",
            fontWeight: 300,
            fontSize: 18,
            lineHeight: 1.7,
            marginTop: 32,
            opacity: 0,
          }}
        >
          {SUBCOPY}
        </p>

        {/* ── CTA row ──────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4"
          style={{ opacity: 0 }}
        >
          {/* Primary CTA */}
          <MagneticButton
            id="hero-get-early-access"
            onClick={open}
            className="w-full sm:w-auto flex items-center justify-center"
            style={{
              borderRadius: 9999,
              padding: "14px 36px",
              background: "linear-gradient(135deg,#4A9EFF 0%,#3080E0 100%)",
              border: "none",
              color: "#fff",
              fontWeight: 300,
              fontSize: 16,
              boxShadow: "0 0 48px rgba(74,158,255,0.40)",
              letterSpacing: "0.01em",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 70px rgba(74,158,255,0.6)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 48px rgba(74,158,255,0.40)";
            }}
          >
            Get Early Access →
          </MagneticButton>

          {/* Secondary CTA */}
          <button
            className="w-full sm:w-auto flex items-center justify-center"
            style={{
              borderRadius: 9999,
              padding: "14px 36px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.75)",
              fontWeight: 300,
              fontSize: 16,
              letterSpacing: "0.01em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
            }}
          >
            Watch demo
          </button>
        </div>

        {/* ── Trust row ────────────────────────────────────────────── */}
        <div
          ref={trustRef}
          style={{
            marginTop: 32,
            opacity: 0,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
          }}
        >
          Trusted by 500+ creators and brands on the waitlist
        </div>

        {/* ── Mockup group ─────────────────────────────────────────── */}
        <div style={{ marginTop: 96, width: "100%", maxWidth: 920 }}>
          <MockupGroup />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to bottom, transparent, #000)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </section>
  );
}
