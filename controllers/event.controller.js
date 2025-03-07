import Event from "../models/Event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createEvent = async (req, res) => {

  try {
    const eventImageLocalPath = req.file ? req.file.path : null;
    const { name, id, description, venue, participants, registration_link=null, start_time, end_time,start_date,end_date } = req.body;
    if (!name || !id || !description || !venue || !participants || !start_date || !end_date || !start_time || !end_time) {
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

    const newEvent = new Event({ name, id, description, venue, participants, registration_link, start_date, end_date, start_time, end_time, banner:url });

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


export const getEvent = async (req, res) => {
  try {
    const allEvents = await Event.find();
    if (!allEvents) {
      return res.status(400).json({ message: "No event found" });
    }

    return res.status(200).json({ events: allEvents });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}


export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({id}); // Use findById instead of findOne
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event); // Send event directly without extra nesting
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const deleteEvent = async (req, res) => {

  try {
    const { id } = req.params;
    const event = await Event.findOne({ id }); // Use findById instead of findOne
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const deleteEvent=await Event.deleteOne({id});
    if(!deleteEvent){
      return res.status(400).json({ message: "Event deletion failed" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
