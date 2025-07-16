"use client";
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import React, { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    Package,
    Settings,
    MessageSquare,
    Store,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { SidebarProvider } from '@/components/ui/sidebar';

const menu = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/products', label: 'Products', icon: <Package size={20} /> },
    // { path: '/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    // { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/vendors', label: 'Vendors', icon: <Store size={20} /> },
    { path: '/admin/profile', label: 'Profile', icon: <MessageSquare size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const { fetchUsers, loading, user, initialized } = useUserStore();


    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (initialized && (!user || user.role !== "VENDOR")) {
            router.replace("/unauthorized");  
        }
    }, [initialized, user]);

    if (!initialized || loading) {
        return <div className="p-4">🔐 Checking access…</div>;
    }

    return (
        <SidebarProvider>
            <div className='flex w-full h-screen bg-gray-100'>
                <Sidebar menuItems={menu} />
                <div className='flex-1 flex flex-col overflow-hidden'>
                    <Header name='Admin Dashboard' />

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
        </SidebarProvider>
    )
}

export default layout