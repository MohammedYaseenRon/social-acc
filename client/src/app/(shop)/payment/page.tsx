"use client";

import { Badge } from '@/components/ui/badge';
import { useCheckoutStore } from '@/store/checoutStore';
import { useCartStore } from '@/store/cartStore';
import formatCurrency from '@/components/formatCurrency';
import { CartItem } from '@/state/types';
import { Truck, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const Payment = () => {
    const { shippingInfo } = useCheckoutStore();
    const { items } = useCartStore();
    const { user } = useUserStore();
    const searchParams = useSearchParams();
    const orderIdsParam = searchParams.get('orderIds');
    const orderIds = orderIdsParam ? orderIdsParam.split(',').map(Number) : [];

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded ✅");
        script.onerror = () => console.error("Razorpay script failed ❌");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    const grouped = items.reduce((acc, item) => {
        const vendorId = item.product.vendorId;
        if (!acc[vendorId]) acc[vendorId] = [];
        acc[vendorId].push(item);
        return acc;
    }, {} as Record<number, CartItem[]>);

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
    const shippingFee = subtotal > 4000 ? 0 : 5.99;
    const grandTotal = subtotal + shippingFee;

    const handlePayment = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
            amount: grandTotal,
            userId: user?.id,
            combinedOrderIds: orderIds
        });
        const { razorpayOrderId, key, amount } = response.data;
        openRazorPayModel({ razorpayOrderId, key, amount });

        console.log("Trigger Razorpay");
    };

    //open razorPayModel
    const openRazorPayModel = ({ razorpayOrderId, amount, key }: { razorpayOrderId: string; amount: number; key: string }) => {
        if (typeof window === "undefined" || !(window as any).Razorpay) {
            toast.error("Razorpay is not loaded yet. Please try again.");
            return;
        }
        const options = {
            key,
            amount,
            currency: "INR",
            name: "MarketPlace",
            description: "Order Payment",
            order_id: razorpayOrderId,
            handler: async function (response: any) {
                const verifyRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`, {
                    ...response,
                    combinedOrderIds: orderIds,
                    userId: user?.id,
                });
                if (verifyRes.status === 200) {
                    toast.success("Payment successful");
                    // router.push("/order-success");
                }
            },
            prefill: {
                name: user?.name,
                email: user?.email,
            },
            theme: { color: "#1e40af" },
        };
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Confirm and Pay
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className='py-6'>
                        <CardHeader>
                            <CardTitle className="text-xl">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {Object.entries(grouped).map(([vendorId, vendorItems]) => {
                                const vendorSubTotal = vendorItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
                                const vendorShipping = vendorSubTotal > 4000 ? 0 : 5.99;
                                const vendorTotal = vendorSubTotal + vendorShipping;

                                return (
                                    <div key={vendorId} className="bg-gray-50 p-4 rounded-lg border shadow-sm">
                                        <h3 className="text-md font-semibold mb-2 text-gray-700">Vendor #{vendorId}</h3>
                                        {vendorItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 mb-3">
                                                <Image
                                                    src={Array.isArray(item.product.images) ? item.product.images[0] : item.product.images}
                                                    alt={item.product.name}
                                                    width={64}
                                                    height={64}
                                                    className="rounded-md object-cover w-16 h-16"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">{item.product.name}</p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                                        <span>{formatCurrency(item.product.price)}</span>
                                                        <X className="w-3 h-3" />
                                                        <Badge variant="outline">{item.quantity}</Badge>
                                                        <span>=</span>
                                                        <span className="font-semibold text-gray-900">
                                                            {formatCurrency(item.product.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="text-sm mt-3 text-gray-700">
                                            <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span>{formatCurrency(vendorSubTotal)}</span>
                                            </div>
                                            {vendorShipping === 0 ? (
                                                <p className="text-green-600 mt-1 text-xs font-medium">
                                                    🎉 You've unlocked free shipping!
                                                </p>
                                            ) : (
                                                <div className="flex justify-between">
                                                    <span>Shipping</span>
                                                    <span>{formatCurrency(vendorShipping)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                                                <span>Total</span>
                                                <span>{formatCurrency(vendorTotal)}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Shipping + Payment */}
                <div className="space-y-6">
                    <Card className='py-6'>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold inline-flex gap-4">
                                <Truck className='w-6 h-6 mt-1' />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-700 space-y-1">
                            <p><strong>Name:</strong> {shippingInfo.name} {shippingInfo.lastName}</p>
                            <p><strong>Email:</strong> {shippingInfo.email}</p>
                            <p><strong>Address:</strong> {shippingInfo.address}</p>
                            <p><strong>City:</strong> {shippingInfo.city}, {shippingInfo.state}</p>
                            <p><strong>Zipcode:</strong> {shippingInfo.zipcode}</p>
                        </CardContent>
                    </Card>

                    <div className='p-4 border rounded-lg'>
                        <div className='flex justify-between'>
                            <h2 className='text-xl font-medium'>Total Payable:</h2>
                            <p className='text-xl font-medium'>{formatCurrency(grandTotal)}</p>
                        </div>
                    </div>

                    <Button className="w-full py-6 text-base" onClick={handlePayment}>
                        Pay {formatCurrency(grandTotal)} Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
