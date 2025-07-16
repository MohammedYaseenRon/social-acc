import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { orderSchema } from "../validators/types";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response): Promise<void> => {

    const result = orderSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ message: "Validation failed", errors: result.error.format() });
        return;
    }
    const { totalAmount, shippingFee, shippingAddress, userId, vendorId, orderItems } = result.data;
    if (totalAmount === undefined || !shippingAddress || shippingFee === undefined || !userId || !vendorId || !orderItems) {
        res.status(404).json({ message: "Missing one of the fields" });
        return;
    }
    try {
        const createShipping = await prisma.shippingInfo.create({
            data: {
                ...shippingAddress,
            }
        });

        const order = await prisma.order.create({
            data: {
                totalAmount,
                shippingFee,
                shippingAddressId: createShipping.id,
                userId,
                vendorId,
                orderItems: {
                    create: orderItems,
                }
            },
            include: {
                orderItems: true,
                shippingAddress: true
            }
        });

        await prisma.shippingInfo.update({
            where: {
                id: createShipping.id,
            },
            data: {
                orderId: order.id
            }
        })

        if (order.shippingAddress) {
            order.shippingAddress.orderId = order.id;
        }
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Internal server error while creating Orders" });
    }
}

export const getVendorOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const vendor = await prisma.vendor.findUnique({
            where: { userId: req.user!.id },
            select: { id: true },
        });
        if (!vendor) {
            res.status(404).json({ message: "Vendor profile not found" });
            return;
        }
        const orders = await prisma.order.findMany({
            where: {
                vendorId: vendor.id
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 5,
            include:{
                shippingAddress:true,
                user:true,
                orderItems:true
            }

        });
        res.status(200).json({ orders });

    } catch (error) {
        res.status(500).json({ message: "Internal server error while getting orders" });
    }
}


export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include:{
                shippingAddress:true,
                user:true,
                orderItems:true,
                vendor:true
            }

        });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Internal server error while getting orders" });
    }
}

