import { z } from "zod";

export const createLessonSchema = z.object({
    learningPathId: z
        .string()
        .uuid("Invalid learning path ID"),
    
    title: z
        .string()
        .trim()
        .min(2, "Lesson title must be at least 2 character")
        .max(150, "Lesson title must not be exceed 150 characters"),
    
    description: z
        .string()
        .trim()
        .max(500, "Description must not be exceed 500 character"),
    
    order: z
        .number()
        .int("Order must be an integer ")
        .positive("Order must be greater than 0"),
});