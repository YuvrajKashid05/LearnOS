import * as learningPathRepo from "../repositories/learningPath.repository.js";
import * as topicRepo from "../repositories/topic.repository.js";
import AppError from "../utils/AppError.js";

export const createLearningPath = async (data) => {
    const topic = await topicRepo.findTopicById(data.topicId);

    if (!topic) {
        throw new AppError(
            "Learning topic not found",
            404
        );
    }

    return learningPathRepo.createLearningPath({
        title: data.title,
        description: data.description,
        topicId: data.topicId,
    });
};

export const getLearningPathById = async (id) => {
    const path = await learningPathRepo.findLearningPathById(id);

    if (!path) {
        throw new AppError(
            "Learning path not found",
            404
        );
    }

    return path;
};

export const getLearningPathsByTopicId = async (topicId) => {
    const topic = await topicRepo.findTopicById(topicId);

    if (!topic) {
        throw new AppError(
            "Learning topic not found",
            404
        );
    }

    return learningPathRepo.findLearningPathsByTopicId(topicId);
};

export const getPublishedPathsByTopicId = async (topicId) => {
    const topic = await topicRepo.findTopicById(topicId);

    if (!topic) {
        throw new AppError(
            "Learning topic not found"
        );
    }

    return learningPathRepo.findPublishedPathsByTopicId(topicId);
};

export const publishLearningPath = async (id) => {
    const learningPath = await learningPathRepo.findLearningPathById(id);

    if (!learningPath) {
        throw new AppError(
            "Learning Path not found",
            404
        );
    }

    if (learningPath.status === "PUBLISHED") {
        throw new AppError(
            "Learning Path is alreday published",
            409
        );
    }

    if (learningPath.topic.status !== "PUBLISHED") {
        throw new AppError(
            "Cannot publish learning path for an unpublished topic",
            400
        );
    }

    return learningPathRepo.publishLearningPathStatus(
        id,
        "PUBLISHED"
    );
};

export const getPublishedPathsWithLessons = async (topicId) => {
    const topic = await topicRepo.findTopicById(topicId);

    if (!topic) {
        throw new AppError(
            "Learning topic not found",
            404
        );
    }

    const paths = await learningPathRepo.findPublishedPathsWithLessons(topicId);

    return paths;
};

export const getPublishedLearningPathDetails = async (id) => {
    const learningPath = await learningPathRepo.findPublishedLearningPathDetails(id);

    if (!learningPath) {
        throw new AppError(
            "Learning path not found or not available",
            404
        );
    }

    return learningPath;
};

export const getLearningPathPlayer = async (learningPathId, userId) => {
    const learningPath =
        await learningPathRepo.findLearningPathForPlayer(
            learningPathId,
            userId
        );

    if (!learningPath) {
        throw new AppError(
            "Learning path not found or not available",
            404
        );
    }

    let currentVideo = null;
    let completedVideos = 0;
    let totalVideos = 0;

    const lessons = learningPath.lessons.map((lesson) => {
        const videos = lesson.videos.map((video) => {
            totalVideos++;

            const progress = video.progress[0] || null;

            if (progress?.isCompleted) {
                completedVideos++;
            }

            const videoData = {
                id: video.id,
                youtubeVideoId: video.youtubeVideoId,
                title: video.title,
                description: video.description,
                thumbnailUrl: video.thumbnailUrl,
                channelName: video.channelName,
                durationSeconds: video.durationSeconds,
                relevanceScore: video.relevanceScore,
                qualityScore: video.qualityScore,

                progress: progress
                    ? {
                        watchedSeconds: progress.watchedSeconds,
                        progressPercentage:
                            progress.progressPercentage,
                        isCompleted: progress.isCompleted,
                        lastWatchedAt: progress.lastWatchedAt,
                    }
                    : null,
            };

            if (!currentVideo && !progress?.isCompleted) {
                currentVideo = videoData;
            }

            return videoData;
        });

        return {
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            order: lesson.order,
            videos,
        };
    });

    const progressPercentage =
        totalVideos > 0
            ? (completedVideos / totalVideos) * 100
            : 0;

    return {
        id: learningPath.id,
        title: learningPath.title,
        description: learningPath.description,

        topic: learningPath.topic,

        progress: {
            completedVideos,
            totalVideos,
            progressPercentage,
        },

        currentVideo,

        lessons,
    };
};