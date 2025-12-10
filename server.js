import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Config & Models
import { connectDB } from "./backend/config/db.js"; 
import { User } from "./backend/models/User.js";

// Routes
import developerRoutes from "./backend/routes/developerRoutes.js";
import designerRoutes from "./backend/routes/designerRoutes.js";
import creatorRoutes from "./backend/routes/creatorRoutes.js";
import bloggerRoutes from "./backend/routes/bloggerRoutes.js";
import authRoutes from "./backend/routes/authRoutes.js";
import profileRoutes from "./backend/routes/profileRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/developer', developerRoutes);
app.use('/api/designer', designerRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/blogger', bloggerRoutes);
app.use('/api/profile', profileRoutes);

// --- SEED ADMIN FUNCTION ---
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      console.log("🌱 No admin found. Seeding default admin...");
      await User.create({
        username: process.env.ADMIN_USERNAME || "admin",
        password: process.env.ADMIN_PASSWORD || "admin123"
      });
      console.log(`✅ Default Admin created: '${process.env.ADMIN_USERNAME || "admin"}'`);
    }
  } catch (error) {
    // Only log error if not a connection closed error (common in tests)
    if (error.name !== 'MongoServerClosedError') {
      console.error("❌ Seeding error:", error);
    }
  }
};

// --- SERVING FRONTEND ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "frontend", "dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

if (process.env.NODE_ENV !== 'test') {
  
  // 1. Connect to DB
  connectDB();

  // 2. Listen for connection open to run seeder
  mongoose.connection.once('open', () => {
    console.log('🔌 DB Connection Verified. Checking for Admin...');
    seedAdmin();
  });

  // 3. Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for testing
export default app;