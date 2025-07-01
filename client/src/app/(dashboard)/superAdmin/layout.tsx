"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Settings,
    User,
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';

const menu = [
    { path: '/superAdmin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/superAdmin/approve', label: 'Approve', icon: <User size={20} /> },
    { path: '/superAdmin/setting', label: 'Settings', icon: <Settings size={20} /> },
];

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const {user, loading} = useUserStore(); 

    useEffect(() => {
        if(!loading  && (!user || user.role !== "ADMIN")) {
            router.push("/unauthorized");
        }
    }, [user, loading]);

    if(loading || !user) {
        return <div className='p-4'>Checking access...</div>
    }
    
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar menuItems={menu} />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Header name='Store' />
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
    );
};

export default Layout;
