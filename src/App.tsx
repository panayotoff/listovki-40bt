import React, { useState, useEffect } from "react";
import allQuestions from "./data/questions.json";
import type { Question } from "./types";
// import { useMediaQuery } from "./hooks/useMediaQuery";
import { shuffleArray } from "./utils/arrayUtils"; // Import the shuffle utility

// Import Components
import DesktopQuiz from "./components/DesktopQuiz";
import MobileQuiz from "./components/MobileQuiz";
import SearchResultsList from "./components/SearchResultsList";
import Results from "./components/Results";

import "./index.css";

// Define the application modes
type AppMode = "search" | "quiz" | "results";
const QUIZ_LENGTH = 60;

function App() {
  const [mode, setMode] = useState<AppMode>("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAnswers, setShowAnswers] = useState(true);
  const toggleAnswers = () => setShowAnswers((prev) => !prev);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(
    allQuestions.map((q) => ({
      ...q,
      correct_answer: q.correct_answer as "A" | "B" | "C" | "D",
    }))
  );
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);

  const isMobile = false; // useMediaQuery("(max-width: 768px)");

  // Effect for handling search filtering
  useEffect(() => {
    const results = allQuestions.filter(
      (question) =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer_a.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer_b.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer_c.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.answer_d.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(
      results.map((q) => ({
        ...q,
        correct_answer: q.correct_answer as "A" | "B" | "C" | "D",
      }))
    );
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // If user starts typing, always switch to search mode
    if (mode !== "search") {
      setMode("search");
    }
  };

  const startQuiz = () => {
    const randomQuestions = shuffleArray(allQuestions).slice(0, QUIZ_LENGTH);
    setQuizQuestions(
      randomQuestions.map((q) => ({
        ...q,
        correct_answer: q.correct_answer as "A" | "B" | "C" | "D",
      }))
    );
    setMode("quiz");
  };

  const handleQuizFinish = (score: number) => {
    setFinalScore(score);
    setMode("results");
  };

  const handleRestart = () => {
    setSearchTerm(""); // Clear search
    setFilteredQuestions(
      allQuestions.map((q) => ({
        ...q,
        correct_answer: q.correct_answer as "A" | "B" | "C" | "D",
      }))
    ); // Reset filter
    setMode("search"); // Go back to search mode
  };

  const renderContent = () => {
    switch (mode) {
      case "quiz":
        return isMobile ? (
          <MobileQuiz questions={quizQuestions} onFinish={handleQuizFinish} />
        ) : (
          <DesktopQuiz questions={quizQuestions} onFinish={handleQuizFinish} />
        );
      case "results":
        return <Results score={finalScore} totalQuestions={quizQuestions.length} onRestart={handleRestart} />;
      case "search":
      default:
        return (
          <>
            <div className="start-quiz-container">
              <button onClick={startQuiz} className="button-primary start-button">
                Започни тест със случайни ({QUIZ_LENGTH} въпроса)
              </button>
            </div>
            <div className="toggle-answers-container">
              <button
                onClick={toggleAnswers}
                className="button-secondary toggle-answers-button"
                title={showAnswers ? "Скрий отговорите" : "Покажи отговорите"}
              >
                {showAnswers ? (
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentcolor" fill-rule="nonzero">
                      <path d="M23.725 12.05c-.625-.825-2.15-2.55-4.45-3.95L17.65 9.725c1.6.875 2.8 1.975 3.575 2.8-1.175 1.25-3.325 3.125-6.375 3.9a4.817 4.817 0 0 0 1.975-3.9c0-.6-.1-1.175-.3-1.7L8.75 18.6c1 .25 2.1.375 3.25.375 6.55 0 10.55-4.5 11.725-6 .2-.25.2-.65 0-.925ZM21.375 2.325c-.425-.425-1.125-.425-1.575 0L15.575 6.55c-1.1-.3-2.3-.475-3.6-.475-6.55 0-10.55 4.5-11.725 6a.753.753 0 0 0 0 .95c.65.85 2.25 2.7 4.725 4.1l-3.5 3.5c-.425.425-.425 1.125 0 1.575.225.225.5.325.775.325s.575-.1.775-.325l18.3-18.3c.5-.45.5-1.15.05-1.575ZM2.8 12.525c1.175-1.25 3.325-3.125 6.375-3.9a4.817 4.817 0 0 0-1.975 3.9c0 .7.15 1.375.425 2l-.95.95a13.758 13.758 0 0 1-3.875-2.95Z" />
                    </g>
                  </svg>
                ) : (
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentcolor" fill-rule="nonzero">
                      <path d="M23.725 12.025c-1.15-1.5-5.175-6-11.725-6s-10.55 4.5-11.725 6a.753.753 0 0 0 0 .95c1.15 1.5 5.175 6 11.725 6s10.55-4.5 11.725-6c.2-.275.2-.675 0-.95ZM12 17.325A4.812 4.812 0 0 1 7.175 12.5 4.812 4.812 0 0 1 12 7.675a4.812 4.812 0 0 1 4.825 4.825A4.812 4.812 0 0 1 12 17.325Z" />
                      <path d="M12 9.4c-.275 0-.525.025-.775.1.375.3.6.725.6 1.25 0 .875-.7 1.575-1.575 1.575-.5 0-.95-.225-1.25-.6-.075.25-.1.525-.1.775a3.1 3.1 0 0 0 3.1 3.1c1.7 0 3.1-1.4 3.1-3.1 0-1.7-1.4-3.1-3.1-3.1Z" />
                    </g>
                  </svg>
                )}
              </button>
            </div>
            <SearchResultsList showAnswers={showAnswers} questions={filteredQuestions} />
          </>
        );
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Листовки 40бт</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Търси въпроси..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </header>
      <main>{renderContent()}</main>
      <footer>
        <p>
          © {new Date().getFullYear()} Христо Панайотов, за лична употреба.
          <a
            href="https://www.marad.bg/sites/default/files/upload/documents/2019-09/Vyprosi_40BT_14012016.pdf"
            target="_blank"
          >
            Vyprosi_40BT_14012016.pdf
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Interface / External_Link">
                <path
                  d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </a>
          <a href="https://github.com/panayotoff/listovki-40bt">
            GitHub
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Interface / External_Link">
                <path
                  d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
