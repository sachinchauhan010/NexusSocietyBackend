import Event from "../models/Event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createEvent = async (req, res) => {

  try {
    const eventImageLocalPath = req.file ? req.file.path : null;
    const { name, id, description, venue, dc_team, participants, registration_link=null, date, start_time, end_time } = req.body;

    if (!name || !id || !description || !venue || !dc_team || !participants || !date || !start_time || !end_time) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const event = await Event.findOne({ id });
    if (event) {
      return res.status(400).json({ message: "Event already exists" });
    }
    if (!eventImageLocalPath) {
      return res.status(400).json({ message: "Event banner is required" });
    }

    const { url } = await uploadOnCloudinary(eventImageLocalPath);
    if (!url) {
      return res.status(500).json({
        success: false,
        message: "Event banner is not uploaded on Cloudinary",
      })
    }

    const parsedDate = new Date(date);

    const newEvent = new Event({ name, id, description, venue, dc_team, participants, registration_link, date: parsedDate , start_time, end_time, banner:url });

    const savedEvent = await newEvent.save();
    if (!savedEvent) {
      return res.status(400).json({ message: "Event creation failed" });
    }

    return res.status(201).json({ message: "Event created successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}