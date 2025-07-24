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
            <SearchResultsList questions={filteredQuestions} />
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
          © {(new Date().getFullYear())} Христо Панайотов, за лична употреба.
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
