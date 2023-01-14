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
      res.status(500).json({ error: error.message });
   }
};

// LOGIN
const login = async (req, res) => {
   try {
      const { email, userName, password } = req.body;

      // Get user by username or email
      const user = await User.findOne({ $or: [{ email, userName }] });
      if (!user) {
         return res.status(400).json({ message: "User does not exist. " });
      }

      // Matching password from input to database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Password does not match. " });
      }

      // Create token for login
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export { register, login };
