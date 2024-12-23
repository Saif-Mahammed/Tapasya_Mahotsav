import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
