import express from "express";
import authMiddleware from "../../middleware/authMiddleware"; 
import { getUserProfile, getUserEmail } from "../../controllers/user/userController";

const router = express.Router();

// ✅ Get user profile (protected route)
router.get("/", authMiddleware, getUserProfile);
router.get("/profile", authMiddleware, getUserProfile);

// ✅ Get user email (protected route)
router.get("/email", authMiddleware, getUserEmail);

export { router };
