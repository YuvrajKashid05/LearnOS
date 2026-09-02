import prisma from "../config/db.js";

// Auth operations

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const createUser = async (userData) => {
    return prisma.user.create({
        data: userData,
    });
};

export const updateRefreshToken = async (
    id,
    refreshToken
) => {
    return prisma.user.update({
        where: {
            id,
        },
        data: {
            refreshToken,
        },
    });
};

export const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

// User operations

export const getUserProfile = async (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isVerified: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const updateUserProfile = async (
    id,
    data
) => {
    return prisma.user.update({
        where: {
            id,
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isVerified: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteUserProfile = async (id) => {
    return prisma.user.delete({
        where: {
            id,
        },
    });
};