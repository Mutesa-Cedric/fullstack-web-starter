import { validateProduct } from './productValidator';
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

export default class ProductsController {
    public static async createProduct(req: Request, res: Response) {
        try {
            const product = validateProduct(req.body);

            const newProduct = await prismaClient.product.create({
                data: product
            });

            res.status(201).json({
                success: true,
                newProduct
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async getProducts(req: Request, res: Response) {
        try {
            const products = await prismaClient.product.findMany();
            res.status(200).json({
                success: true,
                products
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async updateProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;
            const product = validateProduct(req.body);

            const updatedProduct = await prismaClient.product.update({
                where: {
                    id: productId
                },
                data: product
            });

            res.status(200).json({
                success: true,
                updatedProduct
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async deleteProduct(req: Request, res: Response) {
        try {
            const productId = req.params.id;

            const product = await prismaClient.product.delete({
                where: {
                    id: productId
                }
            });
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                })
            }
            res.status(200).json({
                success: true,
                product
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}