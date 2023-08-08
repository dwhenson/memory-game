import React from "react";

export const GamePlayingContext = React.createContext();

function GamePlayingProvider({ children }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <GamePlayingContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </GamePlayingContext.Provider>
  );
}

export default GamePlayingProvider;
