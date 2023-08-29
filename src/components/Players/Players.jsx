import styles from "./Players.module.css";

function Players({ gameState, seconds }) {
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
    <ul role="list" className={styles.PlayerWrapper}>
      {gameState.length === 1 && (
        <li className={styles.singlePlayer}>
          <div className={styles.player}>
            <p>Time:</p>
            <p style={{ minWidth: "6ch", textAlign: "right" }}>
              {secondsToTime(seconds)}
            </p>
          </div>
          <div className={styles.player}>
            <p>Moves: </p>
            <p>{gameState[0].score}</p>
          </div>
        </li>
      )}
      {gameState.length > 1 &&
        gameState.map((player, index) => (
          <li
            key={index}
            className={`${styles.player} ${player.turn ? styles.current : ""}`}
          >
            Player {player.number}{" "}
            <div className={styles.score}>{gameState[index].score}</div>
          </li>
        ))}
    </ul>
  );
}

export default Players;
