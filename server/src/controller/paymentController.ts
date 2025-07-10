import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";

const prisma = new PrismaClient();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const createRazorOrder = async (req: Request, res: Response): Promise<void> => {
    const { amount, userId, combinedOrderIds } = req.body;


    const options = {
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
    }
    console.log("Amount in INR:", amount);
    console.log("Converted to paise:", Math.round(amount * 100));
    try {
        const order = await razorpay.orders.create(options);
        res.status(201).json({
            razorpayOrderId: order.id,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID,
            combinedOrderIds,
            userId,
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to create a razorpay order", error })
    }
}