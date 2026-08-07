import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" }),
    
    email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" })
        .toLowerCase(),
    
    password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must be at most 50 characters long" })
        .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain a number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain a special character" }),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: "Invalid Email address" })
        .toLowerCase(),
    
    password: z
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
});