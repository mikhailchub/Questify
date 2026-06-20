import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { Button } from "../components/core/Button";
import { Calendar, GitPullRequest, RotateCcw, AlertTriangle, CloudDownload, CloudUpload, Zap, Clock } from "lucide-react";
import * as db from "../db/questifyDb";

export function SimulationPanel() {
  const {
    triggerSimulatedImport,
    resetDemoData,
    timeTravel,
    pushToast,
  } = useGame();

  const [backupText, setBackupText] = useState("");

  const handleExport = async () => {
    try {
      const q = await db.getQuests();
      const a = await db.getAvatar();
      const r = await db.getPurchasedRewards();
      const ach = await db.getUnlockedAchievements();

      const backup = {
        quests: q,
        avatar: a,
        rewards: r,
        achievements: ach,
        exportedAt: Date.now()
      };

      setBackupText(JSON.stringify(backup, null, 2));
      pushToast("success", "Export Successful", "Database JSON copied to textarea below.");
    } catch (err) {
      console.error(err);
      pushToast("error", "Export Failed", "Could not read IndexedDB records.");
    }
  };

  const handleImport = async () => {
    if (!backupText.trim()) {
      pushToast("error", "Import Error", "Please paste backup JSON into textarea first.");
      return;
    }

    try {
      const parsed = JSON.parse(backupText);
      if (!parsed.quests || !parsed.avatar) {
        throw new Error("Invalid backup schema");
      }

      await db.clearAllData();

      // restore quests
      for (const q of parsed.quests) {
        await db.saveQuest(q);
      }

      // restore avatar
      if (parsed.avatar) {
        await db.saveAvatar(parsed.avatar);
      }

      // restore rewards
      if (parsed.rewards) {
        for (const r of parsed.rewards) {
          await db.savePurchasedReward(r);
        }
      }

      // restore achievements
      if (parsed.achievements) {
        for (const a of parsed.achievements) {
          await db.saveUnlockedAchievement(a);
        }
      }

      pushToast("success", "Import Complete!", "Database restored successfully. Refreshing page...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      pushToast("error", "Import Failed", "Invalid backup JSON formatting.");
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--space-6)" }}>
      
      {/* Simulation Controls Block */}
      <div style={boxStyle}>
        <h4 style={headerStyle}><Zap size={18} color="var(--primary)" /> Mock Integrations & Webhooks</h4>
        <p style={descStyle}>
          Since GitHub Pages serves static files, you can simulate external API imports and triggers manually using the controls below:
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          <Button variant="secondary" size="md" onClick={() => triggerSimulatedImport("jira")}>
            <Zap size={16} /> Sync Jira Backlog
          </Button>
          
          <Button variant="secondary" size="md" onClick={() => triggerSimulatedImport("calendar")}>
            <Calendar size={16} /> Sync Calendar Events
          </Button>

          <Button variant="secondary" size="md" onClick={() => triggerSimulatedImport("pr_merge")}>
            <GitPullRequest size={16} /> Trigger PR Merge Webhook
          </Button>
        </div>
      </div>

      {/* Time Offset controls */}
      <div style={boxStyle}>
        <h4 style={headerStyle}><Clock size={18} color="var(--accent)" /> Time Travel Offset Simulation</h4>
        <p style={descStyle}>
          Simulate procrastination! Shift the deadline of incomplete quests back by 24 hours to trigger overdue states and spawn monsters:
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          <Button variant="secondary" size="md" onClick={() => timeTravel(24)}>
            <Clock size={16} /> Fast Forward +24 Hours
          </Button>
        </div>
      </div>

      {/* Database Backup & Restore */}
      <div style={boxStyle}>
        <h4 style={headerStyle}><CloudDownload size={18} /> Backup / Restore Local DB</h4>
        <p style={descStyle}>
          Export your character profile and quest log to JSON, or import an existing string to restore your RPG state.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <CloudDownload size={14} /> Export State
          </Button>
          <Button variant="secondary" size="sm" onClick={handleImport}>
            <CloudUpload size={14} /> Import State
          </Button>
        </div>

        <textarea
          value={backupText}
          onChange={(e) => setBackupText(e.target.value)}
          placeholder="Paste backup JSON here to import, or click Export State to copy from DB..."
          style={{
            width: "100%",
            height: 120,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: 10,
            marginTop: 12,
            background: "var(--bg-sunken)",
            color: "var(--text-strong)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-md)",
            outline: "none",
            resize: "vertical"
          }}
        />
      </div>

      {/* Reset System */}
      <div style={{
        ...boxStyle,
        border: "2px solid var(--danger)",
        background: "color-mix(in oklab, var(--danger) 8%, transparent)"
      }}>
        <h4 style={{ ...headerStyle, color: "var(--danger)" }}><AlertTriangle size={18} /> Danger Zone</h4>
        <p style={descStyle}>
          Resets your guest character level, clears all quest records, and resets shop items to default seed credentials.
        </p>
        <div style={{ marginTop: 16 }}>
          <Button variant="danger" size="md" onClick={resetDemoData}>
            <RotateCcw size={16} /> Reset Demo Data
          </Button>
        </div>
      </div>

    </div>
  );
}

const boxStyle: React.CSSProperties = {
  padding: "var(--space-5)",
  background: "var(--surface-raised)",
  border: "var(--border-thin) solid var(--border)",
  borderRadius: "var(--radius-xl)",
  boxShadow: "var(--shadow-sm)"
};

const headerStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-base)",
  fontWeight: "var(--weight-semibold)",
  color: "var(--text-strong)",
  margin: "0 0 8px 0",
  display: "flex",
  alignItems: "center",
  gap: 8
};

const descStyle: React.CSSProperties = {
  fontSize: "var(--text-sm)",
  color: "var(--text-muted)",
  margin: 0,
  lineHeight: 1.4
};
