import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { validateOrder } from "./orderValidator";


const prismaClient = new PrismaClient();

export default class OrdersController {
    public static async createOrder(req: Request, res: Response) {
        try {
            const order = validateOrder(req.body);
            const createdBy = await prismaClient.user.findUnique({
                where: {
                    // @ts-ignore
                    id: req.user
                }
            })
            if (!createdBy) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const newOrder = await prismaClient.order.create({
                data: {
                    ...order,
                    createdBy: { connect: { id: createdBy.id } },
                    products: { create: order.products }
                }
            });

            res.status(201).json({
                success: true,
                newOrder
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async getOrders(req: Request, res: Response) {
        try {
            const createdBy = await prismaClient.user.findUnique({
                where: {
                    // @ts-ignore
                    id: req.user
                }
            })
            if (!createdBy) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const orders = await prismaClient.order.findMany({
                where: {
                    createdBy: { id: createdBy.id }
                },
                include: {
                    products: true
                }
            });

            res.status(200).json({
                success: true,
                orders
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async deleteOrder(req: Request, res: Response) {
        try {
            const orderId = req.params.id;
            const createdBy = await prismaClient.user.findUnique({
                where: {
                    // @ts-ignore
                    id: req.user
                }
            });
            if (!createdBy) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const order = await prismaClient.order.delete({
                where: {
                    id: orderId
                }
            });
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Order deleted successfully"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }

    public static async updateOrderStatus(req: Request, res: Response) {
        try {
            const orderId = req.params.id;
            const status = req.body.status;
            const createdBy = await prismaClient.user.findUnique({
                where: {
                    // @ts-ignore
                    id: req.user
                }
            });
            if (!createdBy) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const order = await prismaClient.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status
                }
            });
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Order status updated successfully"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    }
}