
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      res.status(200).json({adminName:"Admin", message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}