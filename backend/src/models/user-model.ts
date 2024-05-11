import mongoose from "mongoose";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt"

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

userSchema.pre("save", async function(next){
    if (!this.isModified("password") ) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User", userSchema);