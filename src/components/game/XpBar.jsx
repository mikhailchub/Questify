import React from "react";

/** XP / level progress bar with animated fill and optional level chips. */
export function XpBar({ value = 0, max = 100, level, nextLevel, height = 14, showValues = true }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {level != null && (
          <span style={{ flex: "none", width: 30, height: 30, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--warm-900)", color: "var(--gold-300)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>{level}</span>
        )}
        <div style={{ position: "relative", flex: 1, height, background: "var(--xp-track)", borderRadius: "var(--radius-pill)", overflow: "hidden", boxShadow: "var(--shadow-inset)" }}>
          <div style={{
            position: "absolute", inset: 0, width: `${pct}%`,
            background: "linear-gradient(90deg, var(--gold-400), var(--gold-300))",
            borderRadius: "var(--radius-pill)",
            transition: "width var(--dur-slow) var(--ease-out)",
          }} />
        </div>
        {nextLevel != null && (
          <span style={{ flex: "none", width: 30, height: 30, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--bg-sunken)", color: "var(--text-muted)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>{nextLevel}</span>
        )}
      </div>
      {showValues && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{value.toLocaleString()} / {max.toLocaleString()} XP</span>
        </div>
      )}
    </div>
  );
}
