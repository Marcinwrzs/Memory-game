import React from "react";
import StatisticsTable from "../components/StatisticsTable";

const StatisticsModal: React.FC<{
  closeModal: (e: React.MouseEvent) => void;
}> = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal statistics-modal">
        <h2>Statistics</h2>
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsModal;
