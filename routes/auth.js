import { Router } from "express";
import { userLogin, userRegister, userLogout, checkAuth } from '../controllers/user/auth.controller.js';

const router = Router();
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);
router.get('/user/logout', userLogout);
router.get('/user/check-auth', checkAuth);

export default router;