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
exports.signInUser = exports.signUp = void 0;
const client_1 = require("../db/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_validation_1 = require("../../validation/auth.validation");
const error_1 = require("../error/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../../entity.ts/user.entity");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { success, data } = auth_validation_1.userSignupSchema.safeParse(req.body);
        console.log(success);
        if (!success) {
            throw next(new error_1.ErrorHandler("Validation Failed", 400));
        }
        const { name, email, password } = data;
        const profileImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        let user = yield client_1.prisma.users.findFirst({ where: { email } });
        if (user) {
            throw next(new error_1.ErrorHandler("User already exist", 400));
        }
        const userDetails = {
            name,
            email,
            password: bcrypt_1.default.hashSync(password, 10),
            address: "",
            phoneNumber: "",
            profileImage: profileImage || "",
            role: user_entity_1.userTypes.USER
        };
        yield client_1.prisma.users.create({ data: userDetails });
        res.status(200).json({ success: false, message: "User created successfully.." });
    }
    catch (e) {
        throw e;
    }
});
exports.signUp = signUp;
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = auth_validation_1.userLoginSchema.safeParse(req.body);
    if (!success) {
        throw next(new error_1.ErrorHandler("Validation Failed", 400));
    }
    try {
        const { email, password } = data;
        const user = yield client_1.prisma.users.findFirst({ where: { email } });
        if (!user) {
            throw next(new error_1.ErrorHandler("User Not Found", 404));
        }
        const isValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isValid) {
            throw next(new error_1.ErrorHandler("Invalid Password", 400));
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY);
        yield client_1.prisma.cart.upsert({
            where: { userId: user.id },
            update: {},
            create: { userId: user.id },
        });
        res.status(200).json({ success: false, message: "Success", token });
    }
    catch (e) {
        throw e;
    }
});
exports.signInUser = signInUser;
