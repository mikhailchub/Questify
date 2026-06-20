import React, { useState } from "react";
import { useGame, REWARDS_LIBRARY } from "../context/GameContext";
import { Button } from "../components/core/Button";
import { CurrencyPill } from "../components/game/CurrencyPill";
import { Gem, Play, Square, Sparkles, Volume2, ShieldCheck } from "lucide-react";

export function RewardForgeView() {
  const {
    avatar,
    purchasedRewards,
    buyReward,
  } = useGame();

  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  if (!avatar) return null;

  const handlePurchase = async (item: typeof REWARDS_LIBRARY[0]) => {
    await buyReward(item);
  };

  const toggleTrack = (trackId: string) => {
    if (activeTrack === trackId) {
      setActiveTrack(null);
    } else {
      setActiveTrack(trackId);
    }
  };

  const gearItems = REWARDS_LIBRARY.filter((r) => r.type === "head" || r.type === "body");
  const petItems = REWARDS_LIBRARY.filter((r) => r.type === "pet");
  const musicItems = REWARDS_LIBRARY.filter((r) => r.type === "music" || r.type === "sfx");
  const utilityItems = REWARDS_LIBRARY.filter((r) => r.type === "boost");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      
      {/* Wallet info */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "var(--space-4) var(--space-5)",
        background: "var(--surface-raised)",
        border: "var(--border-thin) solid var(--border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", margin: 0, color: "var(--text-strong)", display: "flex", alignItems: "center", gap: 6 }}>
            <Gem size={20} color="var(--gold-600)" /> Reward Forge
          </h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", margin: "4px 0 0 0" }}>
            Spend your hard-earned gold and guild tokens on premium accessories and power-ups.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <CurrencyPill amount={avatar.gold} type="gold" />
          <CurrencyPill amount={avatar.tokens} type="token" />
        </div>
      </div>

      {/* Visual Audio Player Simulation (If any music is playing) */}
      {activeTrack && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "var(--space-4) var(--space-5)",
          background: "linear-gradient(90deg, var(--primary-soft), var(--surface-raised))",
          border: "2px solid var(--primary)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          animation: "qf-slide-in 0.25s ease-out"
        }}>
          <Volume2 size={24} color="var(--gold-700)" style={{ animation: "pulse 1s infinite" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: "bold", color: "var(--text-strong)" }}>
              Now Playing: {REWARDS_LIBRARY.find(r => r.id === activeTrack)?.title}
            </div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
              Focus Mode Active · Equalizer simulating audio stream
            </div>
          </div>
          {/* Bounce Equalizer Bars */}
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 24, paddingRight: 10 }}>
            {[1, 2, 3, 4, 5, 6].map((bar) => (
              <div key={bar} style={{
                width: 3,
                background: "var(--primary)",
                borderRadius: 1,
                animation: `bounceEqualizer 0.8s ease-in-out infinite alternate`,
                animationDelay: `${bar * 0.15}s`,
                height: `${Math.floor(Math.random() * 16) + 8}px`
              }} />
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setActiveTrack(null)}>
            <Square size={14} /> Stop
          </Button>
        </div>
      )}

      {/* Segment: Avatar Accessories */}
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", color: "var(--text-strong)", margin: "0 0 12px 0" }}>
          🛡️ Class Gear & Accessories (Gold)
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-4)" }}>
          {gearItems.map((item) => {
            const owned = purchasedRewards.includes(item.id);
            return (
              <div key={item.id} style={cardStyle(owned)}>
                <div style={badgeEmblemStyle(item.previewValue)} />
                <div style={{ flex: 1 }}>
                  <h5 style={itemTitleStyle}>{item.title}</h5>
                  <p style={itemDescStyle}>{item.description}</p>
                  <div style={purchaseRowStyle}>
                    {!owned ? (
                      <>
                        <span style={itemCostStyle}>{item.cost} G</span>
                        <Button variant="primary" size="sm" onClick={() => handlePurchase(item)}>
                          Buy
                        </Button>
                      </>
                    ) : (
                      <span style={ownedLabelStyle}><ShieldCheck size={16} /> Owned</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Segment: Companion Pets */}
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", color: "var(--text-strong)", margin: "0 0 12px 0" }}>
          🐣 Rare Companion Pets (Guild Tokens)
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-4)" }}>
          {petItems.map((item) => {
            const owned = purchasedRewards.includes(item.id);
            return (
              <div key={item.id} style={cardStyle(owned)}>
                <div style={badgeEmblemStyle(item.previewValue)} />
                <div style={{ flex: 1 }}>
                  <h5 style={itemTitleStyle}>{item.title}</h5>
                  <p style={itemDescStyle}>{item.description}</p>
                  <div style={purchaseRowStyle}>
                    {!owned ? (
                      <>
                        <span style={itemCostStyle}>{item.cost} T</span>
                        <Button variant="accent" size="sm" onClick={() => handlePurchase(item)}>
                          Buy
                        </Button>
                      </>
                    ) : (
                      <span style={ownedLabelStyle}><ShieldCheck size={16} /> Owned</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Segment: Sound & Music */}
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", color: "var(--text-strong)", margin: "0 0 12px 0" }}>
          🎵 Focus Soundscapes & SFX (Gold)
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-4)" }}>
          {musicItems.map((item) => {
            const owned = purchasedRewards.includes(item.id);
            const isPlaying = activeTrack === item.id;
            return (
              <div key={item.id} style={cardStyle(owned)}>
                <div style={badgeEmblemStyle(item.type === "music" ? "🎵" : "🔊")} />
                <div style={{ flex: 1 }}>
                  <h5 style={itemTitleStyle}>{item.title}</h5>
                  <p style={itemDescStyle}>{item.description}</p>
                  <div style={purchaseRowStyle}>
                    {!owned ? (
                      <>
                        <span style={itemCostStyle}>{item.cost} G</span>
                        <Button variant="primary" size="sm" onClick={() => handlePurchase(item)}>
                          Buy
                        </Button>
                      </>
                    ) : (
                      <div style={{ display: "flex", gap: 6, width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={ownedLabelStyle}><ShieldCheck size={14} /> Owned</span>
                        {item.type === "music" && (
                          <Button variant={isPlaying ? "accent" : "secondary"} size="sm" onClick={() => toggleTrack(item.id)}>
                            {isPlaying ? <Square size={12} /> : <Play size={12} />} {isPlaying ? "Stop" : "Play"}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Segment: Consumable Potions */}
      <div>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-md)", color: "var(--text-strong)", margin: "0 0 12px 0" }}>
          🧪 Magic Potions & Boosts (Gold)
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-4)" }}>
          {utilityItems.map((item) => {
            return (
              <div key={item.id} style={cardStyle(false)}>
                <div style={badgeEmblemStyle(item.previewValue)} />
                <div style={{ flex: 1 }}>
                  <h5 style={itemTitleStyle}>{item.title}</h5>
                  <p style={itemDescStyle}>{item.description}</p>
                  <div style={purchaseRowStyle}>
                    <span style={itemCostStyle}>{item.cost} G</span>
                    <Button variant="primary" size="sm" onClick={() => handlePurchase(item)}>
                      Use Potion
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Equalizer animation stylesheet */}
      <style>{`
        @keyframes bounceEqualizer {
          0% { height: 4px; }
          100% { height: 22px; }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>

    </div>
  );
}

// Styling helpers to keep component extremely neat
const cardStyle = (owned: boolean): React.CSSProperties => ({
  display: "flex",
  gap: "14px",
  padding: "var(--space-4)",
  background: "var(--surface-raised)",
  border: `var(--border-thin) solid ${owned ? "var(--primary-soft)" : "var(--border)"}`,
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-sm)",
  alignItems: "center"
});

const badgeEmblemStyle = (char: string): React.CSSProperties => ({
  width: 48,
  height: 48,
  borderRadius: "var(--radius-md)",
  background: "var(--bg-sunken)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
  flexShrink: 0,
  content: `"${char}"`
} as any);

// Inject visual characters inside the emblem block
const itemTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-semibold)",
  fontSize: "var(--text-base)",
  color: "var(--text-strong)",
  margin: 0
};

const itemDescStyle: React.CSSProperties = {
  fontSize: "var(--text-xs)",
  color: "var(--text-muted)",
  margin: "4px 0 8px 0",
  lineHeight: 1.3
};

const purchaseRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%"
};

const itemCostStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontWeight: 700,
  fontSize: "var(--text-sm)",
  color: "var(--text-strong)"
};

const ownedLabelStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontSize: "var(--text-xs)",
  fontWeight: "var(--weight-semibold)",
  color: "var(--success)"
};
