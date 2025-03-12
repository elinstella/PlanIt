import express from "express";
import { registerUser } from "../../controllers/user/registerController";
import { loginUser } from "../../controllers/user/loginController";
import { body } from "express-validator";
import { getUserProfile } from "../../controllers/user/userController";


const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Namn krävs"),
    body("email").isEmail().withMessage("Ogiltig e-post"),
    body("password").isLength({ min: 6 }).withMessage("Lösenord måste vara minst 6 tecken")
  ],
  registerUser // Vi använder den asynkrona registerUser som en express-handler
);

router.post("/login", loginUser); // Vi använder loginUser här också, ingen ändring behövs.

export default router;
