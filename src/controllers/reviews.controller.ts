import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";
import { ErrorHandler } from "../error/error";
import { sendMail } from "../helper/mailService";

export const getAllProdectReviews = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    try {
        const reviews = await prisma.reviews.findMany({
            where: { productId },
            select: { id: true, rating: true, comment: true, createdAt: true, user: { select: { id: true, name: true, email: true, } } },

        });
        // if (!reviews) {
        //     throw next(new ErrorHandler("No review added", 404));
        // }
        res.status(200).json({ success: true, reviews });
        // const from: string = process.env.MAIL_USERNAME as string;
        // const to: string = 'harshita@yopmail.com';
        // const subject: string = 'Order Confirmation!';
        // const mailTemplate: string = `Order confirm with the order ID : 2781368726382 \n orders : ${reviews}`;
        // sendMail(from, to, subject, mailTemplate);
    } catch (e) {
        throw e;
    }

}

export const addCommentAndRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rating, comment } = req.body;
        const productId = req.params.productId;
        const userId = req.user?.id as string;
        const user = await prisma.reviews.findFirst({ where: { userId } });
        if (user) {
            throw next(new ErrorHandler("User already commented", 401));
        }
        const review = await prisma.reviews.create({ data: { rating, comment, userId, productId } });
        res.status(200).json({ success: true, review });
    } catch (e) {
        throw e;
    }
}

export const deleteReviewAndRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const entry = await prisma.reviews.findFirst({ where: { id } });
        if (!entry) {
            throw next(new ErrorHandler("Review dosn't exist with this id", 404));
        }
        const review = await prisma.reviews.delete({ where: { id } });
        res.status(200).json({ success: true, message: "review deleted" });
    } catch (e) {
        throw e;
    }
}

export const updateReviewAndRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user?.id;
        const { comment, rating } = req.body;
        let review = await prisma.reviews.findFirst({ where: { id: reviewId } });
        if (!review) {
            throw next(new ErrorHandler("Review dosen't exist with this id", 404));
        }
        review = await prisma.reviews.update({ where: { id: reviewId }, data: { comment, rating, userId } });
        res.status(200).json({ success: true, review });
    } catch (e) {
        throw e;
    }
}