import jwt from "jsonwebtoken";

export const createToken = (userId: string): string => {
  console.log("✅ JWT_SECRET vid token-generering:", process.env.JWT_SECRET); // Loggar hemligheten vid skapande av token

  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
