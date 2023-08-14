import React from "react";
import Button from "../Button";
import { GameOptionsContext } from "../GameOptionsProvider";
import { OptionsSelectedContext } from "../OptionsSelectedProvider";
import { allGameOptions } from "../../data/options";
import capitalize from "../../utils/capitalize";
import styles from "./GameOptionsSelect.module.css";

function GameOptionsSelect() {
  const { selectedGameOptions, setSelectedGameOptions } =
    React.useContext(GameOptionsContext);
  const { setHasSelected } = React.useContext(OptionsSelectedContext);

  return (
    <form className={`stack ${styles.form}`}>
      {allGameOptions.map((option) =>
        Object.entries(option).map(([title, values], optionIndex) => (
          <fieldset
            key={`${title}-${optionIndex}`}
            className={`stack ${styles.fieldset}`}
            style={{
              "--bespoke-space": "var(--space-m)",
            }}
          >
            <legend
              style={{
                color: "var(--clr-primary-400)",
              }}
            >
              Select {title}
            </legend>
            <div
              className={styles.inputWrapperOuter}
              style={{
                "--bespoke-space": "var(--space-xs)",
              }}
            >
              {values.map((value, valueIndex) => (
                <div
                  key={`${title}-${valueIndex}`}
                  className={styles.inputWrapperInner}
                >
                  <input
                    type="radio"
                    name={title}
                    id={value}
                    className={styles.input}
                    value={value}
                    checked={selectedGameOptions[title] == value}
                    onChange={(event) => {
                      setSelectedGameOptions({
                        ...selectedGameOptions,
                        [title]: event.target.id,
                      });
                    }}
                  />

                  <label htmlFor={value} className={styles.label}>
                    {title === "theme"
                      ? `${capitalize(value)}s`
                      : title === "grid"
                      ? `${value}x${value}`
                      : value}
                  </label>
                </div>
              ))}
            </div>
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
