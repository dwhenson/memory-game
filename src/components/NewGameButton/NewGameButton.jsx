import Button from "../Button";

function NewGameButton({ restartGame }) {
  return (
    <Button
      action={restartGame}
      style={{
        "--bg": "var(--clr-primary-100)",
        "--fg": "var(--clr-primary-400)",
      }}
    >
      New Game
    </Button>
  );
}

export default NewGameButton;
