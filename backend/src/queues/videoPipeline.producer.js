import redisConnection from "../config/redis.js";
import { videoPipelineQueue } from "./videoPipeline.queue.js";

export const addVideoPipelineJob = async ({ pipelineJobId, topicId }) => {
    const job = await videoPipelineQueue.add(
        "process-topic",
        {
            pipelineJobId,
            topicId,
        },
        {
            jobId: pipelineJobId,
        }
    );

    await redisConnection.rpush(
        "learnos:pipeline:jobs",
        JSON.stringify({
            pipelineJobId,
            topicId,
        })
    );

    return job;
};