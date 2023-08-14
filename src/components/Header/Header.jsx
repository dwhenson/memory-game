import React from "react";
import RestartButton from "../RestartButton";
import NewGameButton from "../NewGameButton";

function Header({ restartGame }) {
  return (
    <div>
      <img src="" alt="logo" />
      <div>
        <RestartButton />
        <NewGameButton restartGame={restartGame} />
      </div>
    </div>
  );
}

export default React.memo(Header);
