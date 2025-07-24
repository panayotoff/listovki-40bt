import React, { useState } from "react";
import type { Question } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";

// @ts-expect-error: swiper/css has no TypeScript definitions
import "swiper/css";
// @ts-expect-error: swiper/css/navigation has no TypeScript definitions
import "swiper/css/navigation";

interface MobileQuizProps {
  questions: Question[];
  onFinish: (score: number) => void; // New prop
}

const MobileQuiz: React.FC<MobileQuizProps> = ({ questions, onFinish }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerSelect = (questionNumber: string, selectedAnswer: string) => {
    if (answers[questionNumber]) return;
    setAnswers((prev) => ({ ...prev, [questionNumber]: selectedAnswer }));
  };

  const handleFinishClick = () => {
    let finalScore = 0;
    questions.forEach((q) => {
      if (answers[q.question_number] === q.correct_answer) {
        finalScore++;
      }
    });
    onFinish(finalScore);
  };

  if (!questions || questions.length === 0) {
    return <p>No questions available for the quiz.</p>;
  }

  return (
    <div className="quiz-container mobile-quiz">
      <Swiper spaceBetween={50} slidesPerView={1} className="mySwiper">
        {questions.map((question) => {
          const isAnswered = !!answers[question.question_number];
          const questionAnswers = {
            A: question.answer_a,
            B: question.answer_b,
            C: question.answer_c,
            D: question.answer_d,
          };
          return (
            <SwiperSlide key={question.question_number} className="flashcard">
              <h4>
                {question.question_number}. {question.question}
              </h4>
              {question.question_image && (
                <img src={`./question_images/${question.question_image}`} alt="Illustration" className="question-image" />
              )}
              <div className="answers-grid">
                {Object.entries(questionAnswers).map(([key, value]) => {
                  const isCorrect = key === question.correct_answer;
                  const isSelected = key === answers[question.question_number];
                  let buttonClass = "answer-button";
                  if (isAnswered) {
                    if (isCorrect) buttonClass += " correct";
                    else if (isSelected) buttonClass += " incorrect";
                  }
                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerSelect(question.question_number, key)}
                      className={buttonClass}
                      disabled={isAnswered}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button onClick={handleFinishClick} className="button-primary finish-mobile-button">
        Завърши теста и прегледай резултата
      </button>
    </div>
  );
};

export default MobileQuiz;
