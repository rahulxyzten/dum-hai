"use client";

import { useState, useEffect, Suspense } from "react";
import { decode } from "html-entities";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../../components/LoadingSpinner";

function ReportContent() {
  const router = useRouter();
  const params = useSearchParams();

  const sessionId = params.get("sessionId");
  const score = Number(params.get("score") ?? 0);
  const totalQuestions = Number(params.get("totalQuestions") ?? 0);
  const timeSpent = Number(params.get("timeSpent") ?? 0);

  const [detailedResults, setDetailedResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }
    fetchDetailedResults();
  }, [sessionId, router]);

  const fetchDetailedResults = async () => {
    try {
      const response = await fetch(`/api/session/${sessionId}`);
      if (response.ok) {
        const session = await response.json();

        const results = session.questions.map((question, index) => {
          const userAnswer = session.userAnswers?.[index.toString()] || null;
          const isCorrect = userAnswer === question.correct_answer;

          return {
            id: index + 1,
            question: question.question,
            category: question.category,
            difficulty: question.difficulty,
            options: question.options,
            correctAnswer: question.correct_answer,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
          };
        });

        setDetailedResults(results);
      }
    } catch (error) {
      console.error("Error fetching detailed results:", error);
    } finally {
      setLoading(false);
    }
  };

  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const avgTimePerQuestion =
    totalQuestions > 0 ? Math.round(timeSpent / totalQuestions) : 0;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getGrade = (pct) => {
    if (pct >= 90) return { grade: "A+", color: "text-green-600" };
    if (pct >= 80) return { grade: "A", color: "text-green-500" };
    if (pct >= 70) return { grade: "B+", color: "text-blue-500" };
    if (pct >= 60) return { grade: "B", color: "text-blue-400" };
    if (pct >= 50) return { grade: "C", color: "text-yellow-500" };
    return { grade: "F", color: "text-red-500" };
  };

  const { grade, color } = getGrade(percentage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="absolute top-0 z-[-2] min-h-screen w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="relative z-10 min-h-screen py-8">
        <div className="quiz-container max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
            <h1 className="text-3xl font-bold underline text-gray-900 mb-4">
              Quiz Results
            </h1>
            <span className="block font-mono mb-4 text-base md:text-lg text-indigo-500 font-medium">
              Dum Hai!👊🏻
            </span>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-quiz-red mb-2">
                {score}
              </div>
              <div className="text-sm text-gray-600">Correct Answers ✅</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-gray-400 mb-2">
                {totalQuestions - score}
              </div>
              <div className="text-sm text-gray-600">Incorrect Answers ❌</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${color}`}>
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">Percentage 📊</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className={`text-3xl font-bold mb-2 ${color}`}>{grade}</div>
              <div className="text-sm text-gray-600">Grade 🎓</div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Performance Analysis 📈:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {score}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600">
                  Questions Answered Correctly ✔️
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formatTime(timeSpent)}
                </div>
                <div className="text-sm text-gray-600">Time Spent ⏱️</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {avgTimePerQuestion}s
                </div>
                <div className="text-sm text-gray-600">
                  Avg. Time per Question ⏳
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Overall Performance 🚀</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    percentage >= 70
                      ? "bg-green-500"
                      : percentage >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Detailed Question Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Question-by-Question Analysis 🧐:
            </h2>

            <div className="space-y-8">
              {detailedResults.map((result, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  {/* Question Header */}
                  <div className="mb-4">
                    {/* Header row: Question ID + tags (tags only visible on md+) */}
                    <div className="md:flex md:justify-between md:items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Question {result.id}
                      </h3>
                      {/* tags for md and up */}
                      <div className="hidden md:flex space-x-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {decode(result.category)}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded capitalize">
                          {decode(result.difficulty)}
                        </span>
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="text-gray-700 mb-2">{result.question}</p>

                    {/* tags for mobile only */}
                    <div className="flex space-x-2 md:hidden">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {decode(result.category)}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded capitalize">
                        {decode(result.difficulty)}
                      </span>
                    </div>
                  </div>

                  {/* Answer Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {result.options.map((option, optionIndex) => {
                      const isUserAnswer = option === result.userAnswer;
                      const isCorrectAnswer = option === result.correctAnswer;

                      let optionClass = "p-3 rounded-lg border-2 ";

                      if (isCorrectAnswer && isUserAnswer) {
                        // User selected correct answer
                        optionClass +=
                          "bg-green-100 border-green-500 text-green-800";
                      } else if (isCorrectAnswer && !isUserAnswer) {
                        // Correct answer (user didn't select)
                        optionClass +=
                          "bg-green-100 border-green-500 text-green-800";
                      } else if (isUserAnswer && !isCorrectAnswer) {
                        // User selected wrong answer
                        optionClass += "bg-red-100 border-red-500 text-red-800";
                      } else {
                        // Other options
                        optionClass +=
                          "bg-gray-50 border-gray-200 text-gray-700";
                      }

                      return (
                        <div key={optionIndex} className={optionClass}>
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            <div className="flex space-x-2">
                              {isUserAnswer && (
                                <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded">
                                  Your Answer
                                </span>
                              )}
                              {isCorrectAnswer && (
                                <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded">
                                  Correct
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Result Status */}
                  <div className="mt-4">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                        result.isCorrect
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {result.isCorrect ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          PASS
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          WRONG
                        </>
                      )}
                    </div>

                    {!result.isCorrect && !result.userAnswer && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Your answer:</span> No
                        answer selected
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 md:justify-center font-mono text-center">
            <button
              onClick={() => router.push("/")}
              className="quiz-button quiz-button-primary w-auto mx-auto md:mx-0"
            >
              Take Another Quiz 🔄
            </button>
            <button
              onClick={() => window.print()}
              className="quiz-button quiz-button-secondary w-auto mx-auto md:mx-0"
            >
              Print Results 🖨️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="large" />
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
