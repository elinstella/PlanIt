import express from "express";
import { getUserProfile } from "../../controllers/user/userController";
import authMiddleware from "../../middleware/authMiddleware";

const router = express.Router();

// Skydda denna route med authMiddleware
router.get("/profile", authMiddleware, getUserProfile);

export { router }; // Named export
