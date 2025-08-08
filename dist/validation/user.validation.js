"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userProfileSchema = zod_1.default.object({
    name: zod_1.default.string().nonempty({ message: "Required Name" }),
    address: zod_1.default.string().nonempty({ message: "Required Address" }),
    phoneNumber: zod_1.default.string().min(10).max(10).nonempty({ message: "Required Phone Number" })
});
