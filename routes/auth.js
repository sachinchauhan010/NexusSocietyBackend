import { Router } from "express";
import { userLogin, userRegister, userLogout, checkAuth } from '../controllers/auth.controller.js';
import { getRole } from "../utils/getRole.js";
import { getMembership } from "../controllers/membership.controller.js";

const router = Router();
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.get('/user/logout', userLogout);
router.get('/user/check-auth', checkAuth);
router.get('/user/role', getRole);


router.get('/user/membership', getMembership);

export default router;