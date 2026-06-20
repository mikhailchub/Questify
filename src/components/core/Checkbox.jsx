import React from "react";

/** Checkbox with label — the quest/sub-quest completion control. */
export function Checkbox({ checked, defaultChecked, onChange, label, disabled = false, style, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };

  return (
    <label style={{
      display: "inline-flex", alignItems: "center", gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
      userSelect: "none", ...style,
    }} {...rest}>
      <span
        role="checkbox"
        aria-checked={on}
        onClick={toggle}
        style={{
          width: 24, height: 24, flex: "none",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          borderRadius: "var(--radius-sm)",
          border: `var(--border-thick) solid ${on ? "var(--primary)" : "var(--border-strong)"}`,
          background: on ? "var(--primary)" : "var(--surface-raised)",
          color: "var(--on-primary)",
          transition: "background var(--dur-fast) var(--ease-spring), border-color var(--dur-fast)",
        }}
      >
        {on && (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span style={{ fontSize: "var(--text-base)", color: "var(--text-body)" }}>{label}</span>}
    </label>
  );
}
