import prisma from "../config/db.js";

export const createVideo = async (data) => {
    return prisma.learningVideo.create({
        data,
        include: {
            lesson: true,
        },
    });
};

export const findVideoById = async (id) => {
    return prisma.learningVideo.findUnique({
        where: {
            id,
        },
        include: {
            lesson: true,
        },
    });
};

export const findVideoByYoutubeId = async (youtubeVideoId) => {
    return prisma.learningVideo.findUnique({
        where: {
            youtubeVideoId,
        },
    });
};

export const findVideosByLessonId = async (lessonId) => {
    return prisma.learningVideo.findMany({
        where: {
            lessonId,
        },
        orderBy: {
            relevanceScore: "desc"
        },
    });
};

export const findApprovedVideoByLessonId = async (lessonId) => {
    return prisma.learningVideo.findMany({
        where: {
            lessonId,
            status: "APPROVED",
        },
        orderBy: [
            {
                relevanceScore: "desc",
            },
            {
                qualityScore: "desc"
            },
        ],
    });
};

export const updateVideoAnalysis = async (id, data) => {
    return prisma.learningVideo.update({
        where: {
            id,
        },
        data: {
            relevanceScore:data.relevanceScore,
            qualityScore:data.qualityScore,
            difficultyScore:data.difficultyScore,
            aiSummary:data.aiSummary,
            status:data.status
        },
    });
};

export const updateVideoStatus = async (id, status) => {
  return prisma.learningVideo.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

