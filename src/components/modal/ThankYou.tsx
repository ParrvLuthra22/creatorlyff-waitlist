"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";

export function ThankYou({ position, onClose }: { position: number; onClose: () => void }) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Confetti
    confetti({
      colors: ['#4A9EFF', '#B57AFF', '#FFFFFF', '#5EEAD4'],
      spread: 70,
      particleCount: 60,
      origin: { y: 0.6 }
    });

    // Counting animation
    if (countRef.current) {
      const obj = { val: 0 };
      import("gsap").then(({ gsap }) => {
        gsap.to(obj, {
          val: position,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.innerText = Math.floor(obj.val).toString();
            }
          }
        });
      });
    }
  }, [position]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4A9EFF]/20 to-[#B57AFF]/20 border border-[#4A9EFF]/40 shadow-[0_0_80px_rgba(74,158,255,0.4)] flex items-center justify-center">
        <Check size={40} className="text-[#4A9EFF]" strokeWidth={2.5} />
      </div>

      <h2 className="text-[32px] font-normal text-white mt-8 tracking-tight">You're in.</h2>
      
      <p className="text-[18px] font-light text-white/70 mt-4">
        You're #<span ref={countRef} className="bg-gradient-to-r from-[#4A9EFF] to-[#B57AFF] bg-clip-text text-transparent font-normal">0</span> in line.
      </p>

      <p className="text-[15px] font-light text-white/50 mt-3 max-w-[300px] text-center">
        We'll email you the moment early access opens. Keep an eye on your inbox.
      </p>

      <button
        onClick={onClose}
        className="mt-8 rounded-full px-8 py-3 bg-white/5 border border-white/10 text-white/80 font-light hover:bg-white/10 hover:text-white transition"
      >
        Done
      </button>
    </div>
  );
}
