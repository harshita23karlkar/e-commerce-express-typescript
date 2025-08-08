import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";
import { ErrorHandler } from "../error/error";

export const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId }, include: {
                items: {
                    include: { product: true }
                }
            }
        });
        res.status(200).json({ success: true, cart });
        console.log(cart);
    }
    catch (e) {
        throw e;
    }
}

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, productId, quantity, price } = req.body;
    try {
        const userCart = await prisma.cart.findFirst({ where: { userId } });
        if (!userCart) {
            throw next(new ErrorHandler("Cart Not Found for this User", 404));
        }
        const existCartItem = await prisma.cartItems.findFirst({ where: { cartId: userCart.id, productId } });
        if (existCartItem) {
            await prisma.cartItems.update({
                where: {
                    id: existCartItem.id
                }, data: {
                    quantity: existCartItem.quantity + quantity,
                    price
                }
            })
        } else {
            await prisma.cartItems.create({
                data: { cart: { connect: { id: userCart.id } }, product: { connect: { id: productId } }, quantity, price }
            });
        }
        res.status(200).json({ success: true, message: "Item added in the cart" });
    }
    catch (e) {
        throw e;
    }
}

export const increaseProductQuantity = async (req: Request, res: Response) => {
    const { cartItemId, quantity } = req.body;

    try {
        const cartItem = await prisma.cartItems.findFirst({ where: { id: cartItemId } });
        await prisma.cartItems.update({
            where: { id: cartItemId }, data: {
                quantity: cartItem?.quantity + quantity
            }
        });
        res.status(200).json({ success: true, message: "Increased the quantity" })
    } catch (e) {
        throw e;
    }
}
export const decreaseProductQuantity = async (req: Request, res: Response) => {
    const { cartItemId, quantity } = req.body;

    try {
        const cartItem = await prisma.cartItems.findFirst({ where: { id: cartItemId } });

        if (!cartItem) return
        if (cartItem.quantity <= 1) {
            await prisma.cartItems.delete({ where: { id: cartItemId } });

        }
        await prisma.cartItems.update({
            where: { id: cartItemId }, data: {
                quantity: cartItem.quantity - quantity
            }
        });
        res.status(200).json({ success: true, message: "Increased the quantity" })
    } catch (e) {
        throw e;
    }
}

export const removeItemFromCart = async (req: Request, res: Response, next: NextFunction) => {
    const cartItemId = req.params.cartItemId;
    try {
        await prisma.cartItems.delete({ where: { id: cartItemId } });
        res.status(200).json({ success: true, message: "Item removed from cart" })
    }
    catch (e) {
        throw e;
    }
}

