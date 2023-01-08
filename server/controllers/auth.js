import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
const register = async (req, res) => {
   try {
      const { userName, email, password, picturePath, location, occupation } =
         req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
         userName,
         email,
         password: hashedPassword,
         picturePath,
         location,
         occupation,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
   } catch (error) {
      res.status(500).json({ error: err.message });
   }
};

export { register };
