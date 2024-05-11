import { User } from "../models/user-model.js";
const getAllusers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "ok", users: users });
    }
    catch (error) {
        console.log(error);
        return res
            .status(401)
            .json({ message: "Error", cause: error.message });
    }
};
const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    if ([username, email, password].some((fields) => !fields || fields?.trim() === "")) {
        return res.status(401).json({ message: "All fields are required" });
    }
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: "Email already exists" });
        }
        const user = new User({
            username,
            email,
            password,
        });
        await user.save();
        const userCreated = await User.findById(user._id).select("-password");
        if (!userCreated) {
            throw new Error("User creation failed: User not found after creation");
        }
        return res.status(200).json({ message: "User created successfully", user: userCreated });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Something went wrong while creating the user", error: error.message });
    }
};
// My code
/*const signUp = async(req,res) => {
      
      const {username, email, password} = req.body;
      if
      (
        [username,email,password].some(
          (fields)=> fields?.trim() === ""
        )
      ){
         return res.status(401).json({message:"All fields are requireds"})
      }
      try {
      const userExist = await User.findOne({
        $or: [{email}],
      })

      if (userExist) {
        return res.status(401).json({message:"email already exist"})
      }

      
         const user = new User({
           username,
           email,
           password,
        });
        await user.save();
        const userCreated = await User.findById(user._id).select("-password");
  
        if (!userCreated) {
          throw new Error("User creation failed");
        }
        return res.status(200).json({ message: "User created successfully", user: userCreated });
      }
      catch (error) {
        return res.status(500).json({ message: "Some thing is Wrong while creating the user" });
      }
   
}*/
export { getAllusers, signUp };
//# sourceMappingURL=user-controller.js.map