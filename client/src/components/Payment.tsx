import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Payment = () => {
    return (
        <div>
            <Card className='py-6'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </div>
                        Payment Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className='h-12' />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='space-y-2'>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className='h-12' />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className='h-12' />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" className='h-12' />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Payment