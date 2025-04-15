import Notice from "../models/Notice.model.js";

// Create a new notice
export const createNotice = async (req, res) => {
  try {
    const {id, title, description, link, date } = req.body;
    const notice = new Notice({id, title, description, link, date });
    await notice.save();
    res.status(201).json({noticeData: notice, message: "Notice created successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error creating notice", error });
  }
};

// Get all notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find({}, { _id: 0, __v: 0 });
    if (!notices || notices.length === 0) {
      return res.status(404).json({ message: "No notices found" });
    }
    res.status(200).json({noticesData: notices, message: "Notices fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices", error });
  }
};


// Get a notice by ID
export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;
    const notice = await Notice.findOne({ id });
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({noticeData: notice, message: "Notice fetched successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error fetching notice", error });
  }
}
