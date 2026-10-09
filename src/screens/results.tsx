import { useContext } from "react";
import { gameContext } from "../context";
import { checkWinner } from "../App";
import BoardComponent from "@/components/board";
import type { AppState, Players } from "../types";
import classes from "./splash.module.css";

type ResultsScreenProps = {
  players: Players;
  updateAppState: (state: AppState) => void;
};

export default function ResultsScreen({ players, updateAppState }: ResultsScreenProps) {
  const { board, status, updateBoard, updateStatus } = useContext(gameContext);

  const { line } = checkWinner(board);

  let resultTitle = "Ничья!";
  let winnerColor = "green";

  if (status === "x-wins") {
    resultTitle = `Победил ${players.x.name}!`;
    winnerColor = players.x.color || "green";
  } else if (status === "o-wins") {
    resultTitle = `Победил ${players.o.name}!`;
    winnerColor = players.o.color || "green";
  }

  const handleRestart = () => {
    localStorage.removeItem("xo__game");
    updateBoard(Array(9).fill(null));
    updateStatus("x-move");
    updateAppState("settings");
  };

  return (
    <main className={classes.main} style={{ textAlign: "center", padding: "20px" }}>
      <h2>{resultTitle}</h2>

      <div style={{ margin: "20px auto", maxWidth: "300px" }}>
        <BoardComponent
          board={board}
          winningLine={line}
          winningColor={winnerColor}
        />
      </div>

      <button onClick={handleRestart} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        Начать заново
      </button>
    </main>
  );
}