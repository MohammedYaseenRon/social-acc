import { z } from 'zod';

export const orderItemSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1),
    price: z.number().min(0),
});

export const shippingInfoSchema = z.object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipcode: z.string().min(4),
});

export const orderSchema = z.object({
    totalAmount: z.number().min(0),
    shippingFee: z.number().min(0),
    userId:z.number(),
    vendorId: z.number(),
    orderItems: z.array(orderItemSchema).min(1),
    shippingAddress: shippingInfoSchema
})