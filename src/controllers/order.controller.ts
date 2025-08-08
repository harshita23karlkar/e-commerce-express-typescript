import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../error/error";
import { prisma } from "../db/client";
import Razorpay from "razorpay";
import crypto from "crypto";
import { sendMail } from "../helper/mailService";

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    try {
        const cart = await prisma.cart.findFirst({
            where: { userId }, include: {
                items: true
            }
        });
        if (!cart || cart.items.length === 0) {
            throw next(new ErrorHandler("Not Found", 404))
        }
        const total = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
        const order = await prisma.$transaction(async (tx) => {
            const createdOrdre = await tx.order.create({
                data: {
                    total,
                    status: "PENDING",
                    user: { connect: { id: userId } },
                    items: {
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price
                        })),
                    }
                }, include: {
                    items: true
                }
            });
            await prisma.cartItems.deleteMany({ where: { cartId: cart.id } });

        });
        res.status(200).json({ success: true, message: "Order Completed", order });
    }
    catch (e) {
        throw e;
    }
}


const razorPayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAT_KEY_SECRET
});

export const paymentThroughRazorPay = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { orderId } = req.body;

        if (!orderId) {
            return next(new ErrorHandler("Provide the order id", 404));
        }

        const orderDetails = await prisma.order.findFirst({ where: { id: orderId } });

        if (!orderDetails) return next(new ErrorHandler("Order not found", 404));

        const options = {
            amount: orderDetails.total * 100,
            currency: process.env.CURRENCY || "INR",
            receipt: orderId
        };
        console.log("before razorpay order create")
        const order = await razorPayInstance.orders.create(options);
        console.log("after razorpay order create")
        res.status(200).json({ success: true, order });

    } catch (er) {
        console.log(er)
        throw er

    }
}

export const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
        const order = await prisma.order.update({
            where: { id: razorpay_order_id },
            data: { status: "PAID" }
        });
        const from: string = process.env.MAIL_USERNAME as string;
        const to: string = req.user?.email as string;
        const subject: string = 'Order Confirmation!';
        const mailTemplate: string = `Order confirm with the order ID : ${razorpay_order_id}.`;

        sendMail(from, to, subject, mailTemplate);
        res.status(200).json({ success: true, message: "Payment successful", order });
    } catch (err) {
        throw err;
    }
};


export const getAllMyOrders = async (req: Request, res: Response,) => {
    const { userId } = req.body;
    try {
        const orders = await prisma.order.findMany({ where: { userId } });
        res.status(200).json({ success: true, orders });
    }
    catch (err) {
        err;
    }
}