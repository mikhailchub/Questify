import React from "react";

/**
 * Questify primary action button.
 * Variants map to brand roles; `pop` adds the chunky 3D bottom edge
 * (Duolingo-style) that flattens on press.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  pop = false,
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { height: "var(--control-sm)", padding: "0 14px", font: "var(--text-sm)", radius: "var(--radius-md)", gap: "6px" },
    md: { height: "var(--control-md)", padding: "0 20px", font: "var(--text-base)", radius: "var(--radius-lg)", gap: "8px" },
    lg: { height: "var(--control-lg)", padding: "0 28px", font: "var(--text-lg)", radius: "var(--radius-lg)", gap: "10px" },
  };
  const variants = {
    primary: { bg: "var(--primary)", fg: "var(--on-primary)", border: "transparent", popShadow: "var(--pop-primary)" },
    accent: { bg: "var(--accent)", fg: "var(--on-accent)", border: "transparent", popShadow: "var(--pop-accent)" },
    secondary: { bg: "var(--surface-raised)", fg: "var(--text-strong)", border: "var(--border-strong)", popShadow: "var(--pop-neutral)" },
    ghost: { bg: "transparent", fg: "var(--text-body)", border: "transparent", popShadow: "none" },
    danger: { bg: "var(--danger)", fg: "#fff", border: "transparent", popShadow: "0 4px 0 var(--red-700)" },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    width: block ? "100%" : "auto",
    fontFamily: "var(--font-display)",
    fontWeight: "var(--weight-semibold)",
    fontSize: s.font,
    letterSpacing: "0.01em",
    lineHeight: 1,
    color: v.fg,
    background: v.bg,
    border: `var(--border-thick) solid ${v.border}`,
    borderRadius: s.radius,
    boxShadow: pop ? v.popShadow : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    ...style,
  };

  const handleDown = (e) => {
    if (disabled || !pop) return;
    e.currentTarget.style.transform = "translateY(3px)";
    e.currentTarget.style.boxShadow = "none";
  };
  const handleUp = (e) => {
    if (disabled || !pop) return;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = v.popShadow;
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={base}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
