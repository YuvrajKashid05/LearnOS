import bcrypt from "bcrypt";
import { createUser, findUserByEmail, findUserById, updateRefreshToken } from "../repositories/user.repositories.js";
import AppError from "../utils/AppError.js";
import { generateAccessToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../utils/jwt.js";

export const registerUser = async (data) => {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
        throw new AppError("User with this email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await createUser({
        ...data,
        password: hashedPassword,
    });

    const payload = {
        id: user.id,
        email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await updateRefreshToken(user.id, hashToken(refreshToken));

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("invalid email or password", 401);
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
        throw new AppError("invalid email or password", 401);
    }

    const payload = {
        id: user.id,
        email: user.email,
    }

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await updateRefreshToken(user.id, hashToken(refreshToken));

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
    };

    return {
        user: safeUser,
        accessToken,
        refreshToken,
    };

};

export const getCurrentUser = async (id) => {
    const user = await findUserById(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
    };
};

export const refreshUserToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError("Reresh token is required", 400);
    }

    try {
        const decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
        throw new AppError("Invalid refresh token", 401);
    }

    const user = await findUserById(decoded.id)

    if (!user || !user.refreshToken) {
        throw new AppError("Invalid refresh token", 401);
    }

    if (hashToken(refreshToken) !== user.refreshToken) {
        throw new AppError("Invalid Refresh token", 401);
    }
    const payload = {
        id: user.id,
        email: user.email,
    }

    const newAccesstToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    await updateRefreshToken(user.id, hashToken(newRefreshToken));

    return {
        accessToken: newAccesstToken,
        refreshToken: newRefreshToken
    };

};

