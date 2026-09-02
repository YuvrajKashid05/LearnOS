import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import errorHandler from "./src/middleware/error.middleware.js";
import notfoundError from "./src/middleware/notfound.middleware.js";
import { authLimiter } from "./src/middleware/rateLimiter.middleware.js";

import authRoutes from "./src/routes/auth.routes.js";
import videoRoutes from "./src/routes/learnigVideo.routes.js";
import learningPathRoutes from "./src/routes/learningPath.routes.js";
import learningPathLessonsRoutes from "./src/routes/learningPathLesson.routes.js";
import pipelineRoutes from "./src/routes/pipeline.routes.js";
import progressRoutes from "./src/routes/progress.routes.js";
import topicRoutes from "./src/routes/topic.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

const PORT =Number(process.env.PORT) || 5000;

const allowedOrigins = (
    process.env.FRONTEND_URL ||
    "http://localhost:5173"
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (
                allowedOrigins.includes(origin)
            ) {
                return callback(
                    null,
                    true
                );
            }

            return callback(
                new Error(
                    "CORS origin not allowed"
                )
            );
        },
        credentials: true,
    })
);

app.use(helmet());

app.use(
    morgan(
        process.env.NODE_ENV === "production"
            ? "combined"
            : "dev"
    )
);

app.use(express.json({limit: "1mb",}));

app.use(cookieParser());

app.get("/health",(req, res) => {
        return res.status(200).json({
            success: true,
            message: "LearnOS backend is healthy",
        });
    }
);

app.use("/api/auth",authLimiter,authRoutes);

app.use("/api/users",userRoutes);

app.use("/api/topics",topicRoutes);

app.use("/api/learning-path",learningPathRoutes);

app.use("/api/learning-path-lessons",learningPathLessonsRoutes);

app.use("/api/learning-videos",videoRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/pipeline", pipelineRoutes);

app.use(notfoundError);

app.use(errorHandler);

app.listen(
    PORT,
    () => {
        console.log(
            `LearnOS backend running on port ${PORT}`
        );
    }
);