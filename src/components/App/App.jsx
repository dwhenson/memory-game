import React from "react";
import GameOptionsSelect from "../GameOptionsSelect";
import Game from "../Game";
import { OptionsSelectedContext } from "../OptionsSelectedProvider";
import styles from "./App.module.css";

function App() {
  const { hasSelected } = React.useContext(OptionsSelectedContext);

  return (
    <div className={styles.wrapper}>
      {!hasSelected && <GameOptionsSelect />}
      {hasSelected && <Game />}
    </div>
  );
}

export default App;
