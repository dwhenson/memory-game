import React from "react";
import TokenButton from "../TokenButton";
import { GameOptionsContext } from "../GameOptionsProvider";
import styles from "./Board.module.css";

function Board({ board, setBoard, gameState, setGameState, setGameComplete }) {
  const boardRef = React.useRef();
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

  function changeTokenState(id, state) {
    setBoard(
      board.map((token) => {
        if (token.id !== id) {
          return token;
        }

        return {
          ...token,
          status: (token.status = state),
        };
      })
    );
  }

  React.useEffect(() => {
    if (board.every((token) => token.status !== "hidden")) {
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
  }, [board]);

  async function hideAfterDelay(first, second) {
    boardRef.current.style.pointerEvents = "none";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    changeTokenState(first, "hidden");
    changeTokenState(second, "hidden");
    boardRef.current.style.pointerEvents = "revert";
  }

  function handleButtonClick(event) {
    if (!selection) {
      setSelection(event.target);
      changeTokenState(event.target.id, "shown");
    } else if (event.target.value === selection.value) {
      changeTokenState(event.target.id, "found");
      changeTokenState(selection.id, "found");
      updateScore();
      updateTurn();
      setSelection(null);
    } else {
      changeTokenState(event.target.id, "shown");
      hideAfterDelay(selection.id, event.target.id);
      updateTurn();
      setSelection(null);
      if (gameState.length === 1) {
        updateScore();
      }
    }
  }

  return (
    <div
      id="board"
      ref={boardRef}
      className={styles.BoardWrapper}
      style={{ "--numCols": selectedGameOptions.grid }}
    >
      {board.map((token) => (
        <TokenButton
          key={token.id}
          id={token.id}
          value={token.number}
          action={handleButtonClick}
          disabled={token.status != "hidden"}
          style={{
            "--padding-inline": "var(--space-xs)",
            "--radius": "9999px",
          }}
          status={token.status}
        >
          {[token[selectedGameOptions.theme]]}
        </TokenButton>
      ))}
    </div>
  );
}

export default React.memo(Board);
