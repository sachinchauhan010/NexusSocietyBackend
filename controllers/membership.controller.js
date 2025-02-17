import User from "../models/User.model.js";

export const getMembership = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');  // .select('-password') excludes the password field

    if (!allUsers) {
      return res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);  // Log the error
    return res.status(500).json({ message: "Something went wrong" });
  }
}
