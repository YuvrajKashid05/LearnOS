import { addVideoPipelineJob } from "../queues/videoPipeline.producer.js";
import * as pipelineRepo from "../repositories/pipeline.repository.js";
import * as topicRepo from "../repositories/topic.repository.js";
import AppError from "../utils/AppError.js";

export const startTopicPipeline = async (topicId) => {
    const topic = await topicRepo.findTopicById(topicId);

    if (!topic) {
        throw new AppError(
            "Topic not found",
            404
        );
    }

    if (topic.status == "PUBLISHED") {
        throw new AppError(
            "Pipeline cannot run for alreay published topic",
            400
        );
    }

    const existingJob = await pipelineRepo.findActivePipelineJobByTopicId(topicId);

    if (existingJob) {
        throw new AppError(
            "A pipeline is already running for this topic",
            409
        );
    }

    const pipelineJob = await pipelineRepo.createPipelineJob({
        topicId,
        status: "PENDING"
    });


    try {
        await pipelineRepo.updatePipelineJob(
            pipelineJob.id,
            {
                status: "QUEUED"
            }
        );

        await addVideoPipelineJob({
            pipelineJobId: pipelineJob.id,
            topicId
        });

        return pipelineRepo.findPipelineJobById(pipelineJob.id);


    } catch (error) {
        await pipelineRepo.updatePipelineJob(
            pipelineJob.id,
            {
                status: "FAILED",
                errorMessage: error.message,
            }
        );

        throw error;
    }
};

export const getPipelineJob = async (id) => {
    const pipelineJob = await pipelineRepo.findPipelineJobById(id);
    
    if (!pipelineJob) {
        throw new AppError(
            "Pipeline Job not found",
            404
        );
    }

    return pipelineJob;
};