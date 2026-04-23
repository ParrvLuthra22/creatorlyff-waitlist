"use client";


import { Mail, MessageCircle, Globe } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {

  return (
    <footer className="relative mt-20 md:mt-32 rounded-t-[48px] bg-[#050507] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[#4A9EFF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-8 py-8 md:py-12 max-w-7xl mx-auto relative z-10 flex flex-col">
        
        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 font-light text-[13px]">
            © 2026 Creatorlyff. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <MagneticButton className="p-2 text-white/40 hover:text-white transition-colors">
              <Mail size={18} />
            </MagneticButton>
            <MagneticButton className="p-2 text-white/40 hover:text-white transition-colors">
              <MessageCircle size={18} />
            </MagneticButton>
            <MagneticButton className="p-2 text-white/40 hover:text-white transition-colors">
              <Globe size={18} />
            </MagneticButton>
          </div>
        </div>

      </div>
    </footer>
  );
}
