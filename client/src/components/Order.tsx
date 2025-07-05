"use client";

import { useCartStore } from '@/store/cartStore'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const Order = () => {
    const { items } = useCartStore();

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("en-IN", {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    }

    //price
    const subtotal = (items ?? []).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-base text-black font-medium'>Order summary</CardTitle>
            </CardHeader>
            <CardContent>
                {items.map((item) => (
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
                <div className="border rounded-lg p-4 mt-4">
                    <div className="flex justify-between py-1">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Shipping</span>
                        <span>{formatCurrency(shipping)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold text-lg border-t mt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>
                <div className='mt-2'>
                    <Button className='w-full cursor-pointer hover:bg-gray-900'>Place Order</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Order