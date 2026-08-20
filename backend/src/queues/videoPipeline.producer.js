import { videoPipelineQueue } from "./videoPipeline.queue.js";

export const addVideoPipelineJob = async ({pipelineJobId,topicId}) => {
    return videoPipelineQueue.add(
        "process-topic",
        {
            pipelineJobId,
            topicId,
        },
        {
            jobId: pipelineJobId,
        }
    );
};