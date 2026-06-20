import React from "react";

/** Text input with label, optional leading icon, hint & error states. */
export function Input({
  label,
  hint,
  error,
  iconLeft = null,
  size = "md",
  id,
  style,
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const heights = { sm: "var(--control-sm)", md: "var(--control-md)", lg: "var(--control-lg)" };
  const borderColor = error ? "var(--danger)" : "var(--border-strong)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontFamily: "var(--font-body)", fontSize: "var(--text-sm)",
          fontWeight: "var(--label-weight)", color: "var(--text-strong)",
        }}>{label}</label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {iconLeft && (
          <span style={{ position: "absolute", left: 12, display: "inline-flex", color: "var(--text-muted)", pointerEvents: "none" }}>{iconLeft}</span>
        )}
        <input
          id={inputId}
          style={{
            width: "100%", height: heights[size] || heights.md,
            padding: iconLeft ? "0 14px 0 40px" : "0 14px",
            fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
            color: "var(--text-strong)", background: "var(--surface-raised)",
            border: `var(--border-thick) solid ${borderColor}`,
            borderRadius: "var(--radius-md)", outline: "none",
            transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
            ...style,
          }}
          onFocus={(e) => { if (!error) { e.target.style.borderColor = "var(--border-focus)"; e.target.style.boxShadow = "var(--ring)"; } }}
          onBlur={(e) => { e.target.style.borderColor = borderColor; e.target.style.boxShadow = "none"; }}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <span style={{ fontSize: "var(--text-xs)", color: error ? "var(--danger)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
