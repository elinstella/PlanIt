import { Response } from "express";
import { AuthRequest } from "../../types/auth";
import { User } from "../../models/user/User";

export const updateEmail = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { newEmail, confirmNewEmail } = req.body;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const trimmedNewEmail = newEmail.trim().toLowerCase();
  const trimmedConfirmEmail = confirmNewEmail.trim().toLowerCase();

  if (trimmedNewEmail !== trimmedConfirmEmail) {
    return res.status(400).json({ message: "Emails do not match" });
  }

  const existingUser = await User.findOne({ email: trimmedNewEmail });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { email: trimmedNewEmail },
      { new: true }
    );

    if (!updatedUser) {
      console.error("No user found with ID:", req.userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);
    return res.json({ message: "Email updated successfully", user: updatedUser });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database Error:", error.message);
      return res.status(500).json({ message: "Server error", error: error.message });
    } else {
      console.error("Unexpected Error:", error);
      return res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};
