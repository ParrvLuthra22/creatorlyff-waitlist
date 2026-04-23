export function MockupDashboard() {
  const creators = [
    { name: "Marik M.", niche: "Travel", status: "In Talks", statusColor: "#4A9EFF" },
    { name: "Luwa N.", niche: "Fashion", status: "Signed", statusColor: "#5EEAD4" },
    { name: "Priya K.", niche: "Food & Life", status: "In Talks", statusColor: "#4A9EFF" },
    { name: "Kabir S.", niche: "Tech", status: "Review", statusColor: "#B57AFF" },
  ];

  const avatarColors = ["#4A9EFF", "#B57AFF", "#5EEAD4", "#FF7A7A"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0F",
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          padding: "10px 14px",
          background: "#111118",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 5,
            padding: "3px 10px",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}
        >
          creatoelyff.app/dashboard
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 150,
            background: "#08080D",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "0 14px 14px",
              fontSize: 11,
              fontWeight: 500,
              color: "#4A9EFF",
              letterSpacing: "0.05em",
            }}
          >
            CS
          </div>
          {["Dashboard", "Creators", "Proposals", "Payments", "Settings"].map((item, i) => (
            <div
              key={item}
              style={{
                padding: "7px 14px",
                fontSize: 10.5,
                fontWeight: 300,
                color: i === 0 ? "#fff" : "rgba(255,255,255,0.38)",
                background: i === 0 ? "rgba(74,158,255,0.08)" : "transparent",
                borderLeft: i === 0 ? "2px solid #4A9EFF" : "2px solid transparent",
                cursor: "default",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: "16px 18px", overflow: "hidden" }}>
          <div style={{ fontSize: 12, fontWeight: 400, color: "#fff", marginBottom: 4 }}>
            Welcome back, Nova Studios
          </div>
          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>
            Here's what's happening today.
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Active Proposals", value: "7" },
              { label: "Creators Hired", value: "24" },
              { label: "This Month", value: "₹8,40,000" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8,
                  padding: "10px 10px",
                }}
              >
                <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 300 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 400, color: "#fff" }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Creator list header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 70px",
              padding: "0 6px 6px",
              fontSize: 8.5,
              color: "rgba(255,255,255,0.3)",
              fontWeight: 300,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              marginBottom: 6,
            }}
          >
            <span>Creator</span>
            <span>Niche</span>
            <span>Status</span>
          </div>

          {creators.map((c, i) => (
            <div
              key={c.name}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 70px",
                padding: "7px 6px",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: avatarColors[i],
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", fontWeight: 300 }}>
                  {c.name}
                </span>
              </div>
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
                {c.niche}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 400,
                  color: c.statusColor,
                  background: `${c.statusColor}18`,
                  borderRadius: 99,
                  padding: "2px 7px",
                  display: "inline-block",
                }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
