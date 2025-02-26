import { Router } from "express";
import { userLogin, userRegister, userLogout, checkAuth } from '../controllers/auth.controller.js';
import { getRole } from "../utils/getRole.js";
import { addMember, getMember, getMembership } from "../controllers/member.controller.js";
import {upload} from "../utils/multer.js"
const router = Router();
router.post('/user/register', upload.single('userprofile'), userRegister);
router.post('/user/login', userLogin);
router.get('/user/logout', userLogout);
router.get('/user/check-auth', checkAuth);
router.get('/user/role', getRole);


router.post('/user/add-members', addMember);
router.get('/user/members', getMember);
router.get('/user/membership', getMembership);

export default router;