import React from "react";

import Button from "../Button";

import { GameOptionsContext } from "../GameOptionsProvider";
import { GamePlayingContext } from "../GamePlayingProvider";

import { allGameOptions } from "../../data/options";

function GameOptionsSelect() {
  const { selectedGameOptions, setSelectedGameOptions } =
    React.useContext(GameOptionsContext);

  const { setIsPlaying } = React.useContext(GamePlayingContext);

  return (
    <form>
      {allGameOptions.map((option) =>
        Object.entries(option).map(([title, values]) => (
          <fieldset key={title}>
            <legend>Select {title}</legend>
            {values.map((value, index) => (
              <>
                <input
                  key={index}
                  type="radio"
                  name={title}
                  id={value}
                  value={value}
                  checked={selectedGameOptions[title] == value}
                  onChange={(event) => {
                    setSelectedGameOptions({
                      ...selectedGameOptions,
                      [title]: event.target.id,
                    });
                  }}
                />
                <label htmlFor={value}>{value}</label>
              </>
            ))}
          </fieldset>
        ))
      )}
      <Button
        action={(event) => {
          event.preventDefault();
          setIsPlaying(true);
        }}
      >
        Start Game
      </Button>
    </form>
  );
}

export default GameOptionsSelect;
