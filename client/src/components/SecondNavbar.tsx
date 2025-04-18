// SecondNavbar.jsx
"use client";
import React, { useEffect, useState } from 'react'
import { Menu, User, Facebook, Twitter, Mail, Linkedin, Send, RefreshCw, Heart, ShoppingCart, LogOut } from "lucide-react";
import { FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SecondNavbar = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null);
    const { user, fetchUsers, loading, error, clearUsers } = useUserStore();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false); // For manual testing
    const [isProfileOpen, setIsProfileOpen] = useState(false); // Added for profile dropdown

    // Add debug logs
    useEffect(() => {
        fetchUsers();
        console.log("Current user:", user);
    }, []);

    const handleLogout = () => {
        clearUsers()
        router.push("/");
    }

    if (loading) return <p>Loading users...</p>
    if (error) return <p className="text-red-500">{error}</p>

    const getInitials = (name: string) => {
        if (!name) return "";
        return name
            .split(/[\s_]+/)
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    }

    return (
        <div className="relative z-10">
            <div className='flex justify-between items-center gap-2 mt-8 w-full bg-blue-100 h-16 p-2'>
                <div className='relative'>
                    <Menu className='absolute top-3 left-2 text-blue-600' />
                    <Button className='border px-10 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300'>All Categories</Button>
                </div>
                <div className="flex items-center gap-2 w-full bg-blue-100">
                    {/* Home Button */}
                    <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                        Home
                    </Button>

                    {/* Our Product Dropdown */}
                    <div
                        className="relative z-20"
                        onMouseEnter={() => setIsHovered("our-product")}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                            Our Product
                        </Button>
                        {isHovered === "our-product" && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-30">
                                <ul className="text-gray-700">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Adsense</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Youtube</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Facebook</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Instagram</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Telegram</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Whatsupp</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Pages Dropdown */}
                    <div
                        className="relative z-20"
                        onMouseEnter={() => setIsHovered("pages")}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                            Pages
                        </Button>
                        {isHovered === "pages" && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-30">
                                <ul className="text-gray-700">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About Us</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQ</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Terms & Conditions</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* My Account Dropdown */}
                    <div
                        className="relative z-20"
                        onMouseEnter={() => setIsHovered("account")}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                            My Account
                        </Button>
                        {isHovered === "account" && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-30">
                                <ul className="text-gray-700">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shop</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cart</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Checkout</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Compare</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Contact Button */}
                    <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                        Contact
                    </Button>
                </div>
                <div className="flex gap-3 text-gray-600">
                    <Facebook size={22} className="cursor-pointer hover:text-blue-500" />
                    <Twitter size={22} className="cursor-pointer hover:text-blue-500" />
                    <Mail size={22} className="cursor-pointer hover:text-blue-500" />
                    <FaPinterestP size={22} className="cursor-pointer hover:text-blue-500" />
                    <Linkedin size={22} className="cursor-pointer hover:text-blue-500" />
                    <FaWhatsapp size={22} className="cursor-pointer hover:text-green-500" />
                    <Send size={22} className="cursor-pointer hover:text-blue-500" />
                </div>

                {/* Right Section - User & Cart Icons */}
                <div className="flex items-center gap-3">

                    {user ? (
                        <div className="relative">
                            <Button 
                                variant="ghost" 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="relative h-10 w-10 p-0 rounded-full bg-white hover:bg-gray-100"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                            </Button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <div className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>My Profile</span>
                                        </div>
                                    </div>
                                    <div 
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                        onClick={handleLogout}
                                    >
                                        <div className="flex items-center">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log Out</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            size="sm"
                            className="hidden sm:inline-flex ml-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            onClick={() => router.push("/auth/signup")}
                        >
                            Sign In
                        </Button>
                    )}

                    {/* Compare Icon with Badge */}
                    <div className="relative bg-white p-2 rounded-full shadow-md cursor-pointer">
                        <RefreshCw size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </div>

                    {/* Wishlist Icon with Badge */}
                    <div className="relative bg-white p-2 rounded-full shadow-md cursor-pointer">
                        <Heart size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </div>

                    {/* Cart Icon with Badge & Price */}
                    <div className="relative flex items-center bg-blue-600 p-2 rounded-full shadow-md cursor-pointer">
                        <ShoppingCart size={20} className="text-white" />
                        <span className="absolute -top-1 -right-1 bg-white text-blue-600 text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondNavbar;