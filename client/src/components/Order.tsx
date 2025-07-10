"use client";

import { useCartStore } from '@/store/cartStore'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useCheckoutStore } from '@/store/checoutStore';
import { CartItem, OrderItemPayload, OrderPayload } from '@/state/types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

const Order = () => {
    const { items } = useCartStore();
    const { user } = useUserStore();
    const { shippingInfo } = useCheckoutStore();
    const router = useRouter();

    if (!user || !user.id) {
        toast.error("User not logged in");
        return <div>loading...</div>
    }

    const grouped = items.reduce((acc, item) => {
        const vendorId = item.product.vendorId;
        if (!acc[vendorId]) {
            acc[vendorId] = [];
        };
        acc[vendorId].push(item);
        return acc;
    }, {} as Record<number, CartItem[]>);


    const handleOrder = async () => {
        const allOrderIds: number[] = [];
        for (const [vendorId, vendorItems] of Object.entries(grouped)) {
            const orderItems: OrderItemPayload[] = vendorItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price

            }));

            //total amount
            const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const shippingFee = total > 4000 ? 0 : 5.99;
            const totalAmount = total + shippingFee;

            //order payload
            const orderPayload: OrderPayload = {
                userId: user.id,
                vendorId: Number(vendorId),
                orderItems: orderItems,
                totalAmount,
                shippingFee,
                shippingAddress: shippingInfo,

            }
            console.log("orderPayload", orderPayload);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderPayload);
                if (response.status == 201) {
                    toast.success("Order created successfully");
                    allOrderIds.push(response.data.id);
                    router.push(`/payment?orderIds=${allOrderIds.join(",")}`);
                }
            } catch (error: any) {
                console.log("Order Failed", error.response?.data || error.message);
            }


        }
    }

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("en-IN", {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    }

    //price
    const subtotal = (items ?? []).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 4000 ? 0 : 5.99;
    const total = subtotal + shipping;
    return (
        <Card className='py-6'>
            <CardHeader>
                <CardTitle className='text-base text-black font-medium'>Order summary</CardTitle>
            </CardHeader>
            <CardContent className='mb-4'>

                {Object.entries(grouped).map(([vendorId, vendorItems]) => {
                    const vendorSubtoal = vendorItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
                    const vendorShipping = vendorSubtoal > 4000 ? 0 : 5.99;
                    const vendorTotal = vendorSubtoal + vendorShipping;
                    return (
                        <div key={vendorId} className='mb-6 border p-4 rounded-lg'>
                            {vendorItems.map((item) => (
                                <div key={item.id} className='flex items-center gap-3 p-3 border rounded-lg mb-2'>
                                    <div>
                                        <Image src={Array.isArray(item.product.images) ? item.product.images[0] : item.product.images} alt='Order'
                                            objectFit="cover"
                                            width={100}
                                            height={100}
                                            className='w-16 h-16 rounded-xl'
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                                        <div className='flex items-center gap-2 border rounded-sm mt-1 p-1'>
                                            <span className='text-xs mt-1 text-black font-bold'>{formatCurrency(item.product.price)}</span>
                                            <span className='text-xs mt-2 text-black font-bold'><X className='w-3 h-3' /></span>
                                            <Badge variant="outline" className="text-xs mt-1">
                                                {item.quantity}
                                            </Badge>
                                            <span className='text-xs mt-2 text-black font-bold'>=</span>
                                            <span className='text-sm mt-1 text-black font-bold'>{formatCurrency(item.product.price * item.quantity)}</span>
                                        </div>
                                    </div>

                                </div>
                            ))}

                            <div className='mt-3 text-sm'>
                                <div className='flex justify-between'>
                                    <span>SubTotal</span>
                                    <span>{formatCurrency(vendorSubtoal)}</span>
                                </div>
                                {vendorShipping === 0 ? (
                                    <p className="text-green-600 font-medium mt-1">You've unlocked free shipping!</p>
                                ) : (
                                    <div className="flex justify-between mt-1">
                                        <span>Shipping</span>
                                        <span>{formatCurrency(vendorShipping)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-semibold border-t mt-2 pt-1">
                                    <span>Total</span>
                                    <span>{formatCurrency(vendorTotal)}</span>
                                </div>
                            </div>
                        </div>
                    )

                })}
                {(items.length > 0) ? (
                    <div className='border rounded-lg p-4 mt-4'>
                        <div className='flex justify-between text-sm'>
                            <span>GrandTotal</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <div className='mt-3'>
                            <Button onClick={handleOrder} className='w-full cursor-pointer hover:bg-gray-900'>Place Order</Button>
                        </div>
                    </div>
                ) : (
                    <p>No items available</p>
                )}
            </CardContent>
        </Card>
    )
}

export default Order