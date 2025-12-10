import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("❌ MONGO_URI not set in .env");
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};