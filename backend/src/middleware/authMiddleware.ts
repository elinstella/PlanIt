import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user/User";

// Hämta JWT-hemligheten från miljövariabler
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Augmentera Request-gränssnittet för att lägga till userId
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Gör userId valfritt
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Åtkomst nekad. Ingen giltig token tillhandahållen." });
    return; // Skicka svaret och avsluta middleware
  }

  try {
    // Verifiera tokenen
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Sätt userId från den dekodade token
    req.userId = decoded.userId;

    // Hitta användaren i databasen
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "Användaren hittades inte." });
      return; // Skicka svaret och avsluta middleware
    }

    // Användaren är autentiserad, fortsätt till nästa middleware eller route handler
    next();
  } catch (error: unknown) {
    // Kontrollera om error är en instans av Error och typbestäm den
    if (error instanceof Error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Ogiltig token." });
      } else {
        res.status(500).json({ message: "Serverfel vid autentisering", error: error.message });
      }
    } else {
      // Hantera om error inte är en instans av Error
      res.status(500).json({ message: "Okänt fel vid autentisering." });
    }
    return; // Skicka svaret och avsluta middleware
  }
};
