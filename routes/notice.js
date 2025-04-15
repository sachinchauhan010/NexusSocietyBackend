import { Router } from "express";
import { createNotice, getAllNotices } from "../controllers/notice.controller.js";


const noticeRoutes = Router();

noticeRoutes.post('/create-notice', createNotice);
noticeRoutes.get('/get-notices', getAllNotices);

export default noticeRoutes;
