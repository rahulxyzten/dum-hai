"use client";

import { useState, useEffect } from "react";

export default function Timer({ initialTime, onTimeUp, setTimeRemaining }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  useEffect(() => {
    setTimeRemaining(time);
  }, [time, setTimeRemaining]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")} : ${m
      .toString()
      .padStart(2, "0")} : ${s.toString().padStart(2, "0")}`;
  };

  const timeColor =
    time <= 300
      ? "text-red-200"
      : time <= 600
      ? "text-yellow-200"
      : "text-black";

  return (
    <div className="text-center">
      <div className="text-4xl md:text-6xl font-bold mb-2">
        <span className={timeColor}>{formatTime(time)}</span>
      </div>
    </div>
  );
}
