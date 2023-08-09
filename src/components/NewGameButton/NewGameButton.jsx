import React from "react";

import Button from "../Button";

import { GamePlayingContext } from "../GamePlayingProvider";

function NewGameButton() {
  const { setIsPlaying } = React.useContext(GamePlayingContext);

  return <Button action={() => setIsPlaying(true)}>New Game</Button>;
}

export default NewGameButton;
