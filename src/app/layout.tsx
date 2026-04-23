import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ModalProvider } from "@/components/providers/ModalProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { CustomCursor } from "@/components/cursor/CustomCursor";

// ── Fonts ──────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

// ── Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Creatorlyff — The creator economy, organized.",
  description:
    "Creatorlyff replaces messy DM negotiations with structured proposals, secure payments, and a workspace built for real brand-creator collaborations.",
  openGraph: {
    title: "Creatorlyff — The creator economy, organized.",
    description:
      "Discover the right creators. Send structured proposals. Pay securely. All in one platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatorlyff — The creator economy, organized.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ModalProvider>
          <LenisProvider>
            {/* Fixed background aurora — sits behind everything */}
            <AuroraBackground />
            {/* Custom cursor — hides on touch */}
            <CustomCursor />
            {/* Page content */}
            {children}
          </LenisProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
