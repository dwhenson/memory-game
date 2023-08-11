function Results({ gameState, seconds }) {
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
    <div>
      {orderedResults.length === 1 && (
        <>
          <h2>You did it!</h2>
          <p>Game over! Here's how you got on...</p>
          <ul>
            <li>
              Time Elapsed: {secondsToTime(seconds)} Moves Taken:{" "}
              {orderedResults[0].score}
            </li>
          </ul>
        </>
      )}
      {orderedResults.length > 1 && (
        <>
          {orderedResults[0].score > orderedResults[1].score ? (
            <h2>Player {orderedResults[0].number} wins!</h2>
          ) : (
            <h2>It's a tie!</h2>
          )}
          <p>Game over! Here's the results...</p>
          <ul>
            {orderedResults.map((player, index) => (
              <li key={index}>
                Player {player.number}, {orderedResults[index].score} Pairs
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Results;
