import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/user/User";
import authMiddleware from "../../middleware/authMiddleware";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const router = express.Router();

// ✅ Update Name
router.put(
  "/update-name",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name cannot be empty." });
      return;
    }

    try {
      await User.findByIdAndUpdate(req.user?.id, { name });
      res.json({ message: "Name updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the name." });
    }
  }
);

// ✅ Update Email
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
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        res.status(400).json({ message: "This email is already in use." });
        return;
      }

      await User.findByIdAndUpdate(req.user?.id, { email: newEmail });
      res.json({ message: "Email updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the email." });
    }
  }
);

// ✅ Update Password
router.put(
  "/update-password",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { newPassword } = req.body;
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9!@#$%^&*()\-=_+])(?=.{8,})/;

    if (!newPassword.match(passwordRegex)) {
      res.status(400).json({ message: "Password must be at least 8 characters long, contain an uppercase letter, and include a number or special character." });
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(req.user?.id, { password: hashedPassword });

      res.json({ message: "Password updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while updating the password." });
    }
  }
);

// ✅ Delete Account
router.delete(
  "/delete-account",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      await User.findByIdAndDelete(req.user?.id);
      res.json({ message: "Account deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred while deleting the account." });
    }
  }
);

export default router;
