import React from "react";
import { GameOptionsContext } from "../components/GameOptionsProvider";
import { shuffleArray } from "../utils/shuffleArray";
import { tokens } from "../data/tokens";

export default function useInitializeBoard() {
  const { selectedGameOptions } = React.useContext(GameOptionsContext);

  const initialBoard = shuffleArray(
    tokens
      .slice(0, Math.pow(selectedGameOptions.grid, 2) / 2)
      .flatMap((token) => [token, token])
      .map((token) => ({ ...token, id: crypto.randomUUID() }))
  );

  const [board, setBoard] = React.useState(initialBoard);

  function initializeBoard() {
    setBoard(initialBoard);
  }

  return { boardArray: [board, setBoard], initializeBoard };
}
