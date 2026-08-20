import prisma from "../config/db.js";

export const createPipelineJob = async (data) => {
    return prisma.pipelineJob.create({
        data,
    });
};

export const findPipelineJobById = async (id) => {
    return prisma.pipelineJob.findUnique({
        where: {
            id,
        },

        include: {
            topic: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                },
            },
        },
    });
};

export const findActivePipelineJobByTopicId = async (topicId) => {
    return prisma.pipelineJob.findFirst({
        where: {
            topicId,
            status: {
                in: ["PENDING", "QUEUED", "PROCESSING"]
            },
        },
        
        orderBy: {
            createdAt: "desc"
        },
    });
};

export const updatePipelineJob = async (id,data) => {
    return prisma.pipelineJob.update({
        where: {
            id
        },
        data,
    });
};