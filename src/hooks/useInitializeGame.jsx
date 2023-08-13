import React from "react";
import { GameOptionsContext } from "../components/GameOptionsProvider";

export default function useInitializeGame() {
  const { selectedGameOptions } = React.useContext(GameOptionsContext);

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

  const [gameState, setGameState] = React.useState(initialGameState);

  function initializeGame() {
    setGameState(initialGameState);
  }

  return { gameArray: [gameState, setGameState], initializeGame };
}
