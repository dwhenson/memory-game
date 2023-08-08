function Results({ gameState }) {
  /*
  TODO
  Check high score is equal for ties etc
  assign result to be winner / tied / null
  render results in order
  */

  const results = [...gameState].sort((a, b) => a.score - b.score).reverse();
  console.log(results);
  return (
    <ul>
      {results.length === 1 && (
        <li>
          Time Elapsed: {results[0].time} Moves Taken: {results[0].score}
        </li>
      )}
      {results.length > 1 &&
        results.map((player, index) => (
          <li key={index}>
            Player {player.number}, {results[index].score} Pairs
          </li>
        ))}
    </ul>
  );
}

export default Results;
