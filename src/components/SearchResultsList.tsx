import React from 'react';
import type { Question } from '../types';

interface SearchResultsListProps {
  questions: Question[];
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({ questions }) => {
  if (questions.length === 0) {
    return <p>Няма нищо намерено!</p>;
  }

  return (
    <div className="search-results-container">
      {questions.map((q) => (
        <div key={q.question_number} className="search-result-card">
          <h4>{q.question_number}. {q.question}</h4>
          {q.question_image && (
             <img src={`./question_images/${q.question_image}`} alt="Illustration" className="question-image-small" />
          )}
          <ul>
            <li className={q.correct_answer === 'A' ? 'highlight-answer' : ''}>A: {q.answer_a}</li>
            <li className={q.correct_answer === 'B' ? 'highlight-answer' : ''}>B: {q.answer_b}</li>
            <li className={q.correct_answer === 'C' ? 'highlight-answer' : ''}>C: {q.answer_c}</li>
            <li className={q.correct_answer === 'D' ? 'highlight-answer' : ''}>D: {q.answer_d}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;