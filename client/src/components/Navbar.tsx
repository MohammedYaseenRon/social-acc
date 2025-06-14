"use client";



import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"
import { Button } from './ui/button';
import { LogIn, Menu, UserPlus, X } from 'lucide-react';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();


    const navItems = [
        { name: "Home", href: "#" },
        { name: "Products", href: "#products" },
        { name: "Categories", href: "#categories" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) return;

    //     const interval = setInterval(async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );

    //             const { role } = response.data;

    //             // Handle different roles (if needed)
    //             if (role === "VENDOR") {
    //                 toast.success("You are now a Vendor!");
    //                 router.push("/admin");
    //             } else if (role !== "USER") {
    //                 clearInterval(interval);
    //             }
    //             clearInterval(interval);
    //         } catch (error) {
    //             console.error("Error checking user role", error);
    //         }
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, []);


    // const handleRequest = async () => {
    //     setLoading(true);
    //     setMessage("");

    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         setLoading(false);
    //         setMessage("You must be logged in to request vendor access.");
    //         return;
    //     }
    //     // console.log(token);

    //     try {
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/vendor`, {}, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         setMessage(response.data.message || "Request submitted!");
    //         toast.success("Vendor request sent, Come back after 10minutes");
    //     } catch (error: any) {
    //         toast.error("Error while requesting");
    //         console.log("Error while sending request", error);
    //         if (error.response?.data?.error) {
    //             setMessage(error.response.data.error);
    //         } else {
    //             setMessage("Something went wrong.");
    //         }
    //     }
    // }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
        >
            <div className='container mx-auto px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center'>
                            <span className='font-playfair text-white font-bold text-sm'>M</span>
                        </div>
                        <span className="text-xl font-bold font-playfair text-gray-900">MarketPlace</span>

                    </div>

                    <div className='hidden md:flex items-center gap-6'>
                        {navItems.map((nav, index) => (
                            <motion.a
                                key={index}
                                href={nav.href}
                                whileHover={{ y: -2 }}
                                className="text-gray-600 hover:text-gray-900 font-medium font-inter transition-colors duration-300 relative group"
                            >
                                {nav.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    <div className='hidden md:flex items-center gap-4'>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="font-inter font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                        </Button>
                        <Button
                            size="sm"
                            className="bg-gray-900 hover:bg-gray-800 text-white font-inter font-medium px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Sign Up
                        </Button>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors'
                    >
                        {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 py-4"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="text-gray-700 hover:text-gray-900 font-medium font-inter py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start font-inter font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-inter font-medium rounded-full"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

        </motion.nav>

    );
};

export default Navbar;