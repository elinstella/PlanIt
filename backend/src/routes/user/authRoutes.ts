import express, { Request, Response } from "express";
import { registerUser, verifyEmailCode } from "../../controllers/user/registerController";
import { loginUser } from "../../controllers/user/loginController";
import { body } from "express-validator";
import authMiddleware from "../../middleware/authMiddleware";
import asyncHandler from "express-async-handler";
import { User } from "../../models/user/User";
import { forgotPassword } from "../../controllers/user/forgotPasswordController";
import { resetPassword } from "../../controllers/user/resetPasswordController";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const router = express.Router();

// ✅ Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Get user profile (protected route)
router.get(
  "/me",
  authMiddleware,
  asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })
);

// ✅ Register new user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  asyncHandler(registerUser) // Wraps the controller with `asyncHandler` to catch async errors
);

// ✅ Verify email code
router.post("/verify-email", verifyEmailCode);

// ✅ User login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    await loginUser(req, res); // ✅ Ensures `await` is used before calling loginUser
  })
);

export default router;
