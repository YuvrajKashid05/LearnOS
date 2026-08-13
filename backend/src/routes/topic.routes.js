import express from "express";
import { createTopic, getPublishedTopics, getTopicById, publishTopic } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/", createTopic);
router.get("/", getPublishedTopics);
router.get("/:id", getTopicById);
router.patch("/:id/publish", publishTopic);

export default router;