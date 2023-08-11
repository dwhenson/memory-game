import RestartButton from "../RestartButton";
import NewGameButton from "../NewGameButton";

function Header({ initialBoard, setBoard }) {
  return (
    <div>
      <img src="" alt="logo" />
      <div>
        <RestartButton />
        <NewGameButton initialBoard={initialBoard} setBoard={setBoard} />
      </div>
    </div>
  );
}

export default Header;
