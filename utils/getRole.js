import User from "../models/User.model.js"
import jwt from "jsonwebtoken";

export const getRole = async (req, res) => {
  try {
    if(!req.cookies.token) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await User.findOne({ email: decoded.email });
    if(!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ role: user.role });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  }
}
