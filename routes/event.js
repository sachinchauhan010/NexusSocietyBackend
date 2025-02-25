import { Router } from "express";

import { upload } from "../utils/multer.js"
import { createEvent } from "../controllers/event.controller.js";

const router = Router();
router.post('/create-event', upload.single('banner'), createEvent);

export default router;