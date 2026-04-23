"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

function MockupDiscovery() {
  return (
    <div className="w-full aspect-[4/3] rounded-[20px] bg-[#0A0A0F] border border-white/10 p-6 overflow-hidden flex flex-col relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-white/5 rounded-lg px-4 py-2 border border-white/10 text-[13px] text-white/50 flex items-center">Search creators...</div>
        <div className="bg-[#4A9EFF]/20 text-[#4A9EFF] rounded-lg px-3 py-2 text-[12px] border border-[#4A9EFF]/30 flex items-center">Tech</div>
        <div className="bg-white/5 text-white/70 rounded-lg px-3 py-2 text-[12px] border border-white/10 flex items-center">Beauty</div>
        <div className="bg-white/5 text-white/70 rounded-lg px-3 py-2 text-[12px] border border-white/10 flex items-center hidden sm:flex">Gaming</div>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="bg-white/5 rounded-xl border border-white/5 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#4A9EFF] to-[#B57AFF] shrink-0 opacity-80" />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="w-2/3 h-2.5 bg-white/20 rounded-full" />
              <div className="w-1/2 h-2 bg-white/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupProposal() {
  return (
    <div className="w-full aspect-[4/3] rounded-[20px] bg-[#0A0A0F] border border-white/10 p-6 overflow-hidden flex flex-col z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
      <div className="text-[14px] text-white/80 border-b border-white/10 pb-4 mb-4 font-light">New Proposal from Nova Studios</div>
      <div className="flex flex-col gap-3">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
          <span className="text-white/50 text-[13px] font-light">Budget</span>
          <span className="text-white text-[15px]">₹45,000</span>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
          <span className="text-white/50 text-[13px] font-light">Deliverables</span>
          <span className="text-white text-[15px]">2 reels + 3 stories</span>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex justify-between items-center">
          <span className="text-white/50 text-[13px] font-light">Deadline</span>
          <span className="text-white text-[15px]">Nov 28</span>
        </div>
      </div>
      <div className="mt-auto flex gap-3 pt-4">
        <div className="flex-1 text-center py-3 rounded-xl border border-white/10 text-white/60 text-[14px] font-light">Decline</div>
        <div className="flex-1 text-center py-3 rounded-xl bg-[#4A9EFF] text-white text-[14px] font-light shadow-[0_0_24px_rgba(74,158,255,0.4)]">Accept</div>
      </div>
    </div>
  );
}

function MockupPayments() {
  const rows = [
    { name: "Luwa Nanon", amount: "₹35,000", status: "Paid", glow: true },
    { name: "Marik Moojen", amount: "₹28,000", status: "In Escrow", glow: false },
    { name: "Sarah Connor", amount: "₹15,000", status: "Paid", glow: true },
    { name: "Tech Weekly", amount: "₹110,000", status: "In Escrow", glow: false },
  ];
  return (
    <div className="w-full aspect-[4/3] rounded-[20px] bg-[#0A0A0F] border border-white/10 p-6 overflow-hidden flex flex-col justify-center z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative">
      <div className="flex flex-col gap-3">
        {rows.map((r, i) => (
          <div key={i} className="flex justify-between items-center bg-white/5 border border-white/5 rounded-xl p-4">
            <span className="text-white/80 text-[14px] font-light">{r.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-white text-[14px] font-light">{r.amount}</span>
              <div className="flex items-center gap-2 min-w-[70px]">
                {r.glow && <div className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] shadow-[0_0_8px_rgba(94,234,212,0.8)]" />}
                {!r.glow && <div className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                <span className={`text-[12px] font-light ${r.glow ? "text-[#5EEAD4]" : "text-white/40"}`}>{r.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <span key={ci} className="inline-block overflow-hidden pb-1 -mb-1">
              <span className="inline-block translate-y-[1.1em] opacity-0 char-reveal-target">{char}</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

function Panel({
  num,
  heading,
  body,
  bullets,
  Visual,
  reverse
}: {
  num: string;
  heading: string;
  body: string;
  bullets: string[];
  Visual: React.FC;
  reverse: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Text side
          const chars = textRef.current?.querySelectorAll(".char-reveal-target");
          const staggerEls = textRef.current?.querySelectorAll(".stagger-fade");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panelRef.current,
              start: "top 75%",
              once: true
            }
          });

          if (chars) {
            tl.to(chars, { y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: "power4.out" });
          }
          if (staggerEls) {
            tl.fromTo(staggerEls, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6");
          }

          // Visual side
          if (visualRef.current) {
            gsap.fromTo(visualRef.current, 
              { clipPath: "inset(5%)", scale: 0.95 },
              {
                clipPath: "inset(0%)",
                scale: 1,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: panelRef.current,
                  start: "top 75%",
                  once: true
                }
              }
            );

            gsap.to(visualRef.current, {
              y: reverse ? 8 : -8,
              duration: 4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 1.2
            });

            const tiltX = gsap.quickTo(visualRef.current, "rotationY", { duration: 0.6, ease: "power2.out" });
            const tiltY = gsap.quickTo(visualRef.current, "rotationX", { duration: 0.6, ease: "power2.out" });

            visualContainerRef.current?.addEventListener("mousemove", (e: MouseEvent) => {
               if (window.innerWidth < 768) return;
               const rect = visualContainerRef.current!.getBoundingClientRect();
               const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
               const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
               tiltX(nx * 6);
               tiltY(ny * -6);
            });
            visualContainerRef.current?.addEventListener("mouseleave", () => {
               if (window.innerWidth < 768) return;
               tiltX(0);
               tiltY(0);
            });
          }
        });
      });
    });

    return () => { if (ctx) ctx.revert(); };
  }, [reverse]);

  return (
    <div ref={panelRef} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-16 items-center w-full`}>
      <div ref={textRef} className="flex-1 flex flex-col gap-6">
        <div className="stagger-fade font-mono text-[12px] tracking-[0.12em] text-white/40 uppercase">{num}</div>
        <h3 className="text-[32px] md:text-[40px] font-light leading-tight text-white max-w-lg tracking-[-0.01em]">
          <SplitChars text={heading} />
        </h3>
        <p className="stagger-fade text-[16px] font-light leading-relaxed text-white/60 max-w-md">
          {body}
        </p>
        <ul className="flex flex-col gap-3 mt-2">
          {bullets.map((b, i) => (
            <li key={i} className="stagger-fade flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#4A9EFF]/10 border border-[#4A9EFF]/20 flex items-center justify-center shrink-0">
                <Check size={12} className="text-[#4A9EFF]" />
              </div>
              <span className="text-white/70 text-[15px] font-light">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div ref={visualContainerRef} className="flex-1 w-full" style={{ perspective: 1200 }}>
        <div ref={visualRef} className="w-full hover:scale-[1.01] transition-transform duration-500 relative group" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute inset-0 bg-[#4A9EFF]/10 blur-[80px] rounded-full scale-75 group-hover:bg-[#4A9EFF]/20 transition-all duration-500 opacity-0 group-hover:opacity-100" />
          <Visual />
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: any;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
            [eyebrowRef.current, headingRef.current, subRef.current],
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "expo.out",
              scrollTrigger: {
                trigger: eyebrowRef.current,
                start: "top 85%",
                once: true
              }
            }
          );
        });
      });
    });
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <section className="py-32 px-6 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* ── TOP HEADER ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center">
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="font-mono text-[11px] tracking-[0.12em] text-white/60">
            — THE PRODUCT
          </span>
        </div>

        <h2
          ref={headingRef}
          className="font-light text-white max-w-3xl mx-auto tracking-[-0.02em] leading-[1.1]"
          style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
        >
          Built for how deals actually get done.
        </h2>

        <p
          ref={subRef}
          className="text-white/60 font-light text-[17px] max-w-xl mx-auto mt-6"
        >
          Three surfaces, one workflow. Discovery, conversation, payment all connected.
        </p>
      </div>

      {/* ── PANELS ───────────────────────────────────────────────────────────── */}
      <div className="mt-24 md:mt-32 flex flex-col gap-24 md:gap-40">
        <Panel
          num="01 — DISCOVERY"
          heading="Find creators who already love your brand."
          body="Filter by niche, audience size, engagement, and location. Every creator is verified — follower counts, demographics, past collaborations."
          bullets={[
            "Verified follower + engagement data",
            "Niche + audience demographic filters",
            "Past collaboration history"
          ]}
          Visual={MockupDiscovery}
          reverse={false}
        />

        <Panel
          num="02 — PROPOSALS"
          heading="Proposals, not DMs."
          body="Send structured proposals with budget, deliverables, deadlines. Creators accept, decline, or counter. No more chasing replies."
          bullets={[
            "Structured budget + deliverables",
            "Accept / decline / counter flow",
            "Automatic creator notifications"
          ]}
          Visual={MockupProposal}
          reverse={true}
        />

        <Panel
          num="03 — PAYMENTS"
          heading="Secure payments, on time."
          body="Razorpay-powered milestone payments. Brands fund, creators get paid on delivery. Every transaction receipted and tracked."
          bullets={[
            "Milestone-based escrow",
            "Instant payouts",
            "Full audit trail"
          ]}
          Visual={MockupPayments}
          reverse={false}
        />
      </div>
    </section>
  );
}
