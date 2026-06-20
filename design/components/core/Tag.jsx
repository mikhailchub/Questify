import React from "react";

/** Compact pill for quest tags / categories. Optional removable. */
export function Tag({ children, color = "neutral", onRemove, style, ...rest }) {
  const colors = {
    neutral: { bg: "var(--bg-sunken)", fg: "var(--text-body)" },
    gold: { bg: "var(--primary-soft)", fg: "var(--gold-800)" },
    ember: { bg: "var(--accent-soft)", fg: "var(--ember-700)" },
    green: { bg: "var(--success-soft)", fg: "var(--green-700)" },
    blue: { bg: "var(--info-soft)", fg: "var(--blue-700)" },
    arcane: { bg: "var(--arcane-100)", fg: "var(--arcane-700)" },
  };
  const c = colors[color] || colors.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      height: 26, padding: "0 10px",
      fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)",
      color: c.fg, background: c.bg, borderRadius: "var(--radius-pill)",
      whiteSpace: "nowrap", ...style,
    }} {...rest}>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove" style={{ display: "inline-flex", border: "none", background: "transparent", color: "inherit", cursor: "pointer", padding: 0, opacity: 0.7 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </span>
  );
}
