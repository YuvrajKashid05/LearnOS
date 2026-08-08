import express from "express";
import { login, logout, me, refresh, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/refresh",refresh);
router.get("/me", protect, me);
router.post("/logout", logout);

export default router;