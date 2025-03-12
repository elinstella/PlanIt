import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { getUserProfile, getUserEmail } from "../../controllers/user/userController";
import { updateEmail } from "../../controllers/user/updateEmailController";

const router = express.Router();

// Skydda dessa routes med authMiddleware
router.get("/profile", authMiddleware, getUserProfile);
router.get("/email", authMiddleware, getUserEmail);

// Lägg till async handler och använd res direkt för att undvika Promise<Response>
router.put("/update-email", authMiddleware, async (req, res) => {
  try {
    await updateEmail(req, res); // Vänta på att updateEmail ska slutföras
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export { router };
