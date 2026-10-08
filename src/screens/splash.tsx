import { useState, useContext, type Dispatch, type SetStateAction } from "react";
import { gameContext } from "../context";
import type { AppState, SavedGame } from "@/types";

import logo from "@/assets/logo.png";
import x from "@/assets/x.svg";
import o from "@/assets/o.svg";

import classes from "./splash.module.css";

type SplashScreenProps = {
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SplashScreen({ updateAppState }: SplashScreenProps) {
  const [showModal, setShowModal] = useState(false);
  const { updateBoard, updateStatus } = useContext(gameContext);

  const handleLogoClick = () => {
    const savedGame = localStorage.getItem("xo__game");
    if (savedGame) {
      setShowModal(true);
    } else {
      updateAppState("settings"); 
    }
  };

  const handleContinue = () => {
    const savedGameRaw = localStorage.getItem("xo__game");
    if (savedGameRaw) {
      const savedGame: SavedGame = JSON.parse(savedGameRaw);
      updateBoard(savedGame.board);
      updateStatus(`${savedGame.move}-move`);
      updateAppState("game");
    }
  };

  const handleNewGame = () => {
    localStorage.removeItem("xo__game");
    updateBoard(Array(9).fill(null));
    updateStatus("x-move");
    updateAppState("settings");
  };

  return (
    <main className={classes.main}>
      <img src={x} className={classes.bgIcon} alt="X icon" />
      <img src={o} className={classes.bgIcon} alt="O icon" />
      <img
        onClick={handleLogoClick}
        className={classes.logo}
        src={logo}
        alt="logo"
        style={{ cursor: "pointer" }}
      />

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <p>У вас есть незавершенная игра!</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button onClick={handleContinue}>Продолжить</button>
              <button onClick={handleNewGame}>Начать новую</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  color: "#000",
  textAlign: "center",
};