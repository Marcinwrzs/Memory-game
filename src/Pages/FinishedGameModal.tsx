import React from "react";
import "../styles/modal.scss";

const FinishedGameModal: React.FC<{
  moves: number;
  time: string;
  onClose: () => void;
}> = ({ moves, time, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>Congratulations!</h2>
        <p>
          You have finished game in a {moves} moves in a time {time}.
        </p>
      </div>
    </div>
  );
};

export default FinishedGameModal;
