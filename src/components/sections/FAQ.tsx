"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "When does Creatorlyff launch?",
    answer: "Soon in 2026 for early access. Waitlist members get priority onboarding."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes. Brands start Free with limited proposals. Creators are always free."
  },
  {
    question: "How do payments work?",
    answer: "Razorpay-powered milestone payments. Brands fund milestones upfront. Creators get paid within 24 hours of delivery approval."
  },
  {
    question: "Do you verify creators?",
    answer: "Every creator profile is manually reviewed. We verify follower counts via Instagram / YouTube / Any other socials APIs and cross-check engagement data."
  },
  {
    question: "Can I use Creatorlyff outside India?",
    answer: "Waitlist is global. Launch starts in India, then SEA + Middle East by end of 2026. North America + EU in early 2027."
  }
];

function AccordionItem({ item, isOpen, onClick }: { item: typeof FAQ_ITEMS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div 
      className={`border-b border-white/10 py-6 cursor-pointer group transition-colors ${isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center px-4">
        <h4 className={`text-[17px] font-normal transition-colors ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
          {item.question}
        </h4>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-white/60 group-hover:text-white"
        >
          <Plus size={20} strokeWidth={1.5} />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 text-white/50 font-light text-[15px] leading-relaxed mt-4">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 1, ease: "expo.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
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
    <section ref={containerRef} className="py-32 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-20">
        
        {/* Left Side: Sticky Text */}
        <div className="md:col-span-2">
          <div className="sticky top-32">
            <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="font-mono text-[11px] tracking-[0.12em] text-white/60">
                — QUESTIONS
              </span>
            </div>
            
            <h2 className="text-[40px] md:text-[48px] font-light leading-[1.1] text-white tracking-[-0.02em]">
              Everything you want to know.
            </h2>
            
            <p className="text-white/50 font-light text-[15px] mt-6 max-w-sm">
              Can't find what you're looking for? Email us at <a href="mailto:hello@creatorlyff.in" className="text-[#4A9EFF] hover:underline">hello@creatorlyff.in</a>
            </p>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="md:col-span-3 flex flex-col border-t border-white/10">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
