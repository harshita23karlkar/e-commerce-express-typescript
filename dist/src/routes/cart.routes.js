"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const error_handler_1 = __importDefault(require("../../handler/error.handler"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/:userId", cart_controller_1.getUserCart, error_handler_1.default);
router.post("/add-to-cart", auth_middleware_1.authenticateUser, cart_controller_1.addToCart, error_handler_1.default);
router.post("/product/increase", auth_middleware_1.authenticateUser, cart_controller_1.increaseProductQuantity, error_handler_1.default);
router.post("/product/decrease", auth_middleware_1.authenticateUser, cart_controller_1.decreaseProductQuantity, error_handler_1.default);
exports.default = router;
