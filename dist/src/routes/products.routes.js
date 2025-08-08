"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const error_handler_1 = __importDefault(require("../../handler/error.handler"));
const router = express_1.default.Router();
router.post("/save-in-bulk", auth_middleware_1.authenticateUser, product_controller_1.saveProductInBulk, error_handler_1.default);
router.get("/list", auth_middleware_1.authenticateUser, product_controller_1.getAllProducts, error_handler_1.default);
router.delete("/:id", auth_middleware_1.authenticateUser, product_controller_1.deleteProduct);
router.get("/:id", auth_middleware_1.authenticateUser, product_controller_1.getProductDetails);
router.get("/categories/list", auth_middleware_1.authenticateUser, product_controller_1.getAllProductCategory, error_handler_1.default);
router.get("/:category/product", auth_middleware_1.authenticateUser, product_controller_1.getProductsByCategory, error_handler_1.default);
exports.default = router;
