import { Router } from "express";
import { userLogin, userRegister, userLogout, checkAuth } from '../controllers/auth.controller.js';
import { getRole } from "../utils/getRole.js";
import { addMember, getMember, getMembership } from "../controllers/member.controller.js";
import {upload} from "../utils/multer.js"
import authorizeRoute from "../middlewares/authorise.js";
import { broadcastMessage } from "../controllers/broadcast.controller.js";


const router = Router();
router.post('/user/register', upload.single('userprofile'), userRegister);
router.post('/user/login', userLogin);
router.get('/user/logout', userLogout);
router.get('/user/check-auth', checkAuth);
router.get('/user/role', getRole);


router.post('/admin/add-members',authorizeRoute("admin") ,addMember);
router.get('/admin/members', authorizeRoute("admin"), getMember);
router.get('/admin/membership', authorizeRoute("admin"), getMembership);
router.post('/admin/broadcast-mail', authorizeRoute("admin"),broadcastMessage);

export default router;