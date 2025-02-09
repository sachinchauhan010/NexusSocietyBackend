import { Router } from "express";
import { registerSociety, loginSociety } from "../controllers/head/society.controller.js";

const router = Router();
router.post('/register-society', registerSociety);
router.post('/login-society', loginSociety);

export default router;