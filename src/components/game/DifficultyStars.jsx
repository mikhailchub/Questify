import React from "react";

/** Difficulty rating ★☆☆–★★★ (1–3). Filled stars use gold. */
export function DifficultyStars({ level = 1, max = 3, size = 16, showLabel = false }) {
  const labels = { 1: "Easy", 2: "Medium", 3: "Hard" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
      <span style={{ display: "inline-flex", gap: "1px" }}>
        {Array.from({ length: max }).map((_, i) => {
          const on = i < level;
          return (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24"
              fill={on ? "var(--gold-400)" : "transparent"}
              stroke={on ? "var(--gold-500)" : "var(--border-strong)"} strokeWidth="2" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );
        })}
      </span>
      {showLabel && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--text-muted)" }}>{labels[level]}</span>}
    </span>
  );
}
