import express from "express";
import { getPipelineJob, startPipeline } from "../controllers/pipeline.controller";

const router = express.Router();

router.post("/start", startPipeline);

router.get("/:id", getPipelineJob);

export default router;