import jwt from "jsonwebtoken";

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

export {generateAccessToken}