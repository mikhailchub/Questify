import React from "react";

/** Achievement medal — rarity ring + icon, locked or unlocked. */
export function AchievementBadge({ title, description, icon = null, rarity = "common", unlocked = true, size = 64 }) {
  const rarities = {
    common: { ring: "var(--rarity-common)", soft: "var(--bg-sunken)" },
    rare: { ring: "var(--rarity-rare)", soft: "var(--info-soft)" },
    epic: { ring: "var(--rarity-epic)", soft: "var(--arcane-100)" },
    legendary: { ring: "var(--rarity-legendary)", soft: "var(--primary-soft)" },
  };
  const r = rarities[rarity] || rarities.common;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: size + 48, opacity: unlocked ? 1 : 0.55 }}>
      <div style={{
        position: "relative", width: size, height: size, borderRadius: "50%",
        background: unlocked ? r.soft : "var(--bg-sunken)",
        border: `3px solid ${unlocked ? r.ring : "var(--border-strong)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: unlocked ? r.ring : "var(--text-muted)",
        boxShadow: unlocked && rarity === "legendary" ? "var(--glow-gold)" : "var(--shadow-sm)",
        filter: unlocked ? "none" : "grayscale(1)",
      }}>
        {icon}
        {!unlocked && (
          <span style={{ position: "absolute", bottom: -4, right: -4, width: 24, height: 24, borderRadius: "50%", background: "var(--warm-700)", border: "2px solid var(--surface-raised)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
          </span>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-sm)", color: "var(--text-strong)" }}>{title}</div>
        {description && <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: 1, lineHeight: 1.3 }}>{description}</div>}
      </div>
    </div>
  );
}
