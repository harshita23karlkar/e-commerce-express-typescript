"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemFromCart = exports.decreaseProductQuantity = exports.increaseProductQuantity = exports.addToCart = exports.getUserCart = void 0;
const client_1 = require("../db/client");
const error_1 = require("../error/error");
const getUserCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const cart = yield client_1.prisma.cart.findUnique({
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
});
exports.getUserCart = getUserCart;
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity, price } = req.body;
    try {
        const userCart = yield client_1.prisma.cart.findFirst({ where: { userId } });
        if (!userCart) {
            throw next(new error_1.ErrorHandler("Cart Not Found for this User", 404));
        }
        const existCartItem = yield client_1.prisma.cartItems.findFirst({ where: { cartId: userCart.id, productId } });
        if (existCartItem) {
            yield client_1.prisma.cartItems.update({
                where: {
                    id: existCartItem.id
                }, data: {
                    quantity: existCartItem.quantity + quantity,
                    price
                }
            });
        }
        else {
            yield client_1.prisma.cartItems.create({
                data: { cart: { connect: { id: userCart.id } }, product: { connect: { id: productId } }, quantity, price }
            });
        }
        res.status(200).json({ success: true, message: "Item added in the cart" });
    }
    catch (e) {
        throw e;
    }
});
exports.addToCart = addToCart;
const increaseProductQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemId, quantity } = req.body;
    try {
        const cartItem = yield client_1.prisma.cartItems.findFirst({ where: { id: cartItemId } });
        yield client_1.prisma.cartItems.update({
            where: { id: cartItemId }, data: {
                quantity: (cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) + quantity
            }
        });
        res.status(200).json({ success: true, message: "Increased the quantity" });
    }
    catch (e) {
        throw e;
    }
});
exports.increaseProductQuantity = increaseProductQuantity;
const decreaseProductQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItemId, quantity } = req.body;
    try {
        const cartItem = yield client_1.prisma.cartItems.findFirst({ where: { id: cartItemId } });
        if (!cartItem)
            return;
        if (cartItem.quantity <= 1) {
            yield client_1.prisma.cartItems.delete({ where: { id: cartItemId } });
        }
        yield client_1.prisma.cartItems.update({
            where: { id: cartItemId }, data: {
                quantity: cartItem.quantity - quantity
            }
        });
        res.status(200).json({ success: true, message: "Increased the quantity" });
    }
    catch (e) {
        throw e;
    }
});
exports.decreaseProductQuantity = decreaseProductQuantity;
const removeItemFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItemId = req.params.cartItemId;
    try {
        yield client_1.prisma.cartItems.delete({ where: { id: cartItemId } });
        res.status(200).json({ success: true, message: "Item removed from cart" });
    }
    catch (e) {
        throw e;
    }
});
exports.removeItemFromCart = removeItemFromCart;
