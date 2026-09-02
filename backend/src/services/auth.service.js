import bcrypt from "bcrypt";

import {
    createUser,
    findUserByEmail,
    findUserById,
    updateRefreshToken,
} from "../repositories/user.repository.js";

import AppError from "../utils/AppError.js";

import {
    compareTokenHashes,
    generateAccessToken,
    generateRefreshToken,
    hashToken,
    verifyRefreshToken,
} from "../utils/jwt.js";

export const registerUser = async (data) => {
    const existingUser = await findUserByEmail(data.email);

    if (existingUser) {
        throw new AppError(
            "User with this email already exists",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );

    const user = await createUser({
        ...data,
        password: hashedPassword,
    });

    const payload = {
        id: user.id,
        email: user.email,
    };

    const accessToken =
        generateAccessToken(payload);

    const refreshToken =
        generateRefreshToken(payload);

    await updateRefreshToken(
        user.id,
        hashToken(refreshToken)
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isVerified: user.isVerified,
            role: user.role,
            createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
    };
};

export const loginUser = async ({
    email,
    password,
}) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const isPassMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPassMatch) {
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const payload = {
        id: user.id,
        email: user.email,
    };

    const accessToken =
        generateAccessToken(payload);

    const refreshToken =
        generateRefreshToken(payload);

    await updateRefreshToken(
        user.id,
        hashToken(refreshToken)
    );

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
        role: user.role,
    };

    return {
        user: safeUser,
        accessToken,
        refreshToken,
    };
};

export const refreshUserToken = async (
    refreshToken
) => {
    if (!refreshToken) {
        throw new AppError(
            "Refresh token is required",
            400
        );
    }

    let decoded;

    try {
        decoded =
            verifyRefreshToken(refreshToken);
    } catch (error) {
        throw new AppError(
            "Invalid refresh token",
            401
        );
    }

    const user =
        await findUserById(decoded.id);

    if (!user || !user.refreshToken) {
        throw new AppError(
            "Invalid refresh token",
            401
        );
    }

    const incomingHash =
        hashToken(refreshToken);

    if (
        !compareTokenHashes(
            incomingHash,
            user.refreshToken
        )
    ) {
        throw new AppError(
            "Invalid refresh token",
            401
        );
    }

    const payload = {
        id: user.id,
        email: user.email,
    };

    const accessToken =
        generateAccessToken(payload);

    const newRefreshToken =
        generateRefreshToken(payload);

    await updateRefreshToken(
        user.id,
        hashToken(newRefreshToken)
    );

    return {
        accessToken,
        refreshToken: newRefreshToken,
    };
};

export const logoutUser = async (id) => {
    if (!id) {
        return;
    }

    await updateRefreshToken(
        id,
        null
    );

    return true;
};