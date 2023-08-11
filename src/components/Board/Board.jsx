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

  function toggleSelection(id) {
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

  React.useEffect(() => {
    if (board.every((token) => token.status !== "hidden")) {
      setGameComplete(true);
    }
  }, [board, setGameComplete]);

  function handleButtonClick(event) {
    if (!selection) {
      setSelection(event.target);
      toggleSelection(event.target.id);
    } else if (event.target.value === selection.value) {
      toggleSelection(event.target.id);
      updateScore();
      updateTurn();
      setSelection(null);
    } else {
      toggleSelection(selection.id);
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
