import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import errorHandler from "./src/middleware/error.middleware.js";
import notfoundError from "./src/middleware/notfound.middleware.js";
import { authLimiter } from "./src/middleware/rateLimiter.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users",userRoutes)

app.use(notfoundError);
app.use(errorHandler);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
