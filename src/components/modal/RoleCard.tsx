import { Sparkles, Briefcase, TrendingUp, Check } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP = {
  Sparkles,
  Briefcase,
  TrendingUp,
};

export function RoleCard({
  role,
  isSelected,
  isFaded,
  onClick,
}: {
  role: { id: string; label: string; icon: string; description: string };
  isSelected: boolean;
  isFaded: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[role.icon as keyof typeof ICON_MAP];

  return (
    <motion.div
      layout
      whileHover={!isSelected && !isFaded ? { scale: 1.01, backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(74,158,255,0.4)", boxShadow: "0 0 40px rgba(74,158,255,0.1)" } : {}}
      animate={{
        scale: isSelected ? 1 : isFaded ? 0.97 : 1,
        opacity: isFaded ? 0.3 : 1,
        height: isFaded ? 80 : "auto", // partially collapse
        borderColor: isSelected ? "rgba(74,158,255,1)" : "rgba(255,255,255,0.1)",
        boxShadow: isSelected ? "0 0 60px rgba(74,158,255,0.25)" : "none",
      }}
      transition={{ duration: 0.4 }}
      onClick={!isFaded ? onClick : undefined}
      onKeyDown={(e) => {
        if (!isFaded && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={isFaded ? -1 : 0}
      className={`relative w-full rounded-[20px] bg-white/[0.02] border border-white/10 overflow-hidden outline-none ${!isFaded ? "cursor-pointer" : "pointer-events-none"} p-6`}
      data-magnetic={!isFaded ? "true" : undefined}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          {Icon && <Icon size={20} className="text-white/70" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] font-normal text-white">{role.label}</h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isFaded ? 0 : 1, height: isFaded ? 0 : "auto" }}
            transition={{ duration: 0.3 }}
            className="text-[14px] font-light text-white/50 mt-2 leading-relaxed overflow-hidden"
          >
            {role.description}
          </motion.p>
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="shrink-0 w-6 h-6 rounded-full bg-[#4A9EFF] flex items-center justify-center"
          >
            <Check size={14} className="text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
