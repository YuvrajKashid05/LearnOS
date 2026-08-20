import * as pipelineService from "../services/pipeline.service.js";
import sendSuccess from "../utils/response.js";
import { startPiplineSchema } from "../validations/pipeline.validation";

export const startPipeline = async (req, res, next) => {
    try {
        const validatedData = startPiplineSchema.parse(req.body);

        const pipelineJob = await pipelineService.startTopicPipeline(validatedData.topicId);

        return sendSuccess(
            res,
            null,
            pipelineJob
        );

    } catch (error) {
        return next(error);
    }
};

export const getPipelineJob = async (req, res, next) => {
    try {
        const pipelineJob = await pipelineService.getPipelineJob(req.params.id);

        return sendSuccess(
            res,
            null,
            pipelineJob
        );
    } catch (error) {
        return next(error);
    }
};