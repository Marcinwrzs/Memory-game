import React, { useState, useEffect } from "react";
import "../styles/modal.scss";
import NewGameModal from "./NewGameModal";
import { memoryGameStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import StatisticsModal from "./StatisticsModal";
import FinishedGameModal from "./FinishedGameModal";

const GamePanel: React.FC<{
  initGame: (difficulty: "easy" | "medium" | "hard") => void;
}> = observer(({ initGame }) => {
  const [isNewGameModalOpen, setNewGameModalOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setStatsModalOpen] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [isGameOverModalOpen, setGameOverModalOpen] = useState<boolean>(false);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("easy");

  useEffect(() => {
    if (memoryGameStore.isGameOver && time > 0) {
      setTimerRunning(false);
      setGameOverModalOpen(true);
    }
  }, [memoryGameStore.isGameOver]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (!timerRunning && time !== 0) {
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  useEffect(() => {
    setMoves(memoryGameStore.moves);
  }, [memoryGameStore.moves]);

  useEffect(() => {
    if (memoryGameStore.isGameOver && time > 0) {
      setTimerRunning(false);
      const formattedTime = formatTime(time);

      const storedGames = JSON.parse(localStorage.getItem("games") || "[]");

      const newGame = {
        id: storedGames.length + 1,
        date: new Date().toLocaleString(),
        time: formattedTime,
        moves,
        difficulty: currentDifficulty,
      };

      const updatedGames = [...storedGames, newGame];
      localStorage.setItem("games", JSON.stringify(updatedGames));
    }
  }, [memoryGameStore.isGameOver]);

  const startNewGame = (difficulty: "easy" | "medium" | "hard") => {
    setTime(0);
    setMoves(0);
    setTimerRunning(true);
    setCurrentDifficulty(difficulty);
    memoryGameStore.resetMoves();
    initGame(difficulty);
    setNewGameModalOpen(false);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = String(
      Math.floor((milliseconds / 1000 / 60) % 60)
    ).padStart(2, "0");
    const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(
      2,
      "0"
    );
    const ms = String((milliseconds % 1000) / 10).padStart(2, "0");
    return `${minutes}:${seconds}:${ms}`;
  };

  return (
    <div className="game-panel">
      <button onClick={() => setStatsModalOpen(true)}>Statistics</button>

      <div className="game-panel-item">
        <div>Moves</div>
        <div>{moves}</div>
      </div>

      <div className="game-panel-item">
        <div>Time</div>
        <div>{formatTime(time)}</div>
      </div>

      <button onClick={() => setNewGameModalOpen(true)}>New Game</button>

      {isNewGameModalOpen && (
        <NewGameModal
          closeModal={() => setNewGameModalOpen(false)}
          initGame={startNewGame}
        />
      )}
      {isStatsModalOpen && (
        <StatisticsModal closeModal={() => setStatsModalOpen(false)} />
      )}
      {isGameOverModalOpen && (
        <FinishedGameModal
          moves={moves}
          time={formatTime(time)}
          onClose={() => setGameOverModalOpen(false)}
        />
      )}
    </div>
  );
});

export default GamePanel;
