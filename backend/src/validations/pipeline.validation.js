import { z } from "zod";

export const startPiplineSchema = z.object({
    topicId: z
        .string()
        .uuid("Invalid topic id")
});