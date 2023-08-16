import React from "react";
import GameOptionsSelect from "../GameOptionsSelect";
import Game from "../Game";
import { OptionsSelectedContext } from "../OptionsSelectedProvider";
import styles from "./App.module.css";

function App() {
  const { hasSelected } = React.useContext(OptionsSelectedContext);

  const background = hasSelected
    ? "var(--clr-neutral-100)"
    : "var(--clr-neutral-300)";

  return (
    <div className={styles.AppWrapper} style={{ backgroundColor: background }}>
      {!hasSelected && <GameOptionsSelect />}
      {hasSelected && <Game />}
    </div>
  );
}

export default App;
