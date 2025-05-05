import express from "express";
import authMiddleware from "../../middleware/authMiddleware"; 
import { getUserProfile, getUserEmail } from "../../controllers/user/userController"; 

const router = express.Router();

// Route to get the user's profile, requires authentication
router.get("/", authMiddleware, getUserProfile);

// Route to get the user's profile with a specific '/profile' path, requires authentication
router.get("/profile", authMiddleware, getUserProfile);

// Route to get the user's email, requires authentication
router.get("/email", authMiddleware, getUserEmail);

export { router };  