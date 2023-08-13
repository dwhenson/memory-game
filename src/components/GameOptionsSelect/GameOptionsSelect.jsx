import React from "react";
import Button from "../Button";
import { GameOptionsContext } from "../GameOptionsProvider";
import { OptionsSelectedContext } from "../OptionsSelectedProvider";

import { allGameOptions } from "../../data/options";

function GameOptionsSelect() {
  const { selectedGameOptions, setSelectedGameOptions } =
    React.useContext(GameOptionsContext);
  const { setHasSelected } = React.useContext(OptionsSelectedContext);

  return (
    <form>
      {allGameOptions.map((option) =>
        Object.entries(option).map(([title, values], optionIndex) => (
          <fieldset key={`${title}-${optionIndex}`}>
            <legend>Select {title}</legend>
            {values.map((value, valueIndex) => (
              <>
                <input
                  key={`${title}-${valueIndex}`}
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
          setHasSelected(true);
        }}
      >
        Start Game
      </Button>
    </form>
  );
}

export default GameOptionsSelect;
