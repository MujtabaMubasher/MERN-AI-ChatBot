import { Router } from "express";
import { getAllusers } from "../controllers/user-controller.js";

const userRoutes = Router();

userRoutes.use("/", getAllusers);

export default userRoutes