import { Router } from "express";
import { getAllusers,login,signUp, verifyUser } from "../controllers/user-controller.js";
import { loginValidate, signUpValidate, validate } from "../utils/validators.js";
import { verifyAccessToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllusers);
userRoutes.post("/signup",validate(signUpValidate),signUp);

userRoutes.post("/login",validate(loginValidate),login);
userRoutes.get("/auth-status",verifyAccessToken,verifyUser);

export default userRoutes