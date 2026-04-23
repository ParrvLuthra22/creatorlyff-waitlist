export function MockupPhone() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#14141C",
        borderRadius: 34,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
    >
      {/* Notch */}
      <div
        style={{
          width: 90,
          height: 22,
          background: "#14141C",
          borderRadius: "0 0 16px 16px",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.07)",
        }}
      />

      {/* Screen */}
      <div
        style={{
          flex: 1,
          width: "100%",
          padding: "36px 16px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Header */}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 300, letterSpacing: "0.05em" }}>
          NEW PROPOSAL
        </div>

        {/* Brand info */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg,#4A9EFF,#3060D0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            NS
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 400, color: "#fff" }}>Nova Studios</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>Brand Partner</div>
          </div>
        </div>

        {/* Proposal card */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {[
            { label: "Budget", value: "₹45,000" },
            { label: "Deliverables", value: "2 Reels + 3 Stories" },
            { label: "Deadline", value: "Nov 28, 2025" },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>{row.label}</span>
              <span style={{ fontSize: 10, color: "#fff", fontWeight: 400 }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Message snippet */}
        <div
          style={{
            fontSize: 9.5,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 300,
            lineHeight: 1.5,
            padding: "10px 12px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            borderLeft: "2px solid rgba(74,158,255,0.3)",
          }}
        >
          "Hi! We love your content style and think you'd be a perfect fit for our upcoming winter campaign…"
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 99,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 10,
              fontWeight: 300,
            }}
          >
            Decline
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 99,
              background: "linear-gradient(135deg,#4A9EFF,#3070D8)",
              border: "none",
              color: "#fff",
              fontSize: 10,
              fontWeight: 400,
              boxShadow: "0 0 20px rgba(74,158,255,0.4)",
            }}
          >
            Accept ✓
          </button>
        </div>
      </div>
    </div>
  );
}
