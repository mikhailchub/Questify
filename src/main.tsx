import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { GameProvider } from "./context/GameContext";
import "./design-system/styles.css";

// Global stylesheet overrides to ensure responsive height and sizing
const style = document.createElement("style");
style.innerHTML = `
  html, body { height: 100%; margin: 0; padding: 0; background: var(--bg-base); overflow: hidden; }
  #root { height: 100vh; }
  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 999px; border: 3px solid transparent; background-clip: content-box; }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
