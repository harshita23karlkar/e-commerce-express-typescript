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
exports.addFeedbackAndRating = exports.getAllProdectReviews = void 0;
const client_1 = require("../db/client");
const error_1 = require("../error/error");
const getAllProdectReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
});
exports.getAllProdectReviews = getAllProdectReviews;
const addFeedbackAndRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield client_1.prisma.reviews.findFirst({ where: { userId } });
    if (user) {
        throw next(new error_1.ErrorHandler("User already commented", 401));
    }
    const review = yield client_1.prisma.reviews.create({ data: { rating, comment, userId, productId } });
});
exports.addFeedbackAndRating = addFeedbackAndRating;
