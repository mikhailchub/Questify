import React, { useState, useEffect } from "react";
import { useGame, REWARDS_LIBRARY } from "./context/GameContext";
import { DashboardView } from "./views/DashboardView";
import { AchievementsView } from "./views/AchievementsView";
import { RewardForgeView } from "./views/RewardForgeView";
import { CharacterView } from "./views/CharacterView";
import { SimulationPanel } from "./views/SimulationPanel";

// Core components
import { Button } from "./components/core/Button";
import { Dialog } from "./components/core/Dialog";
import { Input } from "./components/core/Input";
import { Tag } from "./components/core/Tag";
import { Toast } from "./components/core/Toast";
import { CurrencyPill } from "./components/game/CurrencyPill";
import { DifficultyStars } from "./components/game/DifficultyStars";

// Icons
import {
  ScrollText,
  Trophy,
  Gem,
  UserRound,
  Activity,
  Shield,
  Plus,
  Flame,
  Sun,
  Moon,
  Calendar,
  Sparkles,
  X,
  PlusCircle,
  HelpCircle
} from "lucide-react";

const VIEWS: Record<string, string> = {
  quests: "Today's Quests",
  achievements: "Achievements",
  forge: "Reward Forge",
  character: "Character Customization",
  simulation: "Simulation Control Panel"
};

