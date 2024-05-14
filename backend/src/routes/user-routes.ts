import { Router } from "express";
import { getAllusers,login,signUp } from "../controllers/user-controller.js";
import { loginValidate, signUpValidate, validate } from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllusers);
userRoutes.post("/signup",validate(signUpValidate),signUp);

userRoutes.post("/login",validate(loginValidate),login);

export default userRoutes