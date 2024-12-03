import mongoose from "mongoose";

export async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI is not defined");
  }
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
