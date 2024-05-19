import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

const generateAccessToken = async (id: string, email: string, expiresIn: string) => {
   try {
     const payload = {
         id,
         email
     }
 
     const token = jwt.sign(
         payload,
         process.env.JWT_SECRET,
         {expiresIn}
     )
     return token;
   } catch (error) {
     console.log("Enable to GenerateAccess Token",error);
   }
}

const verifyAccessToken = async (req, res, next) => {
  const token = req.cookies[COOKIE_NAME]
  console.log(token);
  
}

export {generateAccessToken,verifyAccessToken}