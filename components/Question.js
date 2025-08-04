"use client";

import { decode } from "html-entities";

export default function Question({
  question,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
}) {
  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="inline-block w-max bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          <span className="hidden md:inline">Question</span>
          <span className="md:hidden">Q.</span> {questionIndex + 1}
        </h3>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded truncate-responsive">
            {decode(question.category)}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded capitalize">
            {decode(question.difficulty)}
          </span>
        </div>
      </div>

      {/* Question Text */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-lg leading-relaxed text-gray-900">
          {question.question}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === option
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => onAnswerSelect(option)}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selectedAnswer === option
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300"
                }`}
              >
                {selectedAnswer === option && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-900">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
