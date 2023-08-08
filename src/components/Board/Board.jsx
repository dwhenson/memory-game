import React from "react";
import { useRef } from "react";

import Button from "../Button";
import { GameOptionsContext } from "../GameOptionsProvider";

import { tokens } from "../../data/tokens";

function Board({ gameState, setGameState, gameComplete, setGameComplete }) {
  const { selectedGameOptions } = React.useContext(GameOptionsContext);
  const [selection, setSelection] = React.useState(null);
  const tokenRef = useRef(null);

  const tokensToRender = tokens[selectedGameOptions.theme]
    .flat()
    .slice(0, Math.pow(selectedGameOptions.grid, 2));
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

  // FIXME - Can you get this out the DOM?
  React.useEffect(() => {
    const buttons = [...document.querySelectorAll("#board button")];
    const isComplete = buttons.every((button) =>
      button.hasAttribute("disabled")
    );
    setGameComplete(() => isComplete);
  }, [selection, setGameComplete]);

  function handleButtonClick(event) {
    if (!selection) {
      setSelection(event.target);
      event.target.setAttribute("disabled", true);
      tokenRef.current = event.target;
    } else if (event.target.value === selection.value) {
      event.target.setAttribute("disabled", true);
      updateScore();
      updateTurn();
      setSelection(null);
    } else {
      updateTurn();
      tokenRef.current.removeAttribute("disabled");
      setSelection(null);
    }
  }

  return (
    <div id="board">
      {tokensToRender.map((token, index) => (
        <Button key={index} value={token} action={handleButtonClick}>
          {token}
        </Button>
      ))}
    </div>
  );
}

export default Board;
