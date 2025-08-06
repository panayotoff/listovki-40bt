import React from "react";
import Confetti from "react-confetti";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  return (
    <div className="results-container">
      <h2>Готово!</h2>
      <p>
        Точки: {score} / {totalQuestions}
      </p>
      <button onClick={onRestart} className="button-primary">
        Започни отначало
      </button>
      {score === totalQuestions && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
};

export default Results;
