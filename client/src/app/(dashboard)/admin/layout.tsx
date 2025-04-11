"use client";
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import React, { ReactNode, useEffect, useState } from 'react'
import { delay, motion } from 'framer-motion'
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    Settings,
    Wallet,
    MessageSquare,
    BarChart4,
    Store,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const menu = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/vendors', label: 'Vendors', icon: <Store size={20} /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart4 size={20} /> },
    { path: '/finances', label: 'Finances', icon: <Wallet size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return router.push("/unauthorized");
        }

        const checkRole = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.role === "VENDOR") {
                    setAuthorized(true);
                } else {
                    router.push("/unauthorized");
                }
            } catch (err) {
                router.push("/unauthorized");
            }
        };

        checkRole();
    }, []);

    if (authorized === null) {
        return <div className="p-4">🔐 Checking access...</div>;
    }
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar menuItems={menu} />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Header />

                <motion.main
                    className="flex-1 overflow-y-auto p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    {children}

                </motion.main>
            </div>

        </div>
    )
}

export default layout