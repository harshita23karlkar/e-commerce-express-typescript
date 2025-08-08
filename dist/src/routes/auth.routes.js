"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const multer_1 = require("../../middleware/multer");
const error_handler_1 = __importDefault(require("../../handler/error.handler"));
const router = express_1.default.Router();
console.log("inside route");
router.post("/signup", multer_1.upload.single("profileImage"), auth_controller_1.signUp, error_handler_1.default);
router.post("/login", auth_controller_1.signInUser, error_handler_1.default);
exports.default = router;
