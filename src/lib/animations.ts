// ── animations.ts ─────────────────────────────────────────────────────
// All GSAP imports are done at call-site (inside useEffect / async) to
// keep this file SSR-safe. This module only exports config and helpers.

// ── Easings ───────────────────────────────────────────────────────────
export const ease = {
  /** Lenis easing — expo out feel */
  lenis: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  out: "expo.out",
  inOut: "expo.inOut",
  sine: "sine.inOut",
  back: "back.out(1.4)",
} as const;

// ── Type alias so consumers don't need to import gsap ────────────────
type GSAPTarget = string | Element | Element[] | NodeList | null;
type GSAPVars = Record<string, unknown>;

// ── Helpers (accept a pre-imported gsap instance) ─────────────────────
// Usage inside useEffect:
//   const { gsap } = await import("gsap");
//   fadeUp(gsap, ref.current);

export function fadeUp(
  gsap: { fromTo: (t: GSAPTarget, f: GSAPVars, to: GSAPVars) => unknown },
  targets: GSAPTarget,
  opts: GSAPVars = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.9, ease: ease.out, ...opts }
  );
}

export function fadeIn(
  gsap: { fromTo: (t: GSAPTarget, f: GSAPVars, to: GSAPVars) => unknown },
  targets: GSAPTarget,
  opts: GSAPVars = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0 },
    { opacity: 1, duration: 0.7, ease: ease.out, ...opts }
  );
}

export function scaleIn(
  gsap: { fromTo: (t: GSAPTarget, f: GSAPVars, to: GSAPVars) => unknown },
  targets: GSAPTarget,
  opts: GSAPVars = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, ease: ease.back, ...opts }
  );
}

export function staggerFadeUp(
  gsap: { fromTo: (t: GSAPTarget, f: GSAPVars, to: GSAPVars) => unknown },
  targets: GSAPTarget,
  stagger = 0.08,
  opts: GSAPVars = {}
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: ease.out, stagger, ...opts }
  );
}

export function auroraDrift(
  gsap: { to: (t: GSAPTarget, v: GSAPVars) => unknown },
  target: GSAPTarget,
  opts: { x?: number; y?: number; duration?: number } = {}
) {
  return gsap.to(target, {
    x: opts.x ?? 80,
    y: opts.y ?? 60,
    duration: opts.duration ?? 20,
    ease: ease.sine,
    yoyo: true,
    repeat: -1,
  });
}
