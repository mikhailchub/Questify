import React from "react";

/** Surface container. `interactive` adds hover lift; `tone` tints the surface. */
export function Card({ children, tone = "default", interactive = false, padding = "var(--space-5)", style, onClick, ...rest }) {
  const tones = {
    default: "var(--surface-raised)",
    subtle: "var(--surface)",
    gold: "var(--primary-soft)",
  };
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: tones[tone] || tones.default,
        border: "var(--border-thin) solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: interactive && hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: interactive && hover ? "translateY(-2px)" : "none",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
