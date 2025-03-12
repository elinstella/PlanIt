import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  console.log("Request Headers:", req.headers);

  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("❌ No Authorization header found!");
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  console.log("✅ Found Authorization header:", authHeader);

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) {
    console.log("❌ Token is missing after Bearer!");
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("✅ Decoded Token:", decoded); // ✅ Logga vad vi får!

    if (!decoded || typeof decoded === "string") {
      console.log("❌ Token is invalid");
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (!decoded.userId) {
      console.log("❌ Token saknar userId!", decoded);
      res.status(401).json({ message: "Invalid token data" });
      return;
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.log("❌ Token verification failed!", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export { authMiddleware };
