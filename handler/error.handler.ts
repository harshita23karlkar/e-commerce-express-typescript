import { NextFunction, Request, Response } from "express";
import { errorHandlerType } from "../src/@types/error.types";

const errorHandler = (error: errorHandlerType, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
    res.status(error.statusCode).json({ success: false, message: error.message });
}
export default errorHandler;