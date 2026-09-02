import express from "express";
import {
    createVideo,
    getApprovedVideosByLessonId,
    getVideoById,
    getVideosByLessonId,
    updateVideoAnalysis,
    updateVideoStatus,
} from "../controllers/learnigVideo.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

const contentManagers = authorizeRoles(
    "ADMIN",
    "EDITOR",
    "DEVELOPER"
);

router.post("/",protect,contentManagers,createVideo);

router.get("/lesson/:lessonId/approved",getApprovedVideosByLessonId);

router.get("/lesson/:lessonId", protect, contentManagers, getVideosByLessonId);

router.patch("/:id/analysis", protect, contentManagers, updateVideoAnalysis);

router.patch("/:id/status", protect, contentManagers, updateVideoStatus);

router.get("/:id", getVideoById);

export default router;