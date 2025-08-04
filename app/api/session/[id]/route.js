import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import QuizSession from "../../../../lib/models/QuizSession";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await dbConnect();
    const session = await QuizSession.findById(id).lean();

    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { message: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
