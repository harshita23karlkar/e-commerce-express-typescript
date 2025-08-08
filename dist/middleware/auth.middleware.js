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
exports.roleGuard = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../src/error/error");
const client_1 = require("../src/db/client");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (!token) {
            throw next(new error_1.ErrorHandler("Unauthorized access denied", 401));
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedUser) {
            throw next(new error_1.ErrorHandler("Unauthorized access denied", 401));
        }
        let isValid = yield client_1.prisma.users.findUnique({ where: { id: decodedUser.id } });
        if (!isValid) {
            throw next(new error_1.ErrorHandler("Unauthorized access denied", 401));
        }
        req.user = decodedUser;
        next();
    }
    catch (e) {
        throw e;
    }
});
exports.authenticateUser = authenticateUser;
const roleGuard = ([...allowedAccess]) => {
};
exports.roleGuard = roleGuard;
