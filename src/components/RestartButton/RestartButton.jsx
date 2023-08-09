import React from "react";

import Button from "../Button";

import { GamePlayingContext } from "../GamePlayingProvider";

function RestartButton() {
  const { setIsPlaying } = React.useContext(GamePlayingContext);

  return <Button action={() => setIsPlaying(false)}>Restart</Button>;
}

export default RestartButton;
