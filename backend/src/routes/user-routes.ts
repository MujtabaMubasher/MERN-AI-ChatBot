import { Router } from "express";
import { getAllusers,signUp } from "../controllers/user-controller.js";

const userRoutes = Router();

userRoutes.get("/", getAllusers);
userRoutes.post("/signup",signUp);

export default userRoutes