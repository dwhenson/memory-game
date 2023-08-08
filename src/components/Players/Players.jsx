function Players({ gameState }) {
  return (
    <ul>
      {gameState.length === 1 && (
        <li>
          score: {gameState[0].score} Time: {gameState[0].time}
        </li>
      )}
      {gameState.length > 1 &&
        gameState.map((_, index) => (
          <li key={index}>
            Player {index + 1}, score: {gameState[index].score}
          </li>
        ))}
    </ul>
  );
}

export default Players;
