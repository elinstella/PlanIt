import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/user/authRoutes";
import { router as userRoutes } from "./routes/user/userRoutes";
import { emailRoutes } from "./routes/task/emailRoutes";
import profileRoutes from "./routes/user/profileRoutes"; // Kontrollera att denna import är rätt
import taskRoutes from "./routes/task/taskRoutes";

import path from "path";

// 🚀 Försök ladda .env explicit
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔍 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🔍 EMAIL_PASS:", process.env.EMAIL_PASS ? "**** (Lösenord dolt)" : "❌ MISSING!");



console.log("✅ Använd JWT_SECRET:", process.env.JWT_SECRET);


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes); // Använd default import här
// Använd rätt route för API-anrop
app.use("/api", emailRoutes); // Detta gör att `/api/send-email` fungerar
// Starta servern
app.use("/api/user", userRoutes); // Viktig koppling!
app.use("/api/auth", authRoutes); // 👈 Här läggs `/api/` till
app.use("/api/todos", taskRoutes);


// ✅ Använd rätt route-prefix
app.use("/api/profile", profileRoutes);


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Ansluten till MongoDB");
    app.listen(PORT, () => console.log(`🚀 Servern körs på http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB-fel:", err));
