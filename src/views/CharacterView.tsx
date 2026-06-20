import React from "react";
import { useGame, REWARDS_LIBRARY } from "../context/GameContext";
import { Button } from "../components/core/Button";
import { Avatar } from "../components/core/Avatar";
import { Volume2, VolumeX, Shield, UserRound } from "lucide-react";

export function CharacterView() {
  const {
    avatar,
    purchasedRewards,
    equipGear,
    selectClass,
    changeTone,
  } = useGame();

  if (!avatar) return null;

  // Resolve equipped cosmetic emojis
  const equippedHeadItem = REWARDS_LIBRARY.find((r) => r.id === avatar.equippedHead);
  const equippedBodyItem = REWARDS_LIBRARY.find((r) => r.id === avatar.equippedBody);
  const equippedPetItem = REWARDS_LIBRARY.find((r) => r.id === avatar.equippedPet);

  // Filter owned items by slots
  const ownedHead = REWARDS_LIBRARY.filter((r) => r.type === "head" && purchasedRewards.includes(r.id));
  const ownedBody = REWARDS_LIBRARY.filter((r) => r.type === "body" && purchasedRewards.includes(r.id));
  const ownedPet = REWARDS_LIBRARY.filter((r) => r.type === "pet" && purchasedRewards.includes(r.id));

  const classes = ["Wizard of Workflow", "Deadline Dragon-Rider", "Kanban Knight"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-6)" }}>
      
      {/* Visual RPG Avatar Card & Paper-doll */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "var(--space-6)",
        background: "var(--surface-raised)",
        border: "var(--border-thin) solid var(--border)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative Grid Paper Background */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: "radial-gradient(var(--text-strong) 1px, transparent 0)",
          backgroundSize: "24px 24px",
          pointerEvents: "none"
        }} />

        {/* Paper Doll Character Stage */}
        <div style={{
          position: "relative",
          width: 140,
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "24px 0"
        }}>
          
          {/* Circular Base Avatar */}
          <Avatar
            name="Ada Lovelace"
            size={100}
            level={avatar.level}
            ring={true}
          />

          {/* Floating Pet (Equipped) */}
          {equippedPetItem && (
            <div style={{
              position: "absolute",
              bottom: 0,
              right: -10,
              fontSize: 36,
              animation: "float 2s ease-in-out infinite alternate"
            }}>
              {equippedPetItem.previewValue}
            </div>
          )}

          {/* Head Accessory (Equipped) */}
          {equippedHeadItem && (
            <div style={{
              position: "absolute",
              top: -8,
              left: 42,
              fontSize: 38,
              transform: "rotate(-10deg)",
              pointerEvents: "none"
            }}>
              {equippedHeadItem.previewValue}
            </div>
          )}

          {/* Body Armor (Equipped) */}
          {equippedBodyItem && (
            <div style={{
              position: "absolute",
              bottom: 4,
              left: 12,
              fontSize: 26,
              transform: "rotate(15deg)",
              pointerEvents: "none"
            }}>
              {equippedBodyItem.previewValue}
            </div>
          )}
        </div>

        {/* Character Title Info */}
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, margin: "0 0 4px 0", color: "var(--text-strong)" }}>
          Ada Lovelace
        </h3>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: "bold",
          color: "var(--primary)",
          margin: 0,
          textTransform: "uppercase",
          letterSpacing: "0.08em"
        }}>
          {avatar.class} · Level {avatar.level}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
        
        {/* Class Selection Segment */}
        <div style={panelStyle}>
          <h4 style={panelHeaderStyle}><Shield size={18} /> Select Hero Class</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {classes.map((cls) => {
              const active = avatar.class === cls;
              return (
                <button
                  key={cls}
                  onClick={() => selectClass(cls)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: active ? "var(--primary-soft)" : "var(--surface-raised)",
                    border: `2px solid ${active ? "var(--primary)" : "var(--border)"}`,
                    borderRadius: "var(--radius-lg)",
                    color: "var(--text-strong)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all var(--dur-fast)"
                  }}
                >
                  {cls}
                  {active && <span style={{ color: "var(--primary)" }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone Settings Selection Segment */}
        <div style={panelStyle}>
          <h4 style={panelHeaderStyle}><Volume2 size={18} /> Tone & Voice Settings</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { id: "playful", label: "Playful (RPG Dun Master)", icon: <Volume2 size={16} />, desc: "Default witty commentary & alerts." },
              { id: "professional", label: "Professional (Concise)", icon: <UserRound size={16} />, desc: "Concise task completions, no puns." },
              { id: "silent", label: "Silent (No notifications)", icon: <VolumeX size={16} />, desc: "No visual toast alerts or sound nudges." }
            ].map((tn) => {
              const active = avatar.tone === tn.id;
              return (
                <button
                  key={tn.id}
                  onClick={() => changeTone(tn.id as any)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "12px 16px",
                    background: active ? "var(--accent-soft)" : "var(--surface-raised)",
                    border: `2px solid ${active ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "var(--radius-lg)",
                    color: "var(--text-strong)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all var(--dur-fast)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>
                    {tn.icon} {tn.label}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                    {tn.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Paper Doll Equip Panel */}
        <div style={{ ...panelStyle, gridColumn: "span 1" }}>
          <h4 style={panelHeaderStyle}><UserRound size={18} /> Equip Wardrobe</h4>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Head slot */}
            <div>
              <label style={slotLabelStyle}>Head Accessory</label>
              <select
                value={avatar.equippedHead || ""}
                onChange={(e) => equipGear("head", e.target.value || undefined)}
                style={selectInputStyle}
              >
                <option value="">(None)</option>
                {ownedHead.map((h) => (
                  <option key={h.id} value={h.id}>{h.previewValue} {h.title}</option>
                ))}
              </select>
            </div>

            {/* Body slot */}
            <div>
              <label style={slotLabelStyle}>Body Armor</label>
              <select
                value={avatar.equippedBody || ""}
                onChange={(e) => equipGear("body", e.target.value || undefined)}
                style={selectInputStyle}
              >
                <option value="">(None)</option>
                {ownedBody.map((b) => (
                  <option key={b.id} value={b.id}>{b.previewValue} {b.title}</option>
                ))}
              </select>
            </div>

            {/* Pet slot */}
            <div>
              <label style={slotLabelStyle}>Equipped Companion Pet</label>
              <select
                value={avatar.equippedPet || ""}
                onChange={(e) => equipGear("pet", e.target.value || undefined)}
                style={selectInputStyle}
              >
                <option value="">(None)</option>
                {ownedPet.map((p) => (
                  <option key={p.id} value={p.id}>{p.previewValue} {p.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-8px) scale(1.05); }
        }
      `}</style>

    </div>
  );
}

const panelStyle: React.CSSProperties = {
  padding: "var(--space-5)",
  background: "var(--surface-raised)",
  border: "var(--border-thin) solid var(--border)",
  borderRadius: "var(--radius-xl)",
  boxShadow: "var(--shadow-sm)"
};

const panelHeaderStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-base)",
  fontWeight: "var(--weight-semibold)",
  color: "var(--text-strong)",
  margin: "0 0 16px 0",
  display: "flex",
  alignItems: "center",
  gap: 8
};

const slotLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-strong)",
  marginBottom: 6
};

const selectInputStyle: React.CSSProperties = {
  width: "100%",
  height: 40,
  padding: "0 10px",
  borderRadius: "var(--radius-md)",
  border: "2px solid var(--border-strong)",
  background: "var(--surface-raised)",
  color: "var(--text-strong)",
  fontSize: 14,
  outline: "none"
};
