import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import QuizSession from "../../../lib/models/QuizSession";

export async function POST(request) {
  try {
    const {
      action,
      sessionId,
      questions,
      userAnswers,
      markedQuestions,
      visitedQuestions,
      currentQuestionIndex,
      timeRemaining,
    } = await request.json();

    await dbConnect();
    const session = await QuizSession.findById(sessionId);
    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    // Always update these fields
    session.userAnswers = userAnswers;
    session.markedQuestions = markedQuestions;
    session.visitedQuestions = visitedQuestions;
    session.currentQuestionIndex = currentQuestionIndex;
    session.timeRemaining = timeRemaining;

    if (action === "autosave") {
      session.questions = questions;
      await session.save();
      return NextResponse.json({ message: "Progress saved" });
    }

    if (action === "submit") {
      let score = 0;
      const results = session.questions.map((question, index) => {
        const answer = userAnswers[index] ?? null;
        const isCorrect = answer === question.correct_answer;
        if (isCorrect) score++;
        return { ...question, user_answer: answer, is_correct: isCorrect };
      });

      session.score = score;
      session.isCompleted = true;
      session.endTime = new Date();
      await session.save();

      const timeSpent = Math.round(
        (session.endTime - session.startTime) / 1000
      );
      return NextResponse.json({
        score,
        totalQuestions: session.questions.length,
        results,
        timeSpent,
      });
    }
  } catch (error) {
    console.error("Error autosaving or submitting quiz:", error);
    return NextResponse.json(
      { message: "Failed to autosave or submit quiz" },
      { status: 500 }
    );
  }
}
