import { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ErrorHandler } from "../src/error/error";
import { decodedUserType } from "../src/@types/auth.types";
import { userTypes } from "../entity.ts/user.entity";
import { prisma } from "../src/db/client";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    try {
        if (!token) {
            throw next(new ErrorHandler("Unauthorized access denied", 401));
        }
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        if (!decodedUser) {
            throw next(new ErrorHandler("Unauthorized access denied", 401));
        }
        let isValid = await prisma.users.findUnique({ where: { id: decodedUser.id } });
        if (!isValid) {
            throw next(new ErrorHandler("Unauthorized access denied", 401));
        }
        req.user = decodedUser! as decodedUserType;

        next();
    } catch (e) {
        throw e;
    }

}

export const roleGuard = ([...allowedAccess]: string[]) => {

}