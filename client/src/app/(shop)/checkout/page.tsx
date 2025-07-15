"use client";

import CheckoutPage from '@/components/CheckoutPage'
import Order from '@/components/Order';
import { useCartStore } from '@/store/cartStore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react'

const Checkout = () => {

    const { fetchCart } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, []);
    return (
        <div className='p-24'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center gap-2 mb-4'>
                    <Link href="/products"><ArrowLeft className='w-6 h-6' /></Link>
                    <span className='text-black text-lg font-bold'>Back to products</span>
                </div>
                <div className='flex flex-col mb-4'>
                    <h1 className='text-black text-xl lg:text-3xl font-bold'>Checkout</h1>
                    <p className='text-gray-600 font-medium'>complete your order</p>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 space-y-6'>
                        <CheckoutPage />
                    </div>
                    <div className='space-y-6'>
                        <Order />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout;
