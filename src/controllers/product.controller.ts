import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";
import { ErrorHandler } from "../error/error";

export const saveProductInBulk = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = req.body?.products;
        for (const product of products) {
            let { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images } = product;
            let data = { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images };
            await prisma.product.create({ data });
        }
        res.status(200).json({ success: true, message: "Products saved" });
    }
    catch (e) {
        throw e;
    }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const products = await prisma.product.findMany();
    try {
        res.status(200).json({ success: true, products });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const product = await prisma.product.delete({ where: { id } });
        res.status(200).json({ success: true, product });
    } catch (e) {
        throw e;
    }
}

export const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const productdetails = await prisma.product.findFirst({ where: { id } });
        res.status(200).json({ success: true, productdetails });
    } catch (e) {
        throw e;
    }
}

export const upadteProductDetails = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        let { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images } = req.body;
        let data = { title, description, category, price, discountPercentage, rating, stock, brand, warrantyInformation, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, createdAt, updatedAt, thumbnail, images };
        const product = await prisma.product.update({ where: { id }, data });
    } catch (e) {
        throw e;
    }
}

export const getAllProductCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await prisma.product.findMany({ select: { category: true }, distinct: ["category"] });
        res.status(200).json({ success: true, categories });
    } catch (e) {
        throw e;
    }

}

export const getProductsByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    try {
        const product = await prisma.product.findMany({
            where: { category: { equals: category, mode: "insensitive" }, }
        });
        res.status(200).json({ success: true, product });
    } catch (e) {
        throw e;
    }
}