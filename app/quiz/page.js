"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { decode } from "html-entities";
import Header from "../../components/Header";
import Timer from "../../components/Timer";
import QuestionNavigation from "../../components/QuestionNavigation";
import Question from "../../components/Question";
import ProgressIndicators from "../../components/ProgressIndicators";
import LoadingSpinner from "../../components/LoadingSpinner";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const email = searchParams.get("email");

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load questions on component mount
  useEffect(() => {
    if (sessionId) {
      fetchQuestions();
    } else {
      router.push("/");
    }
  }, [sessionId, router]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=15");
      const data = await response.json();

      if (data.response_code === 0) {
        const processedQuestions = data.results.map((q, index) => ({
          ...q,
          id: index,
          question: decode(q.question),
          correct_answer: decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((answer) =>
            decode(answer)
          ),
          options: [
            decode(q.correct_answer),
            ...q.incorrect_answers.map((answer) => decode(answer)),
          ].sort(() => Math.random() - 0.5),
        }));

        setQuestions(processedQuestions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to load questions. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
    setVisitedQuestions((prev) => new Set([...prev, currentQuestionIndex]));
  };

  const handleQuestionNavigation = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setCurrentQuestionIndex(questionIndex);
      setVisitedQuestions((prev) => new Set([...prev, questionIndex]));
    }
  };

  const navigateQuestion = (direction) => {
    const newIndex = currentQuestionIndex + direction;
    if (newIndex >= 0 && newIndex < questions.length) {
      handleQuestionNavigation(newIndex);
    }
  };

  const toggleMarkQuestion = () => {
    setMarkedQuestions((prev) => {
      const newMarked = new Set(prev);
      if (newMarked.has(currentQuestionIndex)) {
        newMarked.delete(currentQuestionIndex);
      } else {
        newMarked.add(currentQuestionIndex);
      }
      return newMarked;
    });
  };

  const clearAnswer = () => {
    setUserAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionIndex];
      return newAnswers;
    });
  };

  const sendQuizUpdate = async ({ action }) => {
    if (!sessionId) return;

    const payload = {
      action,
      sessionId,
      questions: action === "autosave" ? questions : undefined,
      userAnswers,
      markedQuestions: Array.from(markedQuestions),
      visitedQuestions: Array.from(visitedQuestions),
      currentQuestionIndex,
      timeRemaining,
    };

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return res;
    } catch (error) {
      console.error("Error autosaving or submitting quiz:", error);
    }
  };

  // Autosave every 1s
  useEffect(() => {
    if (!loading && sessionId) {
      const interval = setInterval(
        () => sendQuizUpdate({ action: "autosave" }),
        1000
      );
      return () => clearInterval(interval);
    }
  }, [
    loading,
    sessionId,
    questions,
    userAnswers,
    markedQuestions,
    visitedQuestions,
    currentQuestionIndex,
    timeRemaining,
  ]);

  const handleSubmit = async () => {
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = questions.length - answeredCount;

    if (unansweredCount > 0) {
      const confirmMessage = `You have ${unansweredCount} unanswered questions. Are you sure you want to submit?`;
      if (!confirm(confirmMessage)) {
        return;
      }
    } else {
      if (!confirm("Are you sure you want to submit your quiz?")) {
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await sendQuizUpdate({ action: "submit" });
      if (!response) {
        throw new Error("No response from server");
      }

      const data = await response.json();

      if (response.ok) {
        router.push(
          `/report?sessionId=${sessionId}&score=${data.score}&totalQuestions=${data.totalQuestions}&timeSpent=${data.timeSpent}`
        );
      } else {
        throw new Error(data.message || "Failed to submit quiz");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Failed to submit quiz. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = () => {
    alert("Time is up! Your quiz will be submitted automatically.");
    submitQuiz();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-lg text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Failed to load questions.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 quiz-button quiz-button-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;
  const markedCount = markedQuestions.size;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={email} />

      {/* Timer Bar */}
      <div className="bg-quiz-red text-white mt-12 md:mt-8 md:py-4">
        <div className="quiz-container">
          <Timer
            initialTime={timeRemaining}
            onTimeUp={handleTimeUp}
            setTimeRemaining={setTimeRemaining}
          />
        </div>
      </div>

      <div className="quiz-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Navigation and Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Questions</h3>
                  <QuestionNavigation
                    questions={questions.slice(0, 15)}
                    startIndex={0}
                    currentQuestionIndex={currentQuestionIndex}
                    userAnswers={userAnswers}
                    markedQuestions={markedQuestions}
                    onQuestionSelect={handleQuestionNavigation}
                  />
                </div>
              </div>

              {/* Progress Indicators */}
              <ProgressIndicators
                answered={answeredCount}
                unanswered={unansweredCount}
                marked={markedCount}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Question
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                selectedAnswer={userAnswers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
              />

              {/* Navigation Controls */}
              <div className="mt-8 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateQuestion(-1)}
                    disabled={currentQuestionIndex === 0}
                    className="quiz-button quiz-button-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => navigateQuestion(1)}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="quiz-button quiz-button-secondary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    Next →
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={toggleMarkQuestion}
                    className={`quiz-button text-sm sm:text-base ${
                      markedQuestions.has(currentQuestionIndex)
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {markedQuestions.has(currentQuestionIndex)
                      ? "📋 Un mark"
                      : "🏷️ Mark"}
                  </button>
                  <button
                    onClick={clearAnswer}
                    className="quiz-button quiz-button-secondary text-sm sm:text-base"
                    disabled={!userAnswers[currentQuestionIndex]}
                  >
                    🗑️ Clear
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`quiz-button quiz-button-primary text-sm sm:text-base ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center text-sm sm:text-base">
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Submitting...</span>
                      </div>
                    ) : (
                      <>📝 Submit Exam</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
