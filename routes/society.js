import { Router } from "express";
import { societyRegister, societyLogin, societyLogout } from "../controllers/headAdmin/society.controller.js";
import { upload } from "../utils/multer.js";

const router = Router();
router.post('/register', upload.single('logoimage'), societyRegister);
router.post('/login', societyLogin);
router.get('/logout', societyLogout);

export default router;