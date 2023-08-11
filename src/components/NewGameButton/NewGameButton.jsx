import React from "react";

import Button from "../Button";

import { GamePlayingContext } from "../GamePlayingProvider";

function NewGameButton({ initialBoard, setBoard }) {
  return <Button action={() => setBoard(initialBoard)}>New Game</Button>;
}

export default NewGameButton;
