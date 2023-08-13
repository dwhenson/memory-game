import React from "react";

import Header from "../Header";
import RestartButton from "../RestartButton";
import NewGameButton from "../NewGameButton";
import Board from "../Board";
import Players from "../Players";
import Results from "../Results";

import useInitializeBoard from "../../hooks/useInitializeBoard";
import useInitializeGame from "../../hooks/useInitializeGame";

function Game() {
  const [gameComplete, setGameComplete] = React.useState(false);
  const {
    boardArray: [board, setBoard],
    initializeBoard,
  } = useInitializeBoard();
  const {
    gameArray: [gameState, setGameState],
    initializeGame,
  } = useInitializeGame();

  const [seconds, setSeconds] = React.useState(0);

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

  function restartGame() {
    initializeBoard();
    setSeconds(0);
    setGameComplete(false);
    initializeGame();
  }

  return (
    <>
      <Header>
        <RestartButton />
        <NewGameButton restartGame={restartGame} />
      </Header>
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
