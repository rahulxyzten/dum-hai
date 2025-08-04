"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1723579268175-d27d90cd4772?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    src: "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1642056875787-a6e372fdbb1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1731320965510-0c48cf81bd56?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW50ZWxsaWdlbnR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWluZCUyMGdhbWV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1568828668638-b1b4014d91a2?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full bg-cover"
      style={{ backgroundImage: `url(${sq.src})` }}
    />
  ));

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(
          `/quiz?sessionId=${data.sessionId}&email=${encodeURIComponent(email)}`
        );
      } else {
        alert(data.message || "Failed to start quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert(
        "Failed to start quiz. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 z-[-2] min-h-screen w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <section className="relative z-10 w-full px-8 py-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 max-w-6xl mx-auto mt-4 md:mt-16">
        <div className="space-y-6 font-mono">
          <span className="block mb-4 text-base md:text-lg text-indigo-500 font-medium">
            Dum Hai!👊🏻
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold">
            Welcome to Online Quiz💡
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6 ">
            Please enter your email address to begin the 30-minute quiz with 15
            questions.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full p-5 bg-white rounded-lg">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
                className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 hover:shadow-lg bg-gray-100"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`font-medium py-2 px-4 rounded transition-all active:scale-95 
              ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner />
                      <span className="ml-2">Starting Quiz...</span>
                    </div>
                  ) : (
                    "Start Quiz"
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>Quiz Duration: 30 minutes</p>
            <p>Total Questions: 15</p>
            <p>Auto-submit when timer expires</p>
          </div>
        </div>

        <ShuffleGrid />
      </section>
    </div>
  );
}
