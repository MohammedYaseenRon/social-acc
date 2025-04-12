"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    ChevronLeft,
    ChevronRight,
    HelpCircle,
    UserCircle2,
    Bell,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type MenuItem = {
    path: string;
    label: string;
    icon: React.ReactNode;
};

type SidebarProps = {
    className?: string
    menuItems: MenuItem[]
}
type UserProps = {
    id: number,
    name: string,
    email: string,
    role: string
}

const Sidebar: React.FC<SidebarProps> = ({ className, menuItems }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<UserProps | null>(null);
    const router = useRouter();

    const sideBarVariants = {
        exPanded: {
            width: "240px",
        },
        collapsed: {
            width: "70px",

        }
    }
    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem("token");
        router.push("/"); // Change this to your login route
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                });
                setUser(response.data);
            } catch (error) {
                console.log("Error while getting your details", error);
            }
        }
        fetchUser();
    }, []);


    return (
        <motion.div
            className={cn("h-screen flex flex-col bg-black text-white shadow-lg", className)}
            initial="expanded"
            animate={collapsed ? "collapsed" : "expanded"}
            variants={sideBarVariants}
            transition={{ duration: 0.3 }}
        >
            <div className='flex items-center justify-between gap-2 p-2'>
                <motion.div
                    className={`${collapsed ? "hidden" : "flex"} items-center`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: collapsed ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className='text-lg text-blue-600 to text-red-600 font-bold ml-2'>Digimarket</span>
                </motion.div>
                <button
                    onClick={(() => setCollapsed(!collapsed))}
                    className='p-2 rounded-full hover:bg-sidebar-accent text-sidebar-foreground'
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
            <div className='flex-1 overflow-y-auto py-4'>
                <nav className='px-2 space-y-1'>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className='flex items-center p-2 text-sm font-medium rounded-lg hover:bg-blue-700'
                        >
                            {item.icon}
                            {/* <span className={cn("ml-3", collapsed && "hidden")}>{item.label}</span> */}
                            <motion.span
                                className="ml-3 font-medium"
                                initial={{ opacity: 1, display: 'block' }}
                                animate={{
                                    opacity: collapsed ? 0 : 1,
                                    display: collapsed ? 'none' : 'block'
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.label}
                            </motion.span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <UserCircle2 size={32} className="text-sidebar-foreground" />
                    </div>
                    <motion.div
                        className="flex-1 min-w-0"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: collapsed ? 0 : 1, display: collapsed ? 'none' : 'block' }}
                        transition={{ duration: 0.2 }}
                    >
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </motion.div>

                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full hover:bg-red-700 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

        </motion.div>
    );
};

export default Sidebar