import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    question: { type: String, required: true },
    correct_answer: { type: String, required: true },
    incorrect_answers: { type: [String], required: true },
    id: { type: Number, required: true },
    options: { type: [String], required: true },
  },
  { _id: false }
);

const QuizSessionSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    questions: { type: [QuestionSchema], required: true },
    userAnswers: { type: Map, of: String, default: {} },
    markedQuestions: { type: [Number], default: [] },
    visitedQuestions: { type: [Number], default: [] },
    currentQuestionIndex: { type: Number, default: 0 },
    startTime: { type: Date, default: Date.now },
    endTime: Date,
    timeRemaining: { type: Number, default: 1800 },
    score: Number,
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.QuizSession ||
  mongoose.model("QuizSession", QuizSessionSchema);
