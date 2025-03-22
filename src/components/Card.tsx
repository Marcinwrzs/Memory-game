import { observer } from "mobx-react-lite";
import { memoryGameStore } from "../stores/store";

interface Props {
  data: {
    id: number;
    image: string;
    label: string;
    hidden: boolean;
  };
}

const Card: React.FC<Props> = observer(({ data }) => {
  return (
    <div
      className={`card ${!data.hidden ? "flipped" : ""}`}
      onClick={() => memoryGameStore.flipCard(data.id)}
    >
      <div className="card-inner">
        <div className="card-back">❔</div>
        <div className="card-front">
          <img src={`./${data.image}`} />
        </div>
      </div>
    </div>
  );
});

export default Card;
