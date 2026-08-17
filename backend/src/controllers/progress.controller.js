import * as progressService from "../services/progress.service.js";
import { sendSuccess } from "../utils/response.js";
import { updateProgressSchema } from "../validations/progress.validation.js";

export const updateVideoProgress = async (req, res, next) => {
    try {
        const validateData = updateProgressSchema.parse(req.body);

        const progress = await progressService.updateVideoProgress(
            req.user.id,
            req.params.videoId,
            validateData.watchedSeconds
        );

        return sendSuccess(
            res,
            null,
            progress
        );

    } catch (error) {
        return next(error);
    }
};

export const getVideoProgress = async (req, res, next) => {
    try {
        const progress = await progressService.getVideoProgress(
            req.user.id,
            req.params.videoId
        );

        return sendSuccess(
            res,
            null,
            progress
        );
    } catch (error) {
        return next(error);
    }
};

export const getUserProgress = async (req, res, next) => {
    try {
        const progress = await progressService.getUserProgress(
            req.user.id
        );

        return sendSuccess(
            res,
            null,
            progress
        );
    } catch (error) {
        next(error);
    }
};