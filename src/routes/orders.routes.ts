import express from "express";
import { authenticateUser } from "../../middleware/auth.middleware";
import { checkout, paymentThroughRazorPay, verifyPayment } from "../controllers/order.controller";
import errorHandler from "../../handler/error.handler";

const router = express.Router();

router.post("/checkout", authenticateUser, checkout, errorHandler);
router.post("/initiate-payment", authenticateUser, paymentThroughRazorPay, errorHandler);
router.post("/verify-payment", authenticateUser, verifyPayment, errorHandler);

export default router;