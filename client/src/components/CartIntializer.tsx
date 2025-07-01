'use client';

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";


import React from 'react'

const CartIntializer = () => {
    const { fetchCart } = useCartStore();
    const {user,loading} = useUserStore();

    useEffect(() => {
        if(!loading && user?.role == "USER") {
            fetchCart();
        }
    }, [user, fetchCart]);

    return null;
}

export default CartIntializer
