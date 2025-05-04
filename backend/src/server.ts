import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/user/authRoutes";
import { router as userRoutes } from "./routes/user/userRoutes";
import { emailRoutes } from "./routes/task/emailRoutes";
import profileRoutes from "./routes/user/profileRoutes"; 
import taskRoutes from "./routes/task/taskRoutes";
import categoryRoutes from "./routes/task/categoryRoutes";
import path from "path";


dotenv.config({ path: path.resolve(__dirname, "../.env") });


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes); 
app.use("/api", emailRoutes); 
app.use("/api/user", userRoutes); 
app.use("/api/auth", authRoutes); 
app.use("/api/todos", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/profile", profileRoutes);


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Ansluten till MongoDB");
    app.listen(PORT, () => console.log(`🚀 Servern körs på http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB-fel:", err));
