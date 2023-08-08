import React from "react";

export const GameOptionsContext = React.createContext();

function GameOptionsProvider({ children }) {
  const defaultOptions = {
    theme: "icon",
    players: 1,
    grid: 4,
  };

  const [selectedGameOptions, setSelectedGameOptions] =
    React.useState(defaultOptions);

  return (
    <GameOptionsContext.Provider
      value={{
        selectedGameOptions,
        setSelectedGameOptions,
      }}
    >
      {children}
    </GameOptionsContext.Provider>
  );
}

export default GameOptionsProvider;
