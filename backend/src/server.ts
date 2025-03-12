import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/user/authRoutes";
import { router as userRoutes } from "./routes/user/userRoutes";
import { emailRoutes } from "./routes/task/emailRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes); // Använd default import här
// Använd rätt route för API-anrop
app.use("/api", emailRoutes); // Detta gör att `/api/send-email` fungerar
// Starta servern
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Ansluten till MongoDB");
    app.listen(PORT, () => console.log(`🚀 Servern körs på http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB-fel:", err));
