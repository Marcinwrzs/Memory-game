import React from "react";
import { FaStar } from "react-icons/fa6";

const NewGameModal: React.FC<{
  initGame: (difficulty: "easy" | "medium" | "hard") => void;
  closeModal: (e: React.MouseEvent) => void;
}> = ({ initGame, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Select difficulty</h2>
        <div className="button-container">
          <button
            onClick={() => {
              initGame("easy");
            }}
          >
            <span className="stars">
              <FaStar />
            </span>
            Easy
          </button>
          <button
            onClick={() => {
              initGame("medium");
            }}
          >
            <span className="stars">
              <FaStar /> <FaStar />
            </span>
            Medium
          </button>
          <button
            onClick={() => {
              initGame("hard");
            }}
          >
            <span className="stars">
              <FaStar /> <FaStar /> <FaStar />
            </span>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGameModal;
