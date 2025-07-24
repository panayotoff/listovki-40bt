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
          © 2025 Христо Панайотов, за лична употреба. Въпросите са взети от{" "}
          <a
            href="https://www.marad.bg/sites/default/files/upload/documents/2019-09/Vyprosi_40BT_14012016.pdf"
            target="_blank"
          >
            Vyprosi_40BT_14012016.pdf
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
