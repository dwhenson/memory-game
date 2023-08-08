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
        number: index + 1,
        score: 0,
        turn: index === 0 ? true : false,
        time: index === 0 ? "12:00" : null,
        result: null,
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
        setGameComplete={setGameComplete}
      />
      <Players gameState={gameState} />
      {gameComplete && <Results gameState={gameState} />}
    </>
  );
}

export default Game;
