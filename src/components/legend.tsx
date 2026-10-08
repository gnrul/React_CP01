import type { Players, Move } from "../types";
import xIcon from "@/assets/x.svg";
import oIcon from "@/assets/o.svg";
import classes from "./legend.module.css";

type LegendProps = {
  players: Players;
  currentMove: Move;
};

export default function Legend({ players, currentMove }: LegendProps) {
  return (
    <section className={classes.legend}>
      {/* Игрок X */}
      <section
        className={classes.legend__item}
        style={{
          opacity: currentMove === "x" ? 1 : 0.4,
          transition: "opacity 0.2s ease",
        }}
      >
        <img src={xIcon} className={classes.legend__icon} alt="X" />
        <span style={{ color: players.x.color, fontWeight: "bold" }}>
          {players.x.name}
        </span>
      </section>

      {/* Игрок O */}
      <section
        className={classes.legend__item}
        style={{
          opacity: currentMove === "o" ? 1 : 0.4,
          transition: "opacity 0.2s ease",
        }}
      >
        <img src={oIcon} className={classes.legend__icon} alt="O" />
        <span style={{ color: players.o.color, fontWeight: "bold" }}>
          {players.o.name}
        </span>
      </section>
    </section>
  );
}