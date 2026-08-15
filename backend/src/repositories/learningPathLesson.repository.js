import prisma from "../config/db.js";

export const createLesson = async (data) => {
    return prisma.learningPathLesson.create({
        data,
    });
};

export const findLessionById = async (id) => {
    return prisma.learningPathLesson.findUnique({
        where: {
            id,
        },
        include: {
            learningPath: true,
        },
    });
};

export const findLessionsByLearningPathId = async (learningPathId) => {
    return prisma.learningPathLesson.findMany({
        where: {
            learningPathId,
        },
        orderBy: {
            order: "asc",
        },
    });
};

export const findLessionsByOrder = async (data) => {
    return prisma.learningPathLesson.findUnique({
        where: {
            learningPathId_order: {
                learningPathId:data.learningPathId,
                order:data.order,
            },
        },
    });
};