import prisma from "../config/db.js";
import AppError from "../utils/appError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
    try {

        let token;

        if (
            req.headers.authorization && req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new AppError("Access token required", 401);
        }
        
        const decoded = verifyAccessToken(token);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                isVerified: true,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};
