import { useEffect, useState, useContext } from "react";

import { gameContext } from "./context";
import { SplashScreen, SettingsScreen, GameScreen, ResultsScreen } from "./screens";
import type { AppState, Board, Move, Players, SavedGame } from "./types";

const WIN_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Строки строки диагнали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

export function checkWinner(board: Board): { winner: Move | null; line: number[] | null } {
  for (let combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Move, line: combo };
    }
  }
  return { winner: null, line: null };
}

export default function App() {
  const [appState, updateAppState] = useState<AppState>("idle");
  const [players, setPlayers] = useState<Players>({
    x: { name: "Игрок 1", color: "#3b82f6" },
    o: { name: "Игрок 2", color: "#ef4444" },
  });

  const { updateBoard, updateStatus } = useContext(gameContext);

  useEffect(() => {
    const storagePlayers = localStorage.getItem("xo__players");
    const storageGame = localStorage.getItem("xo__game");

    if (storagePlayers !== null) {
      try {
        setPlayers(JSON.parse(storagePlayers));
      } catch (e) {
        console.error("Ошибка чтения xo__players", e);
      }
    }

    if (storageGame !== null) {
      try {
        const parsedGame: SavedGame = JSON.parse(storageGame);
        if (parsedGame.board && parsedGame.board.some((cell) => cell !== null)) {
          updateBoard(parsedGame.board);
          updateStatus(`${parsedGame.move}-move`);
        }
      } catch (e) {
        console.error("Ошибка xo__game", e);
      }
    }
  }, []);

  useEffect(() => {
    if (players) {
      localStorage.setItem("xo__players", JSON.stringify(players));
    }
  }, [players]);

  const screens = {
    idle: <SplashScreen updateAppState={updateAppState} />,
    settings: (
      <SettingsScreen
        players={players}
        setPlayers={setPlayers}
        updateAppState={updateAppState}
      />
    ),
    game: (
      <GameScreen
        players={players}
        updateAppState={updateAppState}
      />
    ),
    results: (
      <ResultsScreen
        players={players}
        updateAppState={updateAppState}
      />
    ),
  };

  return screens[appState];
}