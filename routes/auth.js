import { Router } from "express";
import { userLogin, userRegister } from '../controllers/user/auth.controller.js';

const router = Router();
router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

export default router;