import express from "express";
import {
    getPipelineJob,
    startPipeline,
} from "../controllers/pipeline.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

const pipelineManagers = authorizeRoles(
    "ADMIN",
    "EDITOR",
    "DEVELOPER"
);

router.post("/start",protect,pipelineManagers,startPipeline);

router.get("/:id",protect,pipelineManagers,getPipelineJob);

export default router;