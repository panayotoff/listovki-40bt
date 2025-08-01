import React, { useState } from 'react';
import type { Question } from '../types';

interface DesktopQuizProps {
  questions: Question[];
  onFinish: (score: number) => void; // New prop
}

const DesktopQuiz: React.FC<DesktopQuizProps> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correct_answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsAnswered(false);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question was answered, call onFinish with final score
      onFinish(score); 
    }
  };

  if (!questions || questions.length === 0) {
    return <p>Няма намерени въпроси.</p>;
  }

  const answers = {
    A: currentQuestion.answer_a,
    B: currentQuestion.answer_b,
    C: currentQuestion.answer_c,
    D: currentQuestion.answer_d,
  };

  return (
    <div className="quiz-container desktop-quiz">
      <h3>Въпрос {currentQuestionIndex + 1} / {questions.length}</h3>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.question_image && (
        <img src={`./question_images/${currentQuestion.question_image}`} alt="Question illustration" className="question-image"/>
      )}
      <div className="answers-grid">
        {Object.entries(answers).map(([key, value]) => {
            const isCorrect = key === currentQuestion.correct_answer;
            const isSelected = key === selectedAnswer;
            let buttonClass = 'answer-button';
            if (isAnswered) {
                if(isCorrect) buttonClass += ' correct';
                else if (isSelected) buttonClass += ' incorrect';
            }
            return (
                <button key={key} onClick={() => handleAnswerSelect(key)} className={buttonClass} disabled={isAnswered}>
                    {value}
                </button>
            )
        })}
      </div>
      {isAnswered && (
        <button onClick={handleNextQuestion} className="button-primary">
          {currentQuestionIndex < questions.length - 1 ? 'Следващ въпрос' : 'Приключи теста'}
        </button>
      )}
    </div>
  );
};

export default DesktopQuiz;