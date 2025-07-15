import React, {Suspense} from "react";
import Payment from "@/components/Payment";


export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading payment page...</div>}>
            <Payment />
        </Suspense>
    )
}