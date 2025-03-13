import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Import routes
import authRoutes from "./routes/user/authRoutes";
import { router as userRoutes } from "./routes/user/userRoutes";
import { emailRoutes } from "./routes/task/emailRoutes";
import profileRoutes from "./routes/user/profileRoutes";

// Load environment variables explicitly
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/profile", profileRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
