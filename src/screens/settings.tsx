import { useRef, useEffect, useContext, type FormEvent, type Dispatch, type SetStateAction } from "react";
import { gameContext } from "../context";
import type { AppState, Players } from "../types";

type SettingsScreenProps = {
  players: Players;
  setPlayers: Dispatch<SetStateAction<Players>>;
  updateAppState: Dispatch<SetStateAction<AppState>>;
};

export default function SettingsScreen({
  players,
  setPlayers,
  updateAppState,
}: SettingsScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateBoard, updateStatus } = useContext(gameContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const newPlayers: Players = {
      x: {
        name: (data.get("nameX") as string) || "Игрок 1",
        color: (data.get("colorX") as string) || "#3b82f6",
      },
      o: {
        name: (data.get("nameO") as string) || "Игрок 2",
        color: (data.get("colorO") as string) || "#ef4444",
      },
    };

    setPlayers(newPlayers);
    localStorage.removeItem("xo__game");
    updateBoard(Array(9).fill(null));
    updateStatus("x-move");

    updateAppState("game");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Настройки игроков</h2>
      <section>
        <label>Крестики (X):</label>
        <input
          ref={inputRef}
          type="text"
          name="nameX"
          placeholder="Имя 1 игрока "
          defaultValue={players.x.name}
          required
        />
        <input
          type="color"
          name="colorX"
          defaultValue={players.x.color}
        />
      </section>

      <section>
        <label>Нолики (O):</label>
        <input
          type="text"
          name="nameO"
          placeholder="Имя 2игрока "
          defaultValue={players.o.name}
          required
        />
        <input
          type="color"
          name="colorO"
          defaultValue={players.o.color}
        />
      </section>

      <button type="submit">Начать</button>
    </form>
  );
}