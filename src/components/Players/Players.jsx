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
    <ul className={styles.PlayerWrapper}>
      {gameState.length === 1 && (
        <li>
          Time: {secondsToTime(seconds)} Moves: {gameState[0].score}
        </li>
      )}
      {gameState.length > 1 &&
        gameState.map((player, index) => (
          <li key={index}>
            Player {player.number}, score: {gameState[index].score}
          </li>
        ))}
    </ul>
  );
}

export default Players;
