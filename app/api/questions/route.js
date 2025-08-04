import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../lib/models/User";
import QuizSession from "../../../lib/models/QuizSession";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create or find user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    // Create new quiz session
    const quizSession = await QuizSession.create({
      userEmail: email,
      questions: [],
      userAnswers: new Map(),
      markedQuestions: [],
      visitedQuestions: [0],
    });

    return NextResponse.json({
      sessionId: quizSession._id.toString(),
      message: "Quiz session created successfully",
    });
  } catch (error) {
    console.error("Error creating quiz session:", error);
    return NextResponse.json(
      { message: "Failed to create quiz session" },
      { status: 500 }
    );
  }
}
