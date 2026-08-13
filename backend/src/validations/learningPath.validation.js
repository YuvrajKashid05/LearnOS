import { z } from "zod";

export const createLearningPathSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters.")
        .max(150, "Title must not exceed 150 characters."),
    
    description: z
        .string()
        .trim()
        .max(500, "Description must not exceed 500 characters."),
    
    topicId: z
        .string()
        .uuid("Invalid topic id.")
});