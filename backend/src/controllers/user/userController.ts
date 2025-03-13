import { Request, Response } from "express";
import User from "../../models/user/User";

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // ✅ Matchar `authMiddleware.ts`
}

export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Ej auktoriserad" });
      return;
    }

    const user = await User.findById(req.user.id).select("-password"); // Hämta användare utan lösenord
    if (!user) {
      res.status(404).json({ message: "Användare hittades inte" });
      return;
    }

    res.json(user); // ✅ Returnera användardata
  } catch (error) {
    console.error("❌ Serverfel:", error);
    res.status(500).json({ message: "Serverfel" });
  }
};

// Hämta endast användarens e-post
export const getUserEmail = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "Ej auktoriserad" });
      return;
    }

    const user = await User.findById(req.user.id).select("email");
    if (!user) {
      res.status(404).json({ message: "Användare hittades inte" });
      return;
    }

    res.json({ email: user.email });
  } catch (error) {
    console.error("❌ Fel vid hämtning av e-post:", error);
    res.status(500).json({ message: "Serverfel" });
  }
};
