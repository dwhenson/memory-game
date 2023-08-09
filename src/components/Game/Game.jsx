import React from "react";

import Header from "../Header";
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
        winner: false,
      };
    }
  );

  const [gameState, setGameState] = React.useState(initialGameState);
  const [gameComplete, setGameComplete] = React.useState(false);

  React.useEffect(() => {
    const highScore = gameState.reduce((acc, cur) => {
      return cur.score > acc ? cur.score : acc;
    }, 0);

    setGameState(
      gameState.map((player) => {
        if (player.score === highScore) {
          return { ...player, winner: true };
        } else {
          return { ...player, winner: false };
        }
      })
    );
  }, [gameComplete]);

  return (
    <>
      <Header setGameComplete={setGameComplete} />
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
