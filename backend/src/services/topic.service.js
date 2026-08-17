import * as topicRepo from "../repositories/topic.repository.js";
import AppError from "../utils/AppError.js";

export const createTopic = async (data) => {
    const existingTopic = await topicRepo.findTopicBySlug(data.slug);

    if (existingTopic) {
        throw new AppError("Topic with this slug is already exists", 409);
    }

    return topicRepo.createTopic({
        ...data,
        slug: data.slug.toLowerCase(),
    });
};

export const getPublishedTopics = async (page,limit) => {
    const { topics, total } = await topicRepo.findPublishedTopics({
        page,
        limit
    });

    return {
        topics,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
    };
};

export const getTopicById = async (id) => {
    const topic = await topicRepo.findTopicById(id);

    if (!topic) {
        throw new AppError("Topic not found", 404);
    }

    return topic;
};

export const publishTopic = async (id,status) => {
    const topic = await topicRepo.findTopicById(id);

    if (!topic) {
        throw new AppError("Topic not found", 404);
    }

    if (topic.status === "PUBLISHED") {
        throw new AppError("Topic is already published", 409)
    }

    return await topicRepo.updateTopicStatus(id,"PUBLISHED");
};

export const searchTopics = async (searchTerm) => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
        throw new AppError(
            "Search term is required",
            400,
        );
    }

    return await topicRepo.searchPublishedTopics(trimmedSearchTerm);
};
