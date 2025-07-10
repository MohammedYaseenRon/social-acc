import React from 'react'

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
}

export default formatCurrency