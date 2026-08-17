import * as topicService from "../services/topic.service.js";
import AppError from "../utils/AppError.js";
import { sendSuccess } from "../utils/response.js";
import { createTopicSchema } from "../validations/topic.validation.js";

export const createTopic = async (req, res, next) => {
    try {
        const data = createTopicSchema.parse(req.body);

        const topic = await topicService.createTopic(data);

        return sendSuccess(
            res,
            null,
            topic,
            201,
        );

    } catch (error) {
        return next(error);
    }
};

export const getPublishedTopics = async (req, res, next) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 4;

        if (page < 1) {
            throw new AppError(
                "Page must be greater than 0",
                400
            );
        }

        if (limit < 1 || limit > 50) {
            throw new AppError(
                "Limit must be between 1 to 50",
                400
            );
        }

        const result = await topicService.getPublishedTopics(page, limit);

        return sendSuccess(
            res,
            null,
            result
        );
    } catch (error) {
        return next(error);
    }
};

export const getTopicById = async (req, res, next) => {
    try {
        const topic = await topicService.getTopicById(req.params.id);

        return sendSuccess(
            res,
            null,
            topic
        );
    } catch (error) {
        return next(error);
    }
};

export const publishTopic = async (req, res, next) => {
    try {
        const topic = await topicService.publishTopic(req.params.id);

        return sendSuccess(
            res,
            null,
            topic,
        )
    } catch (error) {
        return next(error);
    }
};

export const searchTopics = async (req, res, next) => {
    try {
        const searchTerm = req.query.q;

        const topics = await topicService.searchTopics(searchTerm);

        return sendSuccess(
            res,
            null,
            topics
        );
    } catch (error) {
        return next(error);
    }
};
