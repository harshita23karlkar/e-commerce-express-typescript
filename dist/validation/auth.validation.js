"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSignupSchema = zod_1.default.object({
    name: zod_1.default.string().nonempty({ message: "Name is required" }),
    email: zod_1.default.email().nonempty({ message: "Please enter the valid email" }),
    password: zod_1.default.string().min(6, { message: "Password must of atleast 6 characters" }),
});
exports.userLoginSchema = zod_1.default.object({
    email: zod_1.default.email().nonempty({ message: "Please enter the valid email" }),
    password: zod_1.default.string().min(6, { message: "Password must of atleast 6 characters" }),
});
