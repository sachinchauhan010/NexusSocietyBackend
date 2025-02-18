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
export const addMember = async (req, res) => {
  const { name, rollno, course, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User has no membership" });
    }

    if (user.role.includes("member")) {
      return res.status(200).json({ message: "User is already a member of Society" });
    }

    const newUser = await User.findOneAndUpdate(
      { email },
      { $addToSet: { role: "member" } },
      { new: true, upsert: true }
    );

    if (!newUser) {
      return res.status(400).json({ message: "Member not added" });
    }

    return res.status(200).json({ membername: newUser.name, message: "Member added successfully" });

  } catch (error) {
    console.log(error);  // Log the error
    return res.status(500).json({ message: "Something went wrong" });
  }
}


export const getMember= async (req, res) => {
  try {
    const allmembers = await User.find().select('-password');
    if (!allmembers) {
      return res.status(400).json({ message: "No member found" });
    }
    return res.status(200).json({ members: allmembers });
  } catch (error) {
    console.log(error);  // Log the error
    return res.status(500).json({ message: "Something went wrong" });
  }
}