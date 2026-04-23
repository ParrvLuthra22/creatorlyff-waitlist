"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  brandName: z.string().optional(),
  linkedin: z.string().optional(),
  collabFrequency: z.number().optional(),
  platformNeed: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

function RatingBalls({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  return (
    <div className="flex gap-3 mt-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            value && i <= value 
              ? "bg-[#4A9EFF] shadow-[0_0_15px_rgba(74,158,255,0.4)]" 
              : "bg-white/5 border border-white/10 hover:bg-white/10"
          }`}
        >
           <span className={`text-[14px] ${value && i <= value ? 'text-white' : 'text-white/40'}`}>{i}</span>
        </button>
      ))}
    </div>
  );
}

export function WaitlistForm({ role, onSuccess, onBack }: { role: string; onSuccess: (pos: number) => void; onBack: () => void }) {
  const [formStep, setFormStep] = useState<"question" | "details">(role === "investor" ? "details" : "question");
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", linkedin: "", brandName: "" },
  });

  const handleNext = async () => {
    const vals = control._formValues;
    if (role !== "investor") {
      if (!vals.collabFrequency || !vals.platformNeed) {
        setSubmitError("Please answer both questions to continue.");
        return;
      }
    }
    setSubmitError("");
    setFormStep("details");
  };

  const handleBack = () => {
    if (formStep === "details" && role !== "investor") {
      setFormStep("question");
    } else {
      onBack();
    }
  };

  let q1 = "How often do you collaborate with brands?";
  if (role === "brand") {
    q1 = "How often do you collaborate with creators?";
  }
  let q2 = "How often do you feel the need for a platform like Creatorlyff?";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    let gsapMod: any;
    try {
      gsapMod = await import("gsap");
      if (progressRef.current) {
        gsapMod.gsap.fromTo(progressRef.current, { width: "0%" }, { width: "90%", duration: 2, ease: "power2.out" });
      }
    } catch (e) {
      // ignore import error
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, role }),
      });
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      if (progressRef.current && gsapMod) {
        gsapMod.gsap.to(progressRef.current, { width: "100%", duration: 0.2 });
      }

      setTimeout(() => {
        onSuccess(result.position);
      }, 400); 
    } catch (err: any) {
      setSubmitError(err.message);
      setIsSubmitting(false);
      
      if (formRef.current && gsapMod) {
        gsapMod.gsap.fromTo(formRef.current, 
          { x: 0 },
          { x: 8, duration: 0.1, yoyo: true, repeat: 3, ease: "power1.inOut" }
        );
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col relative min-h-[300px]">
      <AnimatePresence mode="wait">
        {formStep === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div>
              <button type="button" onClick={handleBack} className="text-white/40 hover:text-white transition flex items-center gap-2 text-[13px] font-light mb-6">
                <ArrowLeft size={14} /> Back
              </button>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-[17px] font-normal text-white mb-2 leading-relaxed">{q1}</h3>
                <span className="text-[13px] font-light text-white/40">1 = Never, 5 = Very often</span>
                <Controller
                  name="collabFrequency"
                  control={control}
                  render={({ field }) => (
                    <RatingBalls value={field.value as number} onChange={field.onChange} />
                  )}
                />
              </div>

              <div>
                <h3 className="text-[17px] font-normal text-white mb-2 leading-relaxed">{q2}</h3>
                <span className="text-[13px] font-light text-white/40">1 = Never, 5 = Constantly</span>
                <Controller
                  name="platformNeed"
                  control={control}
                  render={({ field }) => (
                    <RatingBalls value={field.value as number} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="mt-auto relative w-full rounded-xl py-4 bg-gradient-to-r from-[#4A9EFF] to-[#3080E0] text-white font-light text-[16px] overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(74,158,255,0.3)] flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {formStep === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            <div className="flex justify-between items-center mb-2">
              <button type="button" onClick={handleBack} className="text-white/40 hover:text-white transition flex items-center gap-2 text-[13px] font-light">
                <ArrowLeft size={14} /> Back
              </button>
              <span className="text-[13px] font-light text-white/40">Almost there</span>
            </div>

            {submitError && (
              <div className="bg-[#FF6B8A]/10 border border-[#FF6B8A]/30 text-[#FF6B8A] rounded-lg px-4 py-3 font-light text-[13px]">
                {submitError}
              </div>
            )}

            <div>
              <label className="block text-[12px] uppercase tracking-widest text-white/50 mb-2 font-normal">Full Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Nova Studios"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white font-light placeholder-white/30 focus:border-[#4A9EFF]/50 focus:bg-white/[0.04] outline-none transition"
                  />
                )}
              />
              {errors.name && <p className="text-[#FF6B8A] font-light text-[12px] mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-[12px] uppercase tracking-widest text-white/50 mb-2 font-normal">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="nova@example.com"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white font-light placeholder-white/30 focus:border-[#4A9EFF]/50 focus:bg-white/[0.04] outline-none transition"
                  />
                )}
              />
              {errors.email && <p className="text-[#FF6B8A] font-light text-[12px] mt-1.5">{errors.email.message}</p>}
            </div>

            {role === "brand" && (
              <div>
                <label className="block text-[12px] uppercase tracking-widest text-white/50 mb-2 font-normal">Brand Name</label>
                <Controller
                  name="brandName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. Nike, Apple, etc."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white font-light placeholder-white/30 focus:border-[#4A9EFF]/50 focus:bg-white/[0.04] outline-none transition"
                    />
                  )}
                />
              </div>
            )}

            {role === "investor" && (
              <div>
                <label className="block text-[12px] uppercase tracking-widest text-white/50 mb-2 font-normal">LinkedIn Profile URL</label>
                <Controller
                  name="linkedin"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-white font-light placeholder-white/30 focus:border-[#4A9EFF]/50 focus:bg-white/[0.04] outline-none transition"
                    />
                  )}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full mt-3 rounded-xl py-4 bg-gradient-to-r from-[#4A9EFF] to-[#3080E0] text-white font-light text-[16px] overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(74,158,255,0.3)] disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <div className="relative z-10 flex items-center justify-center h-6">
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Join Waitlist"
                )}
              </div>
              {isSubmitting && (
                <div ref={progressRef} className="absolute inset-0 bg-white/20 z-0" style={{ width: "0%" }} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
