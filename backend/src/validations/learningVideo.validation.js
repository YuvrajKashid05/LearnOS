import { z } from "zod";

export const createVideoSchema = z.object({
    lessonId: z
        .string()
        .uuid("Invalid Lesson Id"),
    
    youtubeVideoId: z
        .string()
        .trim()
        .min(1, "Youtube Video Id is required")
        .max(20, "Invalid Youtube video Id"),
    
    title: z
        .string()
        .trim()
        .min(2, " Video title must be at least 2 characters")
        .max(200, "Video title must not be exceed 200 characters"),
    
    description: z
        .string()
        .trim()
        .max(500, "Description must not be exceed 500 characters")
        .optional(),
    
    thumbnailUrl: z
        .string()
        .url("Invalid thumbnail url")
        .optional(),
    
    channelName: z
        .string()
        .trim()
        .max(150)
        .optional(),

    channelId: z
        .string()
        .trim()
        .max(100)
        .optional(),

    durationSeconds: z
        .number()
        .int()
        .positive()
        .optional(),
    
});

export const updateVideoAnalysisSchema = z.object({
    relevanceScore: z
        .number()
        .min(0)
        .max(100),

    qualityScore: z
        .number()
        .min(0)
        .max(100),

    difficultyScore: z
        .number()
        .min(0)
        .max(100),
    
    aiSummary: z
        .string()
        .trim()
        .max(5000)
        .optional(),

    status: z.enum([
        
        "PENDING",
        "ANALYZING",
        "APPROVED",
        "REJECTED",
    ]),
});

export const updateVideoStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "ANALYZING",
    "APPROVED",
    "REJECTED",
  ]),
});

