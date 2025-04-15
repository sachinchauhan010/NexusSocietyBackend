import { Router } from "express";
import { createNotice, getAllNotices, updateNoticeById, deleteNoticeById, getNoticeById } from "../controllers/notice.controller.js";


const noticeRoutes = Router();

noticeRoutes.post('/create-notice', createNotice);
noticeRoutes.get('/get-notices', getAllNotices);
noticeRoutes.get('/get-notice/:id', getNoticeById);
noticeRoutes.put('/update-notice/:id', updateNoticeById);
noticeRoutes.delete('/delete-notice/:id',deleteNoticeById);

export default noticeRoutes;
