import { Request, Response } from "express";
import User from "../../models/user/User";

/**
 * Extends the Request object to include the authenticated user's ID.
 * This is used to match the structure from `authMiddleware.ts`.
 */
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

/**
 * Retrieves the authenticated user's profile without exposing the password.
 * @param req - Authenticated request containing the user's ID
 * @param res - Express response object
 */
export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(req.user.id).select("_id name email");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * Retrieves only the authenticated user's email.
 * @param req - Authenticated request containing the user's ID
 * @param res - Express response object
 */
export const getUserEmail = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(req.user.id).select("email");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
