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
exports.getProductsByCategory = exports.getAllProductCategory = exports.upadteProductDetails = exports.getProductDetails = exports.deleteProduct = exports.getAllProducts = exports.saveProductInBulk = void 0;
const client_1 = require("../db/client");
const saveProductInBulk = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const products = (_a = req.body) === null || _a === void 0 ? void 0 : _a.products;
        for (const product of products) {
            let { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images } = product;
            let data = { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images };
            yield client_1.prisma.product.create({ data });
        }
        res.status(200).json({ success: true, message: "Products saved" });
    }
    catch (e) {
        throw e;
    }
});
exports.saveProductInBulk = saveProductInBulk;
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield client_1.prisma.product.findMany();
    try {
        res.status(200).json({ success: true, products });
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
exports.getAllProducts = getAllProducts;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield client_1.prisma.product.delete({ where: { id } });
        res.status(200).json({ success: true, product });
    }
    catch (e) {
        throw e;
    }
});
exports.deleteProduct = deleteProduct;
const getProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const productdetails = yield client_1.prisma.product.findFirst({ where: { id } });
        res.status(200).json({ success: true, productdetails });
    }
    catch (e) {
        throw e;
    }
});
exports.getProductDetails = getProductDetails;
const upadteProductDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        let { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images } = req.body;
        let data = { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images };
        const product = yield client_1.prisma.product.update({ where: { id }, data });
    }
    catch (e) {
        throw e;
    }
});
exports.upadteProductDetails = upadteProductDetails;
const getAllProductCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield client_1.prisma.product.findMany({ select: { category: true }, distinct: ["category"] });
        res.status(200).json({ success: true, categories });
    }
    catch (e) {
        throw e;
    }
});
exports.getAllProductCategory = getAllProductCategory;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        const product = yield client_1.prisma.product.findMany({
            where: { category: { equals: category, mode: "insensitive" }, }
        });
        res.status(200).json({ success: true, product });
    }
    catch (e) {
        throw e;
    }
});
exports.getProductsByCategory = getProductsByCategory;
