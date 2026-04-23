// ── Waitlist Role Options ─────────────────────────────────────────────
export const ROLE_OPTIONS = [
  {
    id: "creator",
    label: "Creator",
    icon: "Sparkles",
    description: "You create content and want real brand deals, not cold DMs.",
  },
  {
    id: "brand",
    label: "Brand",
    icon: "Briefcase",
    description:
      "You want to discover and collaborate with the right creators.",
  },
  {
    id: "investor",
    label: "Investor",
    icon: "TrendingUp",
    description:
      "You're tracking the creator economy and want early access to insights.",
  },
] as const;

export type RoleId = (typeof ROLE_OPTIONS)[number]["id"];

// ── FAQ Data ──────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: "What is Creatorlyff?",
    a: "Creatorlyff is a structured marketplace where brands discover creators, send formal collaboration proposals, chat in-platform, and pay securely — replacing the chaos of DM-based brand deals.",
  },
  {
    q: "When is Creatorlyff launching?",
    a: "We're targeting a closed beta in Q3 2025 for waitlist members. Early access spots are limited, so joining the waitlist now secures your position.",
  },
  {
    q: "Is it free for creators?",
    a: "Yes — creators always join and receive proposals for free. A small platform fee applies only on successful paid collaborations.",
  },
  {
    q: "What kind of brands use Creatorlyff?",
    a: "From D2C startups to enterprise marketing teams. Our proposal system works for one-off campaigns, long-term ambassadorships, and everything in between.",
  },
  {
    q: "How does the payment system work?",
    a: "Payments are held in escrow and released to creators only after campaign milestones are approved — giving both sides confidence and accountability.",
  },
  {
    q: "Can I use Creatorlyff for non-Indian creators and brands?",
    a: "Absolutely. We're India-first for launch but built for global scale from day one. Payments support USD, EUR, and INR at launch.",
  },
] as const;

// ── Nav ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "FAQ", href: "#faq" },
] as const;

// ── Hero copy ─────────────────────────────────────────────────────────
export const HERO = {
  headline: "Connect with creators who actually move the needle.",
  subline:
    "Creatorlyff replaces messy DM negotiations with structured proposals, secure payments, and a workspace built for real collaborations.",
  cta: "Get Early Access",
} as const;
