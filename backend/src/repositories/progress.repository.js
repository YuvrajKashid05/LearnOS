import prisma from "../config/db.js";

export const findProgress = async (userId, videoId) => {
    return prisma.userVideoProgress.findUnique({
        where: {
            userId_videoId: {
                userId,
                videoId
            }
        },
    });
};

export const createProgress = async (data) => {
    return prisma.userVideoProgress.create({
        data,
    });
};

export const updateProgress = async (id, data) => {
    return prisma.userVideoProgress.update({
        where: {
            id,
        },
        data,
    });
};

export const findUserProgress = async (userId) => {
    return prisma.userVideoProgress.findMany({
        where: {
            userId
        },
        include: {
            video: {
                include: {
                    lesson: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
};

