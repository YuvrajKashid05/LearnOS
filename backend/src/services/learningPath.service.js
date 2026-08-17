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
    const paths = await learningPathRepo.findPublishedPathsWithLessons(topicId);

    return paths;
};