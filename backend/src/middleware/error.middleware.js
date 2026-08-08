import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errors = [];

    if (err instanceof ZodError) {
        statusCode = 400;
        message = "Validation failed";

        errors = err.issues.map((issue) => ({
            message: issue.message,
        }));
    }

    console.error(err);

    if (statusCode >= 500 && !(err instanceof ZodError)) {
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};

export default errorHandler;