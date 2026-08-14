import express from "express";
import {
    createLesson,
    getLessonById,
    getLessonsByLearningPathId
} from "../controllers/learningPathLesson.controller.js";

const router = express.Router();

router.post("/", createLesson);
router.get("/path/:learningPathId", getLessonsByLearningPathId);
router.get("/:id", getLessonById);


export default router;