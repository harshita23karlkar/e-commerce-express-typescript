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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUSer = exports.updateUserProfile = void 0;
const user_validation_1 = require("../../validation/user.validation");
const error_1 = require("../error/error");
const client_1 = require("../db/client");
const unlink_file_1 = require("../helper/unlink_file");
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { success, data } = user_validation_1.userProfileSchema.safeParse(req.body);
    const id = req.params.id;
    if (!success) {
        throw next(new error_1.ErrorHandler("Validation Failed", 400));
    }
    try {
        const { name, address, phoneNumber } = data;
        const profileImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        let user = yield client_1.prisma.users.findFirst({ where: { id } });
        yield (0, unlink_file_1.deleteProfileIfExist)(`${user === null || user === void 0 ? void 0 : user.profileImage}`);
        let userData = {
            name, address, phoneNumber, profileImage
        };
        user = yield client_1.prisma.users.update({ where: { id }, data: userData });
        res.status(200).json({ success: false, message: "User updated successfully", user });
    }
    catch (e) {
        throw e;
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUSer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let user = yield client_1.prisma.users.findFirst({ where: { id } });
        if (!user) {
            throw next(new error_1.ErrorHandler("User not found", 400));
        }
        yield (0, unlink_file_1.deleteProfileIfExist)(`${user.profileImage}`);
        user = yield client_1.prisma.users.delete({ where: { id } });
        res.status(200).json({ success: false, message: "User deleted", user });
    }
    catch (e) {
        throw e;
    }
});
exports.deleteUSer = deleteUSer;
