import express from "express";
import authMiddleware from "../../middleware/authMiddleware"; // ✅ Default import
import { getUserProfile, getUserEmail } from "../../controllers/user/userController";

const router = express.Router();

// 🛠 Lägg till denna för att hantera `/api/user`
router.get("/", authMiddleware, getUserProfile);

// Protect these routes with authMiddleware
router.get("/profile", authMiddleware, getUserProfile);
router.get("/email", authMiddleware, getUserEmail);

export { router };
