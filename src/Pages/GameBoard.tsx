import Card from "../components/Card";
import { memoryGameStore } from "../stores/store";
import { observer } from "mobx-react-lite";

const GameBoard: React.FC = observer(() => {
  return (
    <div className="game-board">
      {memoryGameStore.cards.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  );
});

export default GameBoard;
