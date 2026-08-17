import { z } from "zod";

export const updateProgressSchema = z.object({
    watchedSeconds: z
        .number()
        .int()
        .min(0, "Watched Seconds cannot be negative"),
});