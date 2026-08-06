import express from "express";
import errorHandler from "./src/middleware/error.middleware.js";
import notfoundError from "./src/middleware/notfound.middleware.js";
import authRoutes from "./src/routes/auth.route.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
    
app.use("/api/auth", authRoutes);

app.use(notfoundError);
app.use(errorHandler);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