export function App() {
  const {
    avatar,
    toasts,
    addQuest,
    dismissToast,
    resetDemoData
  } = useGame();

  const [view, setView] = useState("quests");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showBuilder, setShowBuilder] = useState(false);

  // Builder states
  const [qTitle, setQTitle] = useState("");
  const [qDiff, setQDiff] = useState<1 | 2 | 3>(2); // Medium
  const [qTags, setQTags] = useState<string[]>(["bug"]);
  const [tagVal, setTagVal] = useState("");
  const [qDueText, setQDueText] = useState("Today 5pm");
  const [qDueTime, setQDueTime] = useState<number>(() => {
    const d = new Date();
    d.setHours(17, 0, 0, 0); // 5pm today
    return d.getTime();
  });

  // Calculate live preview rewards in builder
  const baseReward = 40;
  const previewXp = Math.round(baseReward * qDiff * 1.1);
  const previewGold = Math.round(previewXp / 8);

  // Set theme on root element when it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (!avatar) {
    return (
      <div style={{
        display: "flex", height: "100vh", alignItems: "center", justifyContent: "center",
        background: "var(--bg-base)", color: "var(--text-muted)", fontFamily: "var(--font-body)"
      }}>
        Initializing Questify local cache database...
      </div>
    );
  }

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagVal.trim()) {
      e.preventDefault();
      const cleaned = tagVal.trim().replace(/^#/, "").toLowerCase();
      if (cleaned && !qTags.includes(cleaned)) {
        setQTags([...qTags, cleaned]);
      }
      setTagVal("");
    }
  };

  const handleRemoveTag = (t: string) => {
    setQTags(qTags.filter((x) => x !== t));
  };

  const handleCreateQuest = async () => {
    await addQuest(qTitle || "Untitled Quest", qDiff, qTags, qDueText, qDueTime);
    
    // Reset builder inputs
    setQTitle("");
    setQDiff(2);
    setQTags(["bug"]);
    setQDueText("Today 5pm");
    const d = new Date();
    d.setHours(17, 0, 0, 0);
    setQDueTime(d.getTime());
    setShowBuilder(false);
  };

  // Nav list configuration
  const navList = [
    { id: "quests", label: "Quests", icon: <ScrollText size={20} /> },
    { id: "achievements", label: "Achievements", icon: <Trophy size={20} /> },
    { id: "forge", label: "Reward Forge", icon: <Gem size={20} /> },
    { id: "character", label: "Character", icon: <UserRound size={20} /> },
    { id: "simulation", label: "Simulation Panel", icon: <Activity size={20} /> }
  ];

  return (
    <div style={{ display: "flex", height: "100vh", color: "var(--text-body)", fontFamily: "var(--font-body)", overflow: "hidden" }}>
      
      {/* Sidebar segment */}
      <aside style={{
        width: 264, flex: "none", height: "100%",
        background: "var(--surface)", borderRight: "var(--border-thin) solid var(--border)",
        display: "flex", flexDirection: "column", padding: "var(--space-5)", boxSizing: "border-box"
      }}>
        {/* Brand Wordmark Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px 16px" }}>
          <span style={{
            width: 38, height: 38, borderRadius: "var(--radius-md)",
            background: "var(--primary)", color: "var(--on-primary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--pop-primary)"
          }}>
            <Shield size={22} />
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-strong)", letterSpacing: "-0.01em" }}>
            Questify
          </span>
        </div>

        {/* Sidebar Nav Buttons */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12 }}>
          {navList.map((item) => {
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, height: 46, padding: "0 14px",
                  border: "none", borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15,
                  color: active ? "var(--text-strong)" : "var(--text-muted)",
                  background: active ? "var(--primary-soft)" : "transparent",
                  cursor: "pointer", textAlign: "left",
                  transition: "all var(--dur-fast)"
                }}
              >
                <span style={{ color: active ? "var(--gold-700)" : "var(--text-muted)", display: "inline-flex" }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom User Card widget */}
        <div style={{
          marginTop: "auto", padding: "var(--space-4)",
          background: "var(--bg-subtle)", borderRadius: "var(--radius-lg)",
          border: "var(--border-thin) solid var(--border)",
          display: "flex", alignItems: "center", gap: 11
        }}>
          <span style={{ position: "relative", flex: "none" }}>
            <span style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "3px solid var(--primary)", background: "var(--primary-soft)",
              color: "var(--gold-800)", display: "inline-flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17,
              boxSizing: "border-box"
            }}>
              AL
            </span>
            <span style={{
              position: "absolute", bottom: -3, right: -3,
              minWidth: 20, height: 20, padding: "0 4px",
              borderRadius: "var(--radius-pill)", background: "var(--warm-900)",
              color: "var(--gold-300)", border: "2px solid var(--bg-subtle)",
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11,
              display: "inline-flex", alignItems: "center", justifyContent: "center"
            }}>{avatar.level}</span>
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              Ada Lovelace
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {avatar.class}
            </div>
          </div>
        </div>
      </aside>

      {/* Main panel stage */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
        
        {/* Layout Topbar header */}
        <header style={{
          height: 64, flex: "none", display: "flex", alignItems: "center",
          gap: "var(--space-4)", padding: "0 28px",
          borderBottom: "var(--border-thin) solid var(--border)", background: "var(--surface)",
          zIndex: 10
        }}>
          <h1 style={{ fontSize: "var(--text-2xl)", fontFamily: "var(--font-display)", color: "var(--text-strong)", margin: 0, marginRight: "auto" }}>
            {VIEWS[view]}
          </h1>

          {/* Streak badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7, height: 32, padding: "0 12px",
            background: "var(--accent-soft)", color: "var(--ember-700)", borderRadius: "var(--radius-pill)",
            fontWeight: 700, fontSize: 13, fontFamily: "var(--font-display)"
          }}>
            <Flame size={16} fill="var(--accent)" color="var(--accent)" /> {avatar.streak}-day streak
          </div>

          {/* Wallet Currencies */}
          <CurrencyPill amount={avatar.gold} type="gold" />
          <CurrencyPill amount={avatar.tokens} type="token" />

          {/* Theme switcher toggle */}
          <button
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center",
              borderRadius: "var(--radius-md)", border: "var(--border-thin) solid var(--border-strong)",
              background: "var(--surface-raised)", color: "var(--text-strong)", cursor: "pointer",
              transition: "background var(--dur-fast)"
            }}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* New Quest Button */}
          <Button variant="primary" pop={true} onClick={() => setShowBuilder(true)}>
            <Plus size={18} style={{ marginRight: -4 }} /> New quest
          </Button>
        </header>

        {/* Dynamic content viewer window */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px", width: "100%", boxSizing: "border-box" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", paddingBottom: 40 }}>
            {view === "quests" && <DashboardView />}
            {view === "achievements" && <AchievementsView />}
            {view === "forge" && <RewardForgeView />}
            {view === "character" && <CharacterView />}
            {view === "simulation" && <SimulationPanel />}
          </div>
        </main>
      </div>

      {/* Quest Builder Modal Dialog */}
      <Dialog
        open={showBuilder}
        onClose={() => setShowBuilder(false)}
        title="Create New Quest"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowBuilder(false)}>Cancel</Button>
            <Button variant="primary" pop={true} onClick={handleCreateQuest} disabled={!qTitle.trim()}>
              Create quest
            </Button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          {/* Title text input */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>Quest Objective</label>
            <Input
              value={qTitle}
              onChange={(e) => setQTitle(e.target.value)}
              placeholder="e.g. Defeat the email inbox..."
            />
          </div>

          <div style={{ display: "flex", gap: "var(--space-5)", flexWrap: "wrap" }}>
            {/* Difficulty stars rating picker */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>Difficulty Tier</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, height: 40 }}>
                <DifficultyStars level={qDiff} size={22} />
                {/* 1, 2, or 3 stars clicking */}
                <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>
                  {[1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => setQDiff(val as 1 | 2 | 3)}
                      style={{
                        padding: "2px 6px",
                        fontSize: 11,
                        fontWeight: 600,
                        border: "1px solid var(--border-strong)",
                        background: qDiff === val ? "var(--primary-soft)" : "transparent",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        color: "var(--text-strong)"
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>
                  {["", "Easy", "Medium", "Hard"][qDiff]}
                </span>
              </div>
            </div>

            {/* Deadline settings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>Due Date / Text</label>
              <div style={{ display: "flex", gap: 8 }}>
                <Input
                  value={qDueText}
                  onChange={(e) => setQDueText(e.target.value)}
                  placeholder="e.g. Today 5pm"
                />
                
                {/* Quick set for real calculations */}
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    const now = new Date();
                    if (val === "2hrs") {
                      setQDueText("In 2 hours");
                      setQDueTime(now.getTime() + 2 * 60 * 60 * 1000);
                    } else if (val === "today") {
                      setQDueText("Today 5pm");
                      const d = new Date();
                      d.setHours(17, 0, 0, 0);
                      setQDueTime(d.getTime());
                    } else if (val === "yesterday") {
                      setQDueText("Yesterday");
                      setQDueTime(now.getTime() - 24 * 60 * 60 * 1000);
                    } else if (val === "tomorrow") {
                      setQDueText("Tomorrow 5pm");
                      const d = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                      d.setHours(17, 0, 0, 0);
                      setQDueTime(d.getTime());
                    }
                  }}
                  style={{
                    padding: "0 8px",
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--border-strong)",
                    background: "var(--surface-raised)",
                    color: "var(--text-strong)"
                  }}
                >
                  <option value="today">Today</option>
                  <option value="2hrs">In 2 Hours (Urgent)</option>
                  <option value="yesterday">Yesterday (Overdue)</option>
                  <option value="tomorrow">Tomorrow</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tags manager */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-strong)" }}>Tags (Press Enter to add)</label>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
              minHeight: 44, padding: "0 12px", border: "2px solid var(--border-strong)",
              borderRadius: "var(--radius-md)", background: "var(--surface-raised)"
            }}>
              {qTags.map((t) => (
                <span key={t} style={{
                  display: "inline-flex", alignItems: "center", gap: 6, height: 26,
                  padding: "0 10px", fontSize: 12, fontWeight: 600,
                  borderRadius: "var(--radius-pill)", background: "var(--primary-soft)", color: "var(--gold-800)"
                }}>
                  #{t}
                  <span onClick={() => handleRemoveTag(t)} style={{ cursor: "pointer", display: "inline-flex" }}>
                    <X size={12} />
                  </span>
                </span>
              ))}
              <input
                value={tagVal}
                onChange={(e) => setTagVal(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="add tag..."
                style={{
                  flex: 1, minWidth: 80, height: 40, border: "none", outline: "none",
                  background: "transparent", fontSize: 14, color: "var(--text-strong)"
                }}
              />
            </div>
          </div>

          {/* Reward preview indicator */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
            background: "var(--primary-soft)", borderRadius: "var(--radius-md)"
          }}>
            <Sparkles size={18} color="var(--gold-700)" />
            <span style={{ fontSize: 13, color: "var(--gold-800)", fontWeight: 500 }}>Reward preview:</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--gold-800)" }}>
              +{previewXp} XP · +{previewGold} Gold
            </span>
          </div>

        </div>
      </Dialog>

      {/* Floating Toast stacks */}
      <div style={{
        position: "fixed", right: 24, bottom: 24, zIndex: 1000,
        display: "flex", flexDirection: "column", gap: 12,
        pointerEvents: "none"
      }}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: "auto" }}>
            <Toast
              title={toast.title}
              message={toast.msg}
              tone={toast.tone === "error" ? "danger" : toast.tone}
              onClose={() => dismissToast(toast.id)}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
