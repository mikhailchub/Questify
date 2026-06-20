import React from "react";

/** Currency chip — Gold (⚔) or Guild Tokens (🎟). Renders an inline coin glyph. */
export function CurrencyPill({ amount = 0, type = "gold", size = "md", style }) {
  const types = {
    gold: { color: "var(--gold-coin)", ring: "var(--gold-600)", glyph: "G" },
    token: { color: "var(--guild-token)", ring: "var(--arcane-700)", glyph: "T" },
  };
  const t = types[type] || types.gold;
  const dims = { sm: { h: 24, coin: 14, font: "12px" }, md: { h: 30, coin: 18, font: "14px" }, lg: { h: 38, coin: 22, font: "17px" } };
  const d = dims[size] || dims.md;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "7px",
      height: d.h, padding: `0 12px 0 ${d.coin * 0.35}px`,
      background: "var(--bg-sunken)", borderRadius: "var(--radius-pill)", ...style,
    }}>
      <span style={{
        width: d.coin, height: d.coin, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, ${t.color} 70%, #fff), ${t.color})`,
        border: `1.5px solid ${t.ring}`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: d.coin * 0.55, lineHeight: 1,
      }}>{t.glyph}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: d.font, color: "var(--text-strong)" }}>
        {amount.toLocaleString()}
      </span>
    </span>
  );
}
