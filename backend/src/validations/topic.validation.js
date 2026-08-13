import { z } from "zod";

export const createTopicSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Topic name must be at least 2 characters")
        .max(100, "Topic name must not be exceed 100 characters"),
    
    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(120, "Slug must not be exceed 120 characters"),
    
    description: z
        .string()
        .trim()
        .max(500, "Description must not exceed 500 characters")
        .optional(),
     
    thumbnail: z
        .string()
        .url("Thumbnail must be a valid URL")
        .optional(),
      
    category: z
        .string()
        .trim()
        .min(2, "Category is required")
        .max(100),

    difficulty: z
        .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
        .optional(),
});