import React from "react";

import GameOptionsSelect from "../GameOptionsSelect";
import Game from "../Game";

import { OptionsSelectedContext } from "../OptionsSelectedProvider";

function App() {
  const { hasSelected } = React.useContext(OptionsSelectedContext);

  return (
    <>
      {!hasSelected && <GameOptionsSelect />}
      {hasSelected && <Game />}
    </>
  );
}

export default App;
