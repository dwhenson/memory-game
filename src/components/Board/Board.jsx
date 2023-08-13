import React from "react";

import Button from "../Button";
import { GameOptionsContext } from "../GameOptionsProvider";

function Board({ board, setBoard, gameState, setGameState, setGameComplete }) {
  const { selectedGameOptions } = React.useContext(GameOptionsContext);
  const [selection, setSelection] = React.useState(null);
  const currentPlayerIndex = gameState.findIndex((player) => player.turn);

  function updateTurn() {
    if (currentPlayerIndex + 1 === gameState.length) {
      setGameState(
        gameState.map((player, index) => {
          if (index === 0) {
            return { ...player, turn: (player.turn = true) };
          } else {
            return { ...player, turn: (player.turn = false) };
          }
        })
      );
    } else {
      setGameState(
        gameState.map((player, index) => {
          if (currentPlayerIndex + 1 === index) {
            return { ...player, turn: (player.turn = true) };
          } else {
            return { ...player, turn: (player.turn = false) };
          }
        })
      );
    }
  }

  function updateScore() {
    setGameState(
      gameState.map((player, index) => {
        if (index !== currentPlayerIndex) {
          return player;
        } else {
          return { ...player, score: (player.score += 1) };
        }
      })
    );
  }

  function toggleTokenSelection(id) {
    setBoard(
      board.map((token) => {
        if (token.id !== id) {
          return token;
        }

        return {
          ...token,
          status: token.status === "hidden" ? "shown" : "hidden",
        };
      })
    );
  }

  // TODO add useCallBack hook
  function completeGame() {
    setGameComplete(true);

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
  }

  React.useEffect(() => {
    if (board.every((token) => token.status !== "hidden")) {
      completeGame();
    }
  }, [board]);

  function handleButtonClick(event) {
    if (!selection) {
      setSelection(event.target);
      toggleTokenSelection(event.target.id);
    } else if (event.target.value === selection.value) {
      toggleTokenSelection(event.target.id);
      updateScore();
      updateTurn();
      setSelection(null);
    } else {
      toggleTokenSelection(selection.id);
      updateTurn();
      setSelection(null);
    }
  }

  return (
    <div id="board">
      {board.map((token) => (
        <Button
          key={token.id}
          id={token.id}
          value={token.number}
          action={handleButtonClick}
          disabled={token.status === "shown" ? true : false}
        >
          {[token[selectedGameOptions.theme]]}
        </Button>
      ))}
    </div>
  );
}

export default Board;
