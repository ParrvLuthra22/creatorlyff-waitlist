"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/components/providers/ModalProvider";

export function Nav() {
  const { open } = useModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
        background: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontWeight: 400,
          fontSize: 20,
          color: "#fff",
          letterSpacing: "-0.02em",
          userSelect: "none",
        }}
      >
        Creatorlyff
      </span>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>

        <button
          id="nav-get-started"
          onClick={open}
          style={{
            borderRadius: 9999,
            padding: "10px 24px",
            background: "transparent",
            border: "1px solid rgba(74,158,255,0.4)",
            color: "#fff",
            fontWeight: 300,
            fontSize: 14,
            boxShadow: "0 0 24px rgba(74,158,255,0.15)",
            transition: "border-color 0.2s, box-shadow 0.2s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(74,158,255,0.75)";
            e.currentTarget.style.boxShadow = "0 0 36px rgba(74,158,255,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(74,158,255,0.4)";
            e.currentTarget.style.boxShadow = "0 0 24px rgba(74,158,255,0.15)";
          }}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
