import prisma from "../config/db.js";

export const createTopic = async (data) => {
    return prisma.learningTopic.create({
        data,
    });
};

export const findPublishedTopics = async () => {
    return prisma.learningTopic.findMany({
        where: {
            status: "PUBLISHED"
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findTopicById = async (id) => {
    return prisma.learningTopic.findUnique({
        where: {
            id,
        },
    });
};

export const findTopicBySlug = async (slug) => {
    return prisma.learningTopic.findUnique({
        where: {
            slug,
        },
    });
};

export const updateTopicStatus = async (id, status) => {
    return prisma.learningTopic.update({
        where: {
            id,
        },
        data: {
            status,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
    });
};