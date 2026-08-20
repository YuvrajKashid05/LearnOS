import { z } from "zod";

export const startPiplineSchema = z.object({
    topicId: z
        .string()
        .z.uuid("Invalid topic id")
});