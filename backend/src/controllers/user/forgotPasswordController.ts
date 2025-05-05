import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user/User";
import { sendResetEmail } from "../../services/user/emailService";

// Controller function for handling forgot password functionality

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Email not found." });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendResetEmail(user.email, resetLink);

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error, try again later." });
  }
};
