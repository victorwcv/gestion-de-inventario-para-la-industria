import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
