import * as topicService from "../services/topic.service.js";
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
        const topics = await topicService.getPublishedTopics();

        return sendSuccess(
            res,
            null,
            topics
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
