import express from "express";
import {
    createLearningPath,
    getLearningPathById,
    getLearningPathsByTopicId,
    getPublishedPathsByTopicId,
    getPublishedPathsWithLessons,
    publishLearningPath
} from "../controllers/learningPath.controller.js";


const router = express.Router();

router.post("/", createLearningPath);
router.get("/topic/:topicId/published", getPublishedPathsByTopicId);
router.get("/topic/:topicId", getLearningPathsByTopicId);
router.patch("/:id/publish", publishLearningPath);
router.get("/:id", getLearningPathById);

router.get("/topic/:topicId/content",getPublishedPathsWithLessons);

export default router;