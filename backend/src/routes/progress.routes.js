import express from "express";
import { getUserProgress, getVideoProgress, updateVideoProgress } from "../controllers/progress.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/me", getUserProgress);

router.get("/video/:videoId", getVideoProgress);

router.patch("/video/:videoId", updateVideoProgress);


export default router;