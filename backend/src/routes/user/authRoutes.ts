import express, { Request, Response } from "express";
import { registerUser } from "../../controllers/user/registerController";
import { loginUser } from "../../controllers/user/loginController";
import { body } from "express-validator";
import authMiddleware from "../../middleware/authMiddleware";
import asyncHandler from "express-async-handler";
import { User } from "../../models/user/User";

// 🛠️ Anpassa Request-objektet så att TypeScript förstår att `req.user` finns
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const router = express.Router();

// ✅ Hämta användardata (skyddad route)
router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || !req.user.id) {
      return void res.status(401).json({ message: "Not authorized" });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return void res.status(404).json({ message: "User not found" });

      return void res.json(user);
    } catch (error) {
      return void res.status(500).json({ message: "Server error" });
    }
  })
);


// ✅ Registrera ny användare
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Namn krävs"),
    body("email").isEmail().withMessage("Ogiltig e-post"),
    body("password").isLength({ min: 6 }).withMessage("Lösenord måste vara minst 6 tecken"),
  ],
  asyncHandler(registerUser) // Wrappa controller med `asyncHandler` för att fånga asynkrona fel
);

// ✅ Logga in användare
router.post("/login", asyncHandler(async (req, res) => {
  await loginUser(req, res); // 🛠️ Lägg till `await` och anropa loginUser direkt
}));

export default router;
