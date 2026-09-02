import express from "express";
import {
    createLesson,
    getLessonById,
    getLessonsByLearningPathId,
} from "../controllers/learningPathLesson.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

const contentManagers = authorizeRoles(
    "ADMIN",
    "EDITOR",
    "DEVELOPER"
);

router.post("/", protect, contentManagers, createLesson);

router.get("/path/:learningPathId", getLessonsByLearningPathId);

router.get("/:id",getLessonById);

export default router;