import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { createToken } from "../../services/user/authService";
import User from "../../models/user/User";

// Controller function to handle user login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = createToken(user._id.toString());

    res.json({
      token,
      user: {
        id: user._id.toString(), 
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ Server error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
