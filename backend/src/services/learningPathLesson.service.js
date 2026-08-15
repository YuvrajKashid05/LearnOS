import * as learningPathRepo from "../repositories/learningPath.repository.js";
import * as lessonRepo from "../repositories/learningPathLesson.repository.js";
import AppError from "../utils/AppError.js";

export const createLesson = async (data) => {
    const learningPath = await learningPathRepo.findLearningPathById(data.learningPathId);

    if (!learningPath) {
        throw new AppError(
            "Learning path not found",
            404
        );
    }

    if (learningPath.status === "PUBLISHED") {
        throw new AppError(
            "Cannot add lessons to published learning path",
            400
        );
    }

    const existingLesson = await lessonRepo.findLessionsByOrder(data);

    if (existingLesson) {
        throw new AppError(
            `Lesson with order ${data.order} already exists`,
            409
        );
    }

    return lessonRepo.createLesson(data);
};

export const getLessonById = async (id) => {
    const lesson = await lessonRepo.findLessionById(id);

    if (!lesson) {
        throw new AppError(
            "Lesson not found",
            404
        );
    }

    return lesson;
};

export const getLessonsByLearningPathId = async (learningPathId) => {
    const learningPath = await learningPathRepo.findLearningPathById(learningPathId);

    if (!learningPath) {
        throw new AppError(
            "Learning path not found",
            404
        );
    }

    return lessonRepo.findLessionsByLearningPathId(learningPath.id);

};
