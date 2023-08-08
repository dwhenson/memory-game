import React from "react";
import ReactDOM from "react-dom/client";
import GameOptionsProvider from "./components/GameOptionsProvider";
import GamePlayingProvider from "./components/GamePlayingProvider";
import App from "./components/App/App";

import "./abstracts.css";
import "./composition.css";
import "./global.css";
import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameOptionsProvider>
      <GamePlayingProvider>
        <App />
      </GamePlayingProvider>
    </GameOptionsProvider>
  </React.StrictMode>
);
