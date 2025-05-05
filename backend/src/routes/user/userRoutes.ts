import express from "express";
import authMiddleware from "../../middleware/authMiddleware"; 
import { getUserProfile, getUserEmail } from "../../controllers/user/userController";

const router = express.Router();

router.get("/", authMiddleware, getUserProfile);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/email", authMiddleware, getUserEmail);

export { router };
