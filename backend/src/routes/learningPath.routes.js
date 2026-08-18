import express from "express";
import {
    createLearningPath,
    getLearningPathById,
    getLearningPathForPlayer,
    getLearningPathsByTopicId,
    getPublihshedLearningPathDeatails,
    getPublishedPathsByTopicId,
    getPublishedPathsWithLessons,
    publishLearningPath
} from "../controllers/learningPath.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createLearningPath);
router.get("/topic/:topicId/published", getPublishedPathsByTopicId);
router.get("/topic/:topicId/content",getPublishedPathsWithLessons);
router.get("/topic/:topicId", getLearningPathsByTopicId);
router.patch("/:id/publish", publishLearningPath);
router.get("/:id/details", getPublihshedLearningPathDeatails);
router.get("/:id/player",protect ,getLearningPathForPlayer);
router.get("/:id",getLearningPathById);

export default router;