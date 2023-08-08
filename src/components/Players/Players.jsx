function Players({ gameState }) {
  return (
    <ul>
      {gameState.length === 1 && (
        <li>
          Time: {gameState[0].time} Moves: {gameState[0].score}
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
