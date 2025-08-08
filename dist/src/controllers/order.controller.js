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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMyOrders = exports.verifyPayment = exports.paymentThroughRazorPay = exports.checkout = void 0;
const error_1 = require("../error/error");
const client_1 = require("../db/client");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const checkout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const cart = yield client_1.prisma.cart.findFirst({
            where: { userId }, include: {
                items: true
            }
        });
        if (!cart || cart.items.length === 0) {
            throw next(new error_1.ErrorHandler("Not Found", 404));
        }
        const total = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const order = yield client_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrdre = yield tx.order.create({
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
            yield client_1.prisma.cartItems.deleteMany({ where: { cartId: cart.id } });
        }));
        res.status(200).json({ success: true, message: "Order Completed", order });
    }
    catch (e) {
        throw e;
    }
});
exports.checkout = checkout;
const razorPayInstance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAT_KEY_SECRET
});
const paymentThroughRazorPay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return next(new error_1.ErrorHandler("Provide the order id", 404));
        }
        const orderDetails = yield client_1.prisma.order.findFirst({ where: { id: orderId } });
        if (!orderDetails)
            return next(new error_1.ErrorHandler("Order not found", 404));
        const options = {
            amount: orderDetails.total * 100,
            currency: process.env.CURRENCY || "INR",
            receipt: orderId
        };
        console.log("before razorpay order create");
        const order = yield razorPayInstance.orders.create(options);
        console.log("after razorpay order create");
        res.status(200).json({ success: true, order });
    }
    catch (er) {
        console.log(er);
        throw er;
    }
});
exports.paymentThroughRazorPay = paymentThroughRazorPay;
const verifyPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generatedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }
        const order = yield client_1.prisma.order.update({
            where: { id: razorpay_order_id },
            data: { status: "PAID" }
        });
        res.status(200).json({ success: true, message: "Payment successful", order });
    }
    catch (err) {
        throw err;
    }
});
exports.verifyPayment = verifyPayment;
const getAllMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const orders = yield client_1.prisma.order.findMany({ where: { userId } });
        res.status(200).json({ success: true, orders });
    }
    catch (err) {
        err;
    }
});
exports.getAllMyOrders = getAllMyOrders;
