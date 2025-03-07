import sendMailUser from "../utils/sendMail.js";

export const broadcastMessage = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !Array.isArray(to) || to.length === 0) {
      return res.status(400).json({ message: "Recipient list is required and must be an array" });
    }

    await sendMailUser(to, subject, text, html);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
