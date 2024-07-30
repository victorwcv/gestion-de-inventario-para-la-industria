import exress from "express";
import { test } from "../controllers/test.controller.js";

const router = exress.Router();

router.get("/", test);

export default router;