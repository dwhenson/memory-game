import React from "react";

import GameOptionsSelect from "../GameOptionsSelect";
import Game from "../Game";

import { GamePlayingContext } from "../GamePlayingProvider";

import styles from "./App.module.css";

function App() {
  const { isPlaying } = React.useContext(GamePlayingContext);

  return (
    <>
      {!isPlaying && <GameOptionsSelect />}
      {isPlaying && <Game />}
    </>
  );
}

export default App;
