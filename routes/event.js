import { Router } from "express";

import { upload } from "../utils/multer.js"
import { createEvent, getEvent } from "../controllers/event.controller.js";

const router = Router();
router.post('/create-event', upload.single('banner'), createEvent);
router.get('/get-event', getEvent);

export default router;