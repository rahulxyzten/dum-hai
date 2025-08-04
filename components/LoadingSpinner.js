"use client";

export default function LoadingSpinner({ size = "small" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-quiz-red ${sizeClasses[size]}`}
    ></div>
  );
}
