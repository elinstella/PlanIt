import express, { Request, Response } from "express";
import { sendEmail } from "../../services/task/emailService";

const router = express.Router();

router.post("/send-email", async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "E-postadress krävs" });
    return;
  }

  try {
    await sendEmail(email);
    res.status(200).json({ message: "E-post skickad!" });
  } catch (error) {
    console.error("Fel vid e-postutskick:", error);
    res.status(500).json({ message: "Kunde inte skicka e-post." });
  }
});

export { router as emailRoutes };
