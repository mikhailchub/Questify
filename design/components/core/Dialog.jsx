import React from "react";

/** Centered modal dialog with scrim. Render conditionally on `open`. */
export function Dialog({ open, onClose, title, children, footer, width = 460 }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: "var(--z-modal)",
        background: "rgba(31, 26, 18, 0.45)", backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-4)",
        animation: "qf-fade var(--dur-base) var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width: "100%", maxWidth: width,
          background: "var(--surface-raised)",
          border: "var(--border-thin) solid var(--border)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-xl)",
          overflow: "hidden",
          animation: "qf-pop var(--dur-slow) var(--ease-spring)",
        }}
      >
        {title && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-5) var(--space-6) 0" }}>
            <h3 style={{ fontSize: "var(--text-2xl)", margin: 0 }}>{title}</h3>
            <button onClick={onClose} aria-label="Close" style={{ display: "inline-flex", border: "none", background: "transparent", color: "var(--text-muted)", cursor: "pointer", padding: 6, borderRadius: "var(--radius-sm)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}
        <div style={{ padding: "var(--space-4) var(--space-6) var(--space-6)", color: "var(--text-body)" }}>{children}</div>
        {footer && (
          <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end", padding: "var(--space-4) var(--space-6)", borderTop: "var(--border-thin) solid var(--border)", background: "var(--bg-subtle)" }}>{footer}</div>
        )}
      </div>
      <style>{`@keyframes qf-fade{from{opacity:0}to{opacity:1}}@keyframes qf-pop{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
