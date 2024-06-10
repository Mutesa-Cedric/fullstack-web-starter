import { z } from "zod";

export const OrderProductSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
});

export const OrderSchema = z.object({
    products: z.array(OrderProductSchema),
    total: z.number(),
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"])
});

export const validateOrder = (order: any) => {
    const orderData = OrderSchema.safeParse(order);
    if (!orderData.success) {
        throw new Error(orderData.error.errors[0].message);
    }
    return orderData.data;
}