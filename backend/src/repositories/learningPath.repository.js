import prisma from "../config/db.js";

export const createLearningPath = async (data) => {
    return prisma.learningPath.create({
        data,
        include: {
            topic: true
        },
    });
};

export const findLearningPathById = async (id) => {
    return prisma.learningPath.findUnique({
        where: {
            id,
        },
        include: {
            topic: true,
        },
    });
};

export const findLearningPathsByTopicId = async (topicId) => {
    return prisma.learningPath.findMany({
        where: {
            topicId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findPublishedPathsByTopicId = async (topicId) => {
    return prisma.learningPath.findMany({
        where: {
            topicId,
            status: "PUBLISHED",
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export const publishLearningPathStatus = async (id, status) => {
    return prisma.learningPath.update({
        where: {
            id,
        },
        data: {
            status,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
        include: {
            topic: true,
        },
    });
};

export const findPublishedPathsWithLessons = async (topicId) => {
    return prisma.learningPath.findMany({
        where: {
            topicId,
            status: "PUBLISHED",
        },

        include: {
            lessons: {
                orderBy: {
                    order: "asc",
                },

                include: {
                    videos: {
                        where: {
                            status: "APPROVED",
                        },

                        orderBy: [
                            {
                                relevanceScore: "desc",
                            },
                            {
                                qualityScore: "desc",
                            },
                        ],
                    },
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
};