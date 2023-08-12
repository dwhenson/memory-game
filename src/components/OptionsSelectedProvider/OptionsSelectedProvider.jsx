import React from "react";

export const OptionsSelectedContext = React.createContext();

function GamePlayingProvider({ children }) {
  const [hasSelected, setHasSelected] = React.useState(false);

  return (
    <OptionsSelectedContext.Provider
      value={{
        hasSelected,
        setHasSelected,
      }}
    >
      {children}
    </OptionsSelectedContext.Provider>
  );
}

export default GamePlayingProvider;
