import React from "react";

import Board from "../Board";
import Players from "../Players";
import Results from "../Results";

import { GameOptionsContext } from "../GameOptionsProvider";

function Game() {
  const { selectedGameOptions } = React.useContext(GameOptionsContext);

  const initialGameState = [...Array(Number(selectedGameOptions.players))].map(
    (_, index) => {
      return {
        score: 0,
        turn: index === 0 ? true : false,
        time: index === 0 ? "12:00" : null,
      };
    }
  );

  const [gameState, setGameState] = React.useState(initialGameState);
  const [gameComplete, setGameComplete] = React.useState(false);

  return (
    <>
      <div>Header</div>
      <Board
        gameState={gameState}
        setGameState={setGameState}
        gameComplete={gameComplete}
        setGameComplete={setGameComplete}
      />
      <Players gameState={gameState} />
      {gameComplete && <Results />}
    </>
  );
}

export default Game;
