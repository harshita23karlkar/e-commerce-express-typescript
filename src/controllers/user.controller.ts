import { NextFunction, Request, Response } from "express"
import { userProfileSchema } from "../../validation/user.validation"
import { ErrorHandler } from "../error/error";
import { prisma } from "../db/client";
import { deleteProfileIfExist } from "../helper/unlink_file";

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { success, data } = userProfileSchema.safeParse(req.body);
    const id = req.params.id;
    if (!success) {
        throw next(new ErrorHandler("Validation Failed", 400));
    }
    try {
        const { name, address, phoneNumber } = data;
        const profileImage = req.file?.path;
        let user = await prisma.users.findFirst({ where: { id } });
        await deleteProfileIfExist(`${user?.profileImage}`);
        let userData = {
            name, address, phoneNumber, profileImage
        }
        user = await prisma.users.update({ where: { id }, data: userData });
        res.status(200).json({ success: false, message: "User updated successfully", user })

    } catch (e) {
        throw e;
    }

}


export const deleteUSer = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        let user = await prisma.users.findFirst({ where: { id } });
        if (!user) {
            throw next(new ErrorHandler("User not found", 400));
        }
        await deleteProfileIfExist(`${user.profileImage}`);
        user = await prisma.users.delete({ where: { id } });
        res.status(200).json({ success: false, message: "User deleted", user });
    }
    catch (e) {
        throw e;
    }
}