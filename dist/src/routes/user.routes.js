"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const error_handler_1 = __importDefault(require("../../handler/error.handler"));
const multer_1 = require("../../middleware/multer");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.put("/update/:id", auth_middleware_1.authenticateUser, multer_1.upload.single("profileImage"), user_controller_1.updateUserProfile, error_handler_1.default);
router.delete("/delete/:id", auth_middleware_1.authenticateUser, user_controller_1.deleteUSer, error_handler_1.default);
exports.default = router;
