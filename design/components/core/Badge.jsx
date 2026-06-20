import React from "react";

/** Small status badge. `dot` for a leading status dot; `count` for a numeric counter. */
export function Badge({ children, tone = "neutral", variant = "soft", dot = false, style, ...rest }) {
  const tones = {
    neutral: { soft: ["var(--bg-sunken)", "var(--text-body)"], solid: ["var(--warm-600)", "#fff"] },
    gold: { soft: ["var(--primary-soft)", "var(--gold-800)"], solid: ["var(--primary)", "var(--on-primary)"] },
    success: { soft: ["var(--success-soft)", "var(--green-700)"], solid: ["var(--success)", "#fff"] },
    danger: { soft: ["var(--danger-soft)", "var(--red-700)"], solid: ["var(--danger)", "#fff"] },
    info: { soft: ["var(--info-soft)", "var(--blue-700)"], solid: ["var(--info)", "#fff"] },
  };
  const [bg, fg] = (tones[tone] || tones.neutral)[variant] || (tones[tone] || tones.neutral).soft;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      height: 22, padding: "0 9px",
      fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: "var(--weight-bold)",
      letterSpacing: "0.02em", color: fg, background: bg,
      borderRadius: "var(--radius-pill)", ...style,
    }} {...rest}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: "50%", background: variant === "soft" ? fg : "#fff" }} />}
      {children}
    </span>
  );
}
