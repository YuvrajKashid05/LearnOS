import * as videoRepo from "../repositories/learnigVideo.repository.js";
import * as progressRepo from "../repositories/progress.repository.js";
import AppError from "../utils/AppError.js";

export const updateVideoProgress = async (userId, videoId, watchedSeconds) => {
    const video = await videoRepo.findVideoById(videoId);
    
    if (!video) {
        throw new AppError(
            "Video not found",
            404
        );
    }

    if (!video.durationSeconds) {
        throw new AppError(
            "Video duration is not available",
            404
        );
    }

    if (watchedSeconds < 0) {
        throw new AppError(
            "Watched seconds cannot be negative",
            400
        );
    }

    const safeWatchedSeconds = Math.min(watchedSeconds, video.durationSeconds);

    const progressPercentage = (safeWatchedSeconds / video.durationSeconds) * 100;

    const isCompleted = progressPercentage >= 90;

    const existingProgress = await progressRepo.findProgress(userId, videoId);

    const data = {
        watchedSeconds: safeWatchedSeconds,
        progressPercentage,
        isCompleted,
        lastWatchedAt: new Date(),
    };

    if (existingProgress) {
        return progressRepo.updateProgress(
            existingProgress.id,
            data
        );
    }

    return progressRepo.createProgress({
        userId,
        videoId,
        ...data,
    });
};

export const getUserProgress = async (userId) => {
    const progress = await progressRepo.findUserProgress(userId);

    return progress;
}

export const getVideoProgress = async (userId, videoId) => {
    const video = await videoRepo.findVideoById(videoId);

    if (!video) {
        throw new AppError(
            "Video not found",
            404
        );
    }

    return progressRepo.findProgress(userId, videoId);
};
