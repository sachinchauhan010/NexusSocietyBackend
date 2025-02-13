import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
import User from "../../models/User.model.js"
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {

  try {
    const { name, email, password, phone, role = "student", id = null, department = null, year = null } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, phone, role, id, department, year });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(400).json({ message: "User registration failed" });
    }

    const userResponse = { username: name, useremail: email };
    return res.status(201).json({ userdata: userResponse, message: "User registered successfully" });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}



export const userLogin = async (req, res) => {


  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const tokenPayload = { name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true, // Prevent access from JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Allow cross-site requests in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userResponse = { username: user.name, useremail: user.email, role: user.role }

    return res.status(200).json({ userdata: userResponse, message: "User logged in successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });

  }
}



export const userLogout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({ message: "User is not logged in" });
    }

    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });

  }
}
