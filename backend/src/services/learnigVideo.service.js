import * as videoRepo from "../repositories/learnigVideo.repositories.js";
import * as lessonRepo from "../repositories/learningPathLesson.repositories.js";
import AppError from "../utils/AppError.js";

export const createVideo = async (data) => {
    const lesson = await lessonRepo.findLessionById(data.lessonId);

    if (!lesson) {
        throw new AppError(
            "Learning path lesson not found",
            404
        );
    }

    if (lesson.learningPath.status === "PUBLISHED") {
        throw new AppError(
            "Cannot add video to published learning path",
            400
        );
    }

    const existingvideo = await videoRepo.findVideoByYoutubeId(data.youtubeVideoId);

    if (existingvideo) {
        throw new AppError(
            "This Youtube video is already exist",
            409
        );
    }

    return videoRepo.createVideo(data);
};

export const getVideoById = async (id) => {
    const video = await videoRepo.findVideoById(id);

    if (!video) {
        throw new AppError(
            "Video not found",
            404
        );
    }

    return video;
};

export const getVideosByLessonId = async (lessonId) => {
    const lesson = await lessonRepo.findLessionById(lessonId);

    if (!lesson) {
        throw new AppError(
            "Learning path lesson not found",
            404
        );
    }

    return videoRepo.findVideosByLessonId(lessonId);
};

export const getApprovedVideosByLessonId = async (lessonId) => {
    const lesson = await lessonRepo.findLessionById(lessonId);

    if (!lesson) {
        throw new AppError(
            "Learning path lesson not found",
            404
        );
    }

    return videoRepo.findApprovedVideoByLessonId(lessonId);
};