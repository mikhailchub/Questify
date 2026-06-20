import React from "react";

/** Single toast notification. Tone sets the accent stripe + icon color. */
export function Toast({ title, message, tone = "default", icon = null, onClose, style }) {
  const tones = {
    default: "var(--primary)",
    success: "var(--success)",
    danger: "var(--danger)",
    info: "var(--info)",
    arcane: "var(--arcane-500)",
  };
  const accent = tones[tone] || tones.default;
  return (
    <div role="status" style={{
      display: "flex", alignItems: "flex-start", gap: "12px",
      width: 340, padding: "14px 14px 14px 16px",
      background: "var(--surface-raised)",
      border: "var(--border-thin) solid var(--border)",
      borderLeft: `4px solid ${accent}`,
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", ...style,
    }}>
      {icon && <span style={{ color: accent, display: "inline-flex", marginTop: 1 }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-base)", color: "var(--text-strong)" }}>{title}</div>}
        {message && <div style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", marginTop: 2 }}>{message}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{ border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", padding: 2, display: "inline-flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}
