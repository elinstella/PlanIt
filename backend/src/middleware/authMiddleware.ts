import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  console.log("🔹 Request Headers:", req.headers);

  const authHeader = req.header("Authorization");
  if (!authHeader) {
    console.log("❌ No Authorization header found!");
    return void res.status(401).json({ message: "No token, authorization denied" });
  }

  console.log("✅ Found Authorization header:", authHeader);

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) {
    console.log("❌ Token is missing after Bearer!");
    return void res.status(401).json({ message: "Invalid token format" });
  }

  try {
    console.log("✅ JWT_SECRET används för verifiering:", process.env.JWT_SECRET); 
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    console.log("✅ Decoded Token:", decoded);

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      console.log("❌ Token is invalid or missing userId!", decoded);
      return void res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: decoded.userId }; // ✅ Spara userId i request-objektet
    console.log("✅ User authenticated:", req.user);
    
    next(); // ✅ Skicka vidare requesten till nästa middleware eller route-handler
  } catch (error) {
    console.log("❌ Token verification failed!", error);
    return void res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
