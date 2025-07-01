'use client';

import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";


import React from 'react'

const CartIntializer = () => {
    const { fetchCart } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return null;
}

export default CartIntializer
