import FocusLock from "react-focus-lock";
import RestartButton from "../RestartButton";
import NewGameButton from "../NewGameButton";
import styles from "./Results.module.css";

function Results({ gameState, seconds, restartGame }) {
  const orderedResults = [...gameState]
    .sort((a, b) => a.score - b.score)
    .reverse();

  function secondsToTime(secondsElapsed) {
    const minutes = Math.floor((secondsElapsed % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(secondsElapsed % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
    <FocusLock className={styles.results}>
      <div className="stack">
        {orderedResults.length === 1 && (
          <>
            <h2>You did it!</h2>
            <p>Game over! Here's how you got on...</p>
            <ul role="list">
              <li className={`stack ${styles.singleResult}`}>
                <div>
                  <span>Time Elapsed:</span>
                  <span>{secondsToTime(seconds)}</span>
                </div>
                <div>
                  <span>Moves:</span> <span>{orderedResults[0].score}</span>
                </div>
              </li>
            </ul>
          </>
        )}
        {orderedResults.length > 1 && (
          <>
            {orderedResults[0].score > orderedResults[1].score ? (
              <h2>Player {orderedResults[0].number} Wins!</h2>
            ) : (
              <h2>It's a tie!</h2>
            )}
            <p>Game over! Here's the results...</p>
            <ul
              role="list"
              className="stack"
              style={{ "--bespoke-space": "var(--space-s)" }}
            >
              {orderedResults.map((player, index) => (
                <li
                  key={index}
                  className={`${styles.result} ${
                    player.winner ? styles.winner : ""
                  }`}
                >
                  <div>
                    Player {player.number} {player.winner && "(Winner)"}
                  </div>
                  <div>{orderedResults[index].score} Pairs</div>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className={styles.buttonWrapper}>
          <RestartButton />
          <NewGameButton restartGame={restartGame} />
        </div>
      </div>
    </FocusLock>
  );
}

export default Results;
