import { Router } from "express";
import { userLogin, userRegister, userLogout } from '../controllers/user/auth.controller.js';

const router = Router();
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.get('/user/logout', userLogout);

export default router;