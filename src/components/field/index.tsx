import type { MouseEventHandler } from "react";
import type { Move } from "../../types";
import classes from "./field.module.css";

type FieldProps = {
  value: Move | null;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isWinning?: boolean;
  winningColor?: string;
};

export default function Field({ value, onClick, isWinning, winningColor }: FieldProps) {
  const style: React.CSSProperties = isWinning
    ? { backgroundColor: winningColor || "green", color: "#fff", fontWeight: "bold" }
    : {};

  return (
    <button
      className={classes.field}
      disabled={value !== null || !onClick}
      onClick={onClick}
      style={style}
    >
      {value ?? ""}
    </button>
  );
}