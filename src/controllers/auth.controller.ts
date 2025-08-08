import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";
import bcrypt from "bcrypt";
import { jwtPayloadType, signupRequestData } from "../@types/auth.types";
import { userLoginSchema, userSignupSchema } from "../../validation/auth.validation";
import { ErrorHandler } from "../error/error";
import jwt from "jsonwebtoken";
import { userTypes } from "../../entity.ts/user.entity";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { success, data } = userSignupSchema.safeParse(req.body);
        console.log(success);
        if (!success) {
            throw next(new ErrorHandler("Validation Failed", 400));
        }
        const { name, email, password } = data;
        const profileImage = req.file?.path;
        let user = await prisma.users.findFirst({ where: { email } });
        if (user) {
            throw next(new ErrorHandler("User already exist", 400));
        }
        const userDetails: signupRequestData = {
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            address: "",
            phoneNumber: "",
            profileImage: profileImage || "",
            role: userTypes.USER
        };
        await prisma.users.create({ data: userDetails });
        res.status(200).json({ success: true, message: "User created successfully.." });
    } catch (e) {
        throw e;
    }

}

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const { success, data } = userLoginSchema.safeParse(req.body);
    if (!success) {
        throw next(new ErrorHandler("Validation Failed", 400));
    }
    try {
        const { email, password } = data;
        const user = await prisma.users.findFirst({ where: { email } });
        if (!user) {
            throw next(new ErrorHandler("User Not Found", 404));
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw next(new ErrorHandler("Invalid Password", 400));
        }
        const payload: jwtPayloadType = {
            id: user.id,
            email: user.email,
            role: user.role,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string);
        await prisma.cart.upsert({
            where: { userId: user.id },
            update: {},
            create: { userId: user.id },
        });
        res.status(200).json({ success: true, message: "Success", token });
    } catch (e) {
        throw e;
    }
}

