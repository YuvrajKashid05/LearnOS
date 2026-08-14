import * as lessonService from "../services/learningPathLesson.service.js";
import { sendSuccess } from "../utils/response.js";
import { createLessonSchema } from "../validations/learningPathLesson.validation.js";

export const createLesson = async (req, res, next) => {
    try {
        const validatedData = createLessonSchema.parse(req.body);

        const lesson = await lessonService.createLesson(validatedData);

        return sendSuccess(
            res,
            "Lesson created succssfully",
            lesson,
        );
    } catch (error) {
        return next(error);
    }
};

export const getLessonById = async (req, res, next) => {
    try {
        const lesson = await lessonService.getLessonById(req.params.id);

        return sendSuccess(
            res,
            null,
            lesson,
        );
    } catch (error) {
        return next(error);
    }
};

export const getLessonsByLearningPathId = async (req,res,next) => {
    try {
        const lessons = await lessonService.getLessonsByLearningPathId(req.params.learningPathId);

        return sendSuccess(
            res,
            null,
            lessons
        );
    } catch (error) {
        return next(error);
    }
}