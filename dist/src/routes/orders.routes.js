"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const error_handler_1 = __importDefault(require("../../handler/error.handler"));
const router = express_1.default.Router();
router.post("/checkout", auth_middleware_1.authenticateUser, order_controller_1.checkout, error_handler_1.default);
router.post("/initiate-payment", auth_middleware_1.authenticateUser, order_controller_1.paymentThroughRazorPay, error_handler_1.default);
router.post("/verify-payment", auth_middleware_1.authenticateUser, order_controller_1.verifyPayment, error_handler_1.default);
exports.default = router;
