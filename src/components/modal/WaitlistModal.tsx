"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/components/providers/ModalProvider";
import { X } from "lucide-react";
import { RoleCard } from "./RoleCard";
import { WaitlistForm } from "./WaitlistForm";
import { ThankYou } from "./ThankYou";
import { ROLE_OPTIONS, RoleId } from "@/lib/constants";

type ModalState = "role" | "form" | "success";

export function WaitlistModal() {
  const { isOpen, close } = useModal();
  const [modalState, setModalState] = useState<ModalState>("role");
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [position, setPosition] = useState<number>(0);

  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setModalState("role");
      setSelectedRole(null);
      
      let ctx: any;
      import("gsap").then(({ gsap }) => {
        ctx = gsap.context(() => {
          if (shimmerRef.current) {
            gsap.to(shimmerRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "linear" });
          }
        });
      });
      return () => {
        if (ctx) ctx.revert();
      };
    }
  }, [isOpen]);

  const handleRoleSelect = (roleId: RoleId) => {
    setSelectedRole(roleId);
    setModalState("form");
  };

  const handleSuccess = (pos: number) => {
    setPosition(pos);
    setModalState("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            {/* Spotlight Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(74,158,255,0.3) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[600px] rounded-[28px] shadow-[0_0_0_1px_rgba(74,158,255,0.1),_0_0_60px_rgba(74,158,255,0.25)] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[#0A0A0F] pointer-events-none z-0" />
              
              {/* Shimmer Border */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none z-0">
                <div
                  ref={shimmerRef}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, rgba(74, 158, 255, 0.4) 10%, transparent 20%)",
                  }}
                />
              </div>
              <div className="absolute inset-[1px] bg-[#0A0A0F] rounded-[27px] pointer-events-none z-0" />

              {/* Scrollable Content Container */}
              <div className="relative z-10 w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={close}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors z-20"
                >
                  <X size={16} />
                </button>

                {/* Content */}
                <div className="p-6 md:p-10 w-full flex flex-col min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {modalState === "role" && (
                      <motion.div
                        key="role"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col"
                      >
                        <h2 className="text-[28px] font-normal text-white tracking-tight">
                          How would you describe yourself?
                        </h2>
                        <p className="text-[15px] font-light text-white/50 mt-2">
                          Select the option that best fits you.
                        </p>

                        <div className="flex flex-col gap-4 mt-10">
                          {ROLE_OPTIONS.map((roleOpt) => (
                            <RoleCard
                              key={roleOpt.id}
                              role={roleOpt}
                              isSelected={selectedRole === roleOpt.id}
                              isFaded={false}
                              onClick={() => handleRoleSelect(roleOpt.id as RoleId)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {modalState === "form" && selectedRole && (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col"
                      >
                        <WaitlistForm 
                          role={selectedRole} 
                          onSuccess={handleSuccess} 
                          onBack={() => {
                            setModalState("role");
                            setSelectedRole(null);
                          }}
                        />
                      </motion.div>
                    )}

                    {modalState === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full flex flex-col items-center justify-center text-center py-8 my-auto"
                      >
                        <ThankYou position={position} onClose={close} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
