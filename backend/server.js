import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
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

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/topics", topicRoutes);
app.use("/api/learning-path", learningPathRoutes);
app.use("/api/learning-path-lessons", learningPathLessonsRoutes);
app.use("/api/learning-videos", videoRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/pipeline", pipelineRoutes);

app.use(notfoundError);
app.use(errorHandler);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
