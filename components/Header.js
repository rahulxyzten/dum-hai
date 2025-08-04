"use client";

export default function Header({ email }) {
  return (
    <header className="absolute inset-x-0 top-0 z-10 bg-transparent">
      <div className="quiz-container py-4">
        <div className="flex justify-end items-center">
          <span className="text-sm text-gray-800">👤 {email}</span>
        </div>
      </div>
    </header>
  );
}
