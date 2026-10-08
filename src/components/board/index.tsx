import Field from "../field";
import type { Board as BoardType } from "../../types";
import classes from "./board.module.css";

type BoardProps = {
  board: BoardType;
  onCellClick?: (index: number) => void;
  winningLine?: number[] | null;
  winningColor?: string;
};

export default function Board({ board, onCellClick, winningLine, winningColor }: BoardProps) {
  return (
    <main className={classes.board}>
      {board.map((cell, index) => {
        const isWinning = winningLine?.includes(index) ?? false;

        return (
          <Field
            key={`field-${index}`}
            value={cell}
            onClick={onCellClick ? () => onCellClick(index) : undefined}
            isWinning={isWinning}
            winningColor={winningColor}
          />
        );
      })}
    </main>
  );
}