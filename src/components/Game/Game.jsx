import React from "react";

import Header from "../Header";
import Board from "../Board";
import Players from "../Players";
import Results from "../Results";

import useInitializeBoard from "../../hooks/useInitializeBoard";
import useInitializeGame from "../../hooks/useInitializeGame";

function Game() {
  const [gameComplete, setGameComplete] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const {
    boardArray: [board, setBoard],
    initializeBoard,
  } = useInitializeBoard();
  const {
    gameArray: [gameState, setGameState],
    initializeGame,
  } = useInitializeGame();

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
    <div>
      <Header restartGame={restartGame} />
      <Board
        board={board}
        setBoard={setBoard}
        gameState={gameState}
        setGameState={setGameState}
        setGameComplete={setGameComplete}
      />
      <Players gameState={gameState} seconds={seconds} />
      {gameComplete && <Results gameState={gameState} seconds={seconds} />}
    </div>
  );
}

export default Game;
