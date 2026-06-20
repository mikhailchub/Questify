import React from "react";

/** Avatar with level ring + optional class badge. Falls back to initials. */
export function Avatar({ src, name = "", size = 48, level, ring = true, style, ...rest }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const ringW = Math.max(2, Math.round(size * 0.06));
  return (
    <span style={{ position: "relative", display: "inline-flex", flex: "none", ...style }} {...rest}>
      <span style={{
        width: size, height: size, borderRadius: "50%",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        background: "var(--primary-soft)", color: "var(--gold-800)",
        fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)",
        fontSize: size * 0.4,
        border: ring ? `${ringW}px solid var(--primary)` : "none",
        boxSizing: "border-box",
      }}>
        {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
      </span>
      {level != null && (
        <span style={{
          position: "absolute", bottom: -2, right: -2,
          minWidth: size * 0.42, height: size * 0.42, padding: "0 4px",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: "var(--warm-900)", color: "var(--gold-300)",
          fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: size * 0.24,
          borderRadius: "var(--radius-pill)", border: "2px solid var(--surface-raised)",
        }}>{level}</span>
      )}
    </span>
  );
}
