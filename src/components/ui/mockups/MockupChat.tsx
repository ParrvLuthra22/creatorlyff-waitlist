export function MockupChat() {
  const messages = [
    { text: "Hey, got your proposal 👀", mine: false },
    { text: "Looks good — can we tweak the deadline?", mine: false },
    { text: "Also loved the brief, very detailed!", mine: false },
  ];

  return (
    <div
      style={{
        width: "100%",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        overflow: "hidden",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#B57AFF,#7A50D0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            color: "#fff",
            fontWeight: 500,
            position: "relative",
          }}
        >
          L
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#5EEAD4",
              border: "1.5px solid #0A0A0F",
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 400, color: "#fff" }}>Luwa Nanon</div>
          <div style={{ fontSize: 9, color: "#5EEAD4", fontWeight: 300 }}>● Online</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 14, color: "rgba(255,255,255,0.25)" }}>···</div>
      </div>

      {/* Messages */}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.mine ? "flex-end" : "flex-start",
              background: msg.mine ? "rgba(74,158,255,0.15)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${msg.mine ? "rgba(74,158,255,0.2)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: msg.mine ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              padding: "7px 10px",
              maxWidth: "88%",
              fontSize: 10,
              color: "rgba(255,255,255,0.8)",
              fontWeight: 300,
              lineHeight: 1.45,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          margin: "0 14px 12px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 99,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)", fontWeight: 300, flex: 1 }}>
          Reply to Luwa…
        </span>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4A9EFF,#3070D8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            color: "#fff",
          }}
        >
          ↑
        </div>
      </div>
    </div>
  );
}
