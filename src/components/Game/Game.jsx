import React from "react";

import Header from "../Header";
import Board from "../Board";
import Players from "../Players";
import Results from "../Results";

import { GameOptionsContext } from "../GameOptionsProvider";

import { shuffleArray } from "../../utils/shuffleArray";
import { tokens } from "../../data/tokens";

function Game() {
  const { selectedGameOptions } = React.useContext(GameOptionsContext);
  const [seconds, setSeconds] = React.useState(0);
  const initialGameState = [...Array(Number(selectedGameOptions.players))].map(
    (_, index) => {
      return {
        number: index + 1,
        score: 0,
        turn: index === 0 ? true : false,
        winner: false,
      };
    }
  );
  const initialBoard = shuffleArray(
    tokens
      .slice(0, Math.pow(selectedGameOptions.grid, 2) / 2)
      .flatMap((token) => [token, token])
      .map((token) => ({ ...token, id: crypto.randomUUID() }))
  );

  const [gameState, setGameState] = React.useState(initialGameState);
  const [gameComplete, setGameComplete] = React.useState(false);
  const [board, setBoard] = React.useState(initialBoard);

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

  React.useEffect(() => {
    if (!gameComplete) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameComplete]);

  return (
    <>
      <Header initialBoard={initialBoard} setBoard={setBoard} />
      <Board
        board={board}
        setBoard={setBoard}
        gameState={gameState}
        setGameState={setGameState}
        setGameComplete={setGameComplete}
      />
      <Players gameState={gameState} seconds={seconds} />
      {gameComplete && <Results gameState={gameState} seconds={seconds} />}
    </>
  );
}

export default Game;
