import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
    id:{
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        require: true,
    },
    content:{
        type: String,
        require: true,
    }
},
{timestamps: true});
const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: [true, "password is required"],
    },
    chats: [chatSchema],
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema);