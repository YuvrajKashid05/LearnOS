import express from "express";
import {
    createTopic,
    getPublishedTopics,
    getTopicById,
    publishTopic,
    searchTopics,
} from "../controllers/topic.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

const contentManagers = authorizeRoles(
    "ADMIN",
    "EDITOR",
    "DEVELOPER"
);

router.post("/", protect, contentManagers, createTopic);

router.get("/", getPublishedTopics);

router.get("/search",searchTopics);

router.get("/:id",getTopicById);

router.patch("/:id/publish",protect,contentManagers,publishTopic);

export default router;