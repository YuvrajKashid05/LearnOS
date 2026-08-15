import express from "express";
import { createVideo, getApprovedVideosByLessonId, getVideoById, getVideosByLessonId } from "../controllers/learnigVideo.controller.js";


const router = express.Router();

router.post("/", createVideo);
router.get("/lesson/:lessonId/approved", getApprovedVideosByLessonId);
router.get("/lesson/:lessonId", getVideosByLessonId);
router.get("/:id", getVideoById);

export default router;