import Society from "../../models/Society.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const societyRegister = async (req, res) => {
  console.log("Inside societyRegister")
  console.log(req.body, "Body")
  
  try {
    const { name, email, password, id, description, logoimage } = req.body;
    const resImageLocalPath = req.file ? req.file.path : null;
    console.log(resImageLocalPath, "resImageLocalPath")
    console.log("Received logoimage:", logoimage);

    if (!name || !email || !password || !id || !description || !logoimage) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const society = await Society.findOne({ email });
    if (society) {
      return res.status(400).json({ message: "Society already exists" });
    }

    const logoimageResponse = await uploadOnCloudinary(logoimage);
    if (!logoimageResponse) {
      return res.status(500).json({ message: "Cloudinary error" });
    }


    const newSociety = new Society({ name, email, password, id, description, logoimage:logoimageResponse.url });

    const savedSociety = await newSociety.save();
    if (!savedSociety) {
      return res.status(400).json({ message: "Society registration failed" });
    }

    const societyResponse = { societyname: name, societyemail: email };
    return res.status(201).json({ societydata: societyResponse, message: "Society registered successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}


export const societyLogin = async (req, res) => {
  
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const society = await Society.findOne({ email });
    if (!society) {
      return res.status(400).json({ message: "Society does not exist" });
    }

    const isMatch = bcrypt.compareSync(password, society.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const tokenPayload = { name: society.name, email: society.email, role: "societyAdmin" };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("societytoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Society logged in successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export const societyLogout = async (req, res) => {
  try {
    if(!req.cookies.societytoken){
      return res.status(400).json({ message: "Society not logged in" });
    }
    res.clearCookie("token");
    return res.status(200).json({ message: "Society logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}