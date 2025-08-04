import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let isConnected = false;

async function dbConnect() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    isConnected = true;
    return conn;
  } catch (e) {
    console.error("MongoDB connection error:", e);
    throw e;
  }
}

export default dbConnect;
