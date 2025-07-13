import { Request, Response } from "express";
import { OrderStatus, PaymentMethod, PaymentStatus, PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";
import { createHmac } from "crypto";
const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID?.trim()!,
  key_secret: process.env.RAZORPAY_KEY_SECRET?.trim()!,
})
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(' Razorpay keys are missing');
}


export const createRazorOrder = async (req: Request, res: Response): Promise<void> => {
  const { amount, userId, combinedOrderIds } = req.body;


  const options = {
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  }
  
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

export const verify = async (req: Request, res: Response): Promise<void> => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    combinedOrderIds,
    userId,
  } = req.body;


  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const expectedSignature = createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ success: false, message: "Invalid signature" });
    return;
  }


  try {
    const agg = await prisma.order.aggregate({
      where: {
        id: {
          in: combinedOrderIds
        }
      },
      _sum: { totalAmount: true }
    });
    const grandTotal = agg._sum.totalAmount ?? 0;

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: grandTotal,
        transactionId: razorpay_payment_id,
        paymentMethod: PaymentMethod.RAZORPAY,
        paymentStatus: PaymentStatus.SUCCESS,
        order: {
          connect: combinedOrderIds.map((id: number) => ({ id }))
        }
      },
    });


    await prisma.order.updateMany({
      where: {
        id: { in: combinedOrderIds },
        userId,
      },
      data: {
        status: OrderStatus.COMPLETED,
        paymentId: payment.id,
      },
    });
    console.log("📦 Orders updated to COMPLETED");


    res.status(200).json({ success: true, message: "Payment verified and orders updated",paymentId: payment.id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error verification" });
  }
};