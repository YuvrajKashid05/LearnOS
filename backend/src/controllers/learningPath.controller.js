import * as learningPathService from "../services/learningPath.service.js";
import { sendSuccess } from "../utils/response.js";
import { createLearningPathSchema } from "../validations/learningPath.validation.js";

export const createLearningPath = async (req, res, next) => {
    try {
        const validateData = createLearningPathSchema.parse(req.body);

        const learningPath = await learningPathService.createLearningPath(validateData);

        return sendSuccess(
            res,
            "Learning path created successfully.",
            learningPath,
        );

    } catch (error) {
        return next(error);
    }
};

export const getLearningPathById = async (req, res, next) => {
    try {
        const learningPath = await learningPathService.getLearningPathById(req.params.id);

        return sendSuccess(
            res,
            null,
            learningPath,
        );
    } catch (error) {
        return next(error);
    }
};

export const getLearningPathsByTopicId = async (req, res, next) => {
    try {
        const learningPaths = await learningPathService.getLearningPathsByTopicId(req.params.topicId);

        return sendSuccess(
            res,
            null,
            learningPaths,
        );
    } catch (error) {
        return next(error);
    }
};

export const getPublishedPathsByTopicId = async (req, res, next) => {
    try {
        const learningPaths = await learningPathService.getPublishedPathsByTopicId(req.params.topicId);

        return sendSuccess(
            res,
            null,
            learningPaths,
        );
    } catch (error) {
        return next(error);
    }
};

export const publishLearningPath = async (req, res, next) => {
    try {
        const learningPath = await learningPathService.publishLearningPath(req.params.id);

        return sendSuccess(
            res,
            "Learning Path published successfully",
            learningPath
        );
    } catch (error) {
        return next(error);
    }
};

export const getPublishedPathsWithLessons = async (req, res, next) => {
    try {
        const paths = await learningPathService.getPublishedPathsWithLessons(req.params.topicId);

        return sendSuccess(
            res,
            null,
            paths,
        );
    } catch (error) {
        return next(error)
    }
};
