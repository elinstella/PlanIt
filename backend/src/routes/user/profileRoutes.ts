import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user/User";
import { authMiddleware } from "../../middleware/authMiddleware";

// Define the extended request interface to include `user`
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const router = express.Router();

// 🔹 Update Name
router.put(
  "/update-name",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Name field cannot be empty." });
      return; // Ensure the function exits
    }

    try {
      await User.findByIdAndUpdate(req.user?.id, { name });
      res.json({ message: "Name updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 🔹 Update Email
router.put(
  "/update-email",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { newEmail } = req.body;
    if (!newEmail) {
      res.status(400).json({ message: "New email is required." });
      return;
    }

    try {
      const user = await User.findOne({ email: newEmail });
      if (user) {
        res.status(400).json({ message: "Email already in use." });
        return;
      }

      await User.findByIdAndUpdate(req.user?.id, { email: newEmail });
      res.json({ message: "Email updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 🔹 Update Password
router.put(
  "/update-password",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { newPassword } = req.body;
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9!@#$%^&*()\-=_+])(?=.{8,})/;

    if (!newPassword.match(passwordRegex)) {
      res.status(400).json({ message: "Password must meet complexity requirements." });
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(req.user?.id, { password: hashedPassword });

      res.json({ message: "Password updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// 🔹 Delete Account
router.delete(
  "/delete-account",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await User.findByIdAndDelete(req.user?.id);
      res.json({ message: "Account deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
