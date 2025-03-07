import bcrypt from "bcryptjs";
import User from "../models/User.model.js"
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const userRegister = async (req, res) => {
  try {
    const profileImageLocalPath = req.file ? req.file.path : null;
    const { name, email, password, phone, role = "student", id, course=null, branch=null, department, year = null } = req.body;

    if (!name || !email || !password || !phone || !id || !department) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if(!profileImageLocalPath){
      return res.status(400).json({ message: "Profile image is required" });  
    }

    const {url} = await uploadOnCloudinary(profileImageLocalPath);
    if (!url) {
      return res.status(500).json({
        success: false,
        message: "File is not uploaded on Cloudinary",
      })
    }

    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, phone, role, id, course,branch, department, year, profileimage: url });
    

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
  console.log(req.body,"Called")

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
    // Set cookie with proper settings
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Also set Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);

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


export const checkAuth=async(req,res)=>{
  try {
    if (!req.cookies.token) {
      return res.status(400).json({isLogin:false, message: "User is not logged in" });
    }
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({isLogin:false, message: "Invalid token" });
    }
    const userData= {username:decoded.name, useremail: decoded.email, role:decoded.role}
    return res.status(200).json({isLogin:true, userdata: userData, message: "User is logged in" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({isLogin:false, message: "Something went wrong" });
  }
}
