import express from "express";
import {
    login,
    logout,
    refresh,
    register,
} from "../controllers/auth.controller.js";

import {
    loginLimiter,
    registerLimiter,
} from "../middleware/rateLimiter.middleware.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",registerLimiter,register);

router.post("/login",loginLimiter,login);

router.post("/refresh", refresh);

router.post("/logout", protect, logout);

export default router;