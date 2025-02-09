import bcrypt from "bcryptjs";
import Society from "../../models/Society.model.js";

export const registerSociety = async (req, res) => {
  try {
    const { name, id, email, password, description } = req.body;
    const existingSociety = await Society.findOne({ email });
    if (existingSociety) {
      return res.status(400).json({ message: "Society already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newSociety = new Society({ name, id, email, password:hashedPassword, description });
    await newSociety.save();  
    res.status(200).json({societyData:{name, id}, message: "Society registered successfully" });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const loginSociety = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingSociety = await Society.findOne({ email });
    if (!existingSociety) {
      return res.status(404).json({ message: "Society does not exist" });
    }   
    const isPasswordCorrect = await bcrypt.compare(password, existingSociety.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ societyData: { name: existingSociety.name, id: existingSociety.id }, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    
  }
}