import { Router } from "express";

import { upload } from "../utils/multer.js"
import { createEvent, deleteEvent, getEvent, getEventById } from "../controllers/event.controller.js";

const router = Router();
router.post('/create-event', upload.single('banner'), createEvent);
router.get('/get-events', getEvent);
router.get("/:id", getEventById);
router.delete("/delete/:id", deleteEvent);


export default router;