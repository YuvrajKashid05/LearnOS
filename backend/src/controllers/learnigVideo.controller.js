import * as videoService from "../services/learnigVideo.service.js";
import { sendSuccess } from "../utils/response.js";
import { createVideoSchema, updateVideoAnalysisSchema, updateVideoStatusSchema } from "../validations/learningVideo.validation.js";

export const createVideo = async (req, res, next) => {
    try {
        const validatedVideo = createVideoSchema.parse(req.body);

        const video = await videoService.createVideo(validatedVideo);

        return sendSuccess(
            res,
            "Video added Successfully",
            video
        );
    } catch (error) {
        return next(error);
    }
};

export const getVideoById = async (req, res, next) => {
    try {
        const video = await videoService.getVideoById(req.params.id);

        return sendSuccess(
            res,
            null,
            video
        );
    } catch (error) {
        return next(error);
    }
};

export const getVideosByLessonId = async (req, res, next) => {
    try {
        const videos = await videoService.getVideosByLessonId(req.params.lessonId);

        return sendSuccess(
            res,
            null,
            videos
        );
    } catch (error) {
        return next(error);
    }
};

export const getApprovedVideosByLessonId = async (req, res, next) => {
    try {
        const videos = await videoService.getApprovedVideosByLessonId(req.params.lessonId);

        return sendSuccess(
            res,
            null,
            videos,
        );
    } catch (error) {
        return next(error);
    }
};

export const updateVideoAnalysis = async (req, res, next) => {
    try {
        const validatedData = updateVideoAnalysisSchema.parse(req.body);

        const video = await videoService.updateVideoAnalysis(req.params.id,validatedData);

        return sendSuccess(
            res,
            null,
            video
        );
    } catch (error) {
        return next(error);
    }
};

export const updateVideoStatus = async (req, res, next) => {
    try {
        const validatedData = updateVideoStatusSchema.parse(req.body);

        const video = await videoService.updateVideoStatus(req.params.id, validatedData.status);

        return sendSuccess(
            res,
            null,
            video
        );
    } catch (error) {
        return next(error);
    }
};