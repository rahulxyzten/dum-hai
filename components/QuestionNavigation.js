"use client";

export default function QuestionNavigation({
  questions,
  startIndex = 0,
  currentQuestionIndex,
  userAnswers,
  markedQuestions,
  onQuestionSelect,
}) {
  const getQuestionStatus = (index) => {
    const actualIndex = startIndex + index;
    const isAnswered = userAnswers.hasOwnProperty(actualIndex);
    const isMarked = markedQuestions.has(actualIndex);
    const isCurrent = currentQuestionIndex === actualIndex;

    if (isCurrent) return "current";
    if (isAnswered && isMarked) return "answered-marked";
    if (isAnswered) return "answered";
    if (isMarked) return "marked";
    return "unanswered";
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {questions.map((_, index) => {
        const actualIndex = startIndex + index;
        const status = getQuestionStatus(index);

        return (
          <button
            key={actualIndex}
            onClick={() => onQuestionSelect(actualIndex)}
            className={`question-circle ${status}`}
          >
            {actualIndex + 1}
          </button>
        );
      })}
    </div>
  );
}
