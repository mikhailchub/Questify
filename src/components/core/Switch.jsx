import React from "react";

/** On/off toggle switch. */
export function Switch({ checked, defaultChecked, onChange, disabled = false, label, style, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }} {...rest}>
      <span
        role="switch"
        aria-checked={on}
        onClick={toggle}
        style={{
          width: 44, height: 26, flex: "none", padding: 3,
          borderRadius: "var(--radius-pill)",
          background: on ? "var(--primary)" : "var(--border-strong)",
          display: "inline-flex", alignItems: "center",
          transition: "background var(--dur-base) var(--ease-out)",
        }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: "50%", background: "#fff",
          boxShadow: "var(--shadow-sm)",
          transform: on ? "translateX(18px)" : "translateX(0)",
          transition: "transform var(--dur-base) var(--ease-spring)",
        }} />
      </span>
      {label && <span style={{ fontSize: "var(--text-base)", color: "var(--text-body)" }}>{label}</span>}
    </label>
  );
}
