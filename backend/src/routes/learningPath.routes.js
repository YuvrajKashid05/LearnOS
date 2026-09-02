import express from "express";
import {
    createLearningPath,
    getLearningPathById,
    getLearningPathForPlayer,
    getLearningPathsByTopicId,
    getPublihshedLearningPathDeatails,
    getPublishedPathsByTopicId,
    getPublishedPathsWithLessons,
    publishLearningPath,
} from "../controllers/learningPath.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

const contentManagers = authorizeRoles(
    "ADMIN",
    "EDITOR",
    "DEVELOPER"
);

router.post( "/",protect,contentManagers,createLearningPath);

router.get("/topic/:topicId/published", getPublishedPathsByTopicId);

router.get("/topic/:topicId/content",getPublishedPathsWithLessons);

router.get("/topic/:topicId",protect,contentManagers,getLearningPathsByTopicId);

router.patch("/:id/publish", protect,contentManagers, publishLearningPath);

router.get("/:id/details",getPublihshedLearningPathDeatails);

router.get("/:id/player",protect,getLearningPathForPlayer);

router.get("/:id",protect,contentManagers,getLearningPathById);

export default router;