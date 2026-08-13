import express from "express";
import {
    createLearningPath,
    getLearningPathById,
    getLearningPathsByTopicId,
    getPublishedPathsByTopicId
} from "../controllers/learningPath.controller.js";
import { publishLearningPath } from "../services/learningPath.service.js";

const router = express.Router();

router.post("/", createLearningPath);
router.get("/topic/:topicId/published", getPublishedPathsByTopicId);
router.get("/topic/:topicId", getLearningPathsByTopicId);
router.get("/:id", getLearningPathById);
router.patch("/:id/publish", publishLearningPath);
export default router;