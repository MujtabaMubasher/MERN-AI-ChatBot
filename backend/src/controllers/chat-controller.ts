import { NextFunction, Request, Response } from "express";
import { User} from "../models/user-model.js";
import { configureOpenAI } from "../config/openAI-config.js";
import OpenAI from "openai";

const createChatCompletion = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
   try {
     const { message } = req.body;

     if (!message) {
       return res.send("Message is Required");
     }
      const user = await User.findById(req.user);
     
     //console.log(user._id);
     

     //console.log(res.locals.jwtData);

     if (!user) {
       return res.status(401).send("User not Registered");
     }

     // graps Chats of user
     const chats = user.chats.map(({role,content})=>({
        role,
        content
     }))

     chats.push({role: "user", content: message})
     user.chats.push({role: "user", content: message})
     
     // send new chats with new one to openAI API
     //const config = configureOpenAI();

     const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
        })
     // get the latest Response
      const chatResponse  = await openai.chat.completions.create({
        messages: chats,
        model: "gpt-3.5-turbo"
      })

      user.chats.push({
        role: chatResponse.choices[0].message.role,
        content: chatResponse.choices[0].message.content
      })

      await user.save();
      return res.status(200).json({chats:user.chats})

   } catch (error) {
     console.log(error.message);
     res
       .status(500)
       .send(
         "Some thing Went wrong while getting the chat response from ApenAI"
       );
   }
    
}

export {createChatCompletion}