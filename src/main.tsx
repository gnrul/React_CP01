import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameContext } from "./context";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameContext>
      <App />
    </GameContext>
  </StrictMode>
);