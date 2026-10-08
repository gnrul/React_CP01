import { useState, useContext, type Dispatch, type SetStateAction } from "react";
import { gameContext } from "../context";
import type { AppState, Board, Move, Players } from "../types";

import BoardComponent from "@/components/board";
import TimerComponent from "@/components/timer";
import LegendComponent from "@/components/legend";

type GameScreenProps = {
  players: Players;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Строки
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Столбцы
  [0, 4, 8], [2, 4, 6]             // Диагонали
];

function checkWinner(currentBoard: Board): { winner: Move | null; line: number[] | null } {
  for (let combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return { winner: currentBoard[a] as Move, line: combo };
    }
  }
  return { winner: null, line: null };
}

export default function GameScreen({ players, updateAppState }: GameScreenProps) {
  const { board, status, updateBoard, updateStatus } = useContext(gameContext);
  const [showModal, setShowModal] = useState(false);

  const currentMove: Move = status === "o-move" ? "o" : "x";

  const handleCellClick = (index: number) => {
    if (board[index] !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = currentMove;
    updateBoard(nextBoard);

    const { winner } = checkWinner(nextBoard);
    if (winner) {
      updateStatus(`${winner}-wins`);
      localStorage.removeItem("xo__game");
      updateAppState("results");
    } else if (nextBoard.every((cell) => cell !== null)) {
      updateStatus("draw");
      localStorage.removeItem("xo__game");
      updateAppState("results");
    } else {
      const nextMove: Move = currentMove === "x" ? "o" : "x";
      updateStatus(`${nextMove}-move`);
      localStorage.setItem(
        "xo__game",
        JSON.stringify({ move: nextMove, board: nextBoard })
      );
    }
  };

  const handleResetConfirm = () => {
    localStorage.removeItem("xo__game");
    updateBoard(Array(9).fill(null));
    updateStatus("x-move");
    updateAppState("settings");
  };

  return (
    <div>
      <h1>Крестики-Нолики</h1>
      <div>
        <LegendComponent players={players} currentMove={currentMove} />
        <BoardComponent board={board} onCellClick={handleCellClick} />
        <TimerComponent />
      </div>

      <button onClick={() => setShowModal(true)}>Начать заново</button>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <p>Уверен что хочешь знаново начать?</p>
            <p>Прогресс текущей игры будет сброшен</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "15px", justifyContent: "center" }}>
              <button onClick={handleResetConfirm}>сбросить</button>
              <button onClick={() => setShowModal(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
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