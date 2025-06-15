"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion"
import { Button } from './ui/button';
import { LogIn, Menu, UserPlus, X } from 'lucide-react';
import Link from 'next/link';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const navItems = [
        { name: "Home", href: "#" },
        {
            name: "Products", 
            href: "#products",
            submenu: [
                { name: "Laptops", href: "#laptops" },
                { name: "Mobiles", href: "#mobiles" },
                { name: "Accessories", href: "#accessories" },
            ]
        },
        { name: "Categories", href: "#categories" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
        >
            <div className='container mx-auto px-8'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center'>
                            <span className='font-playfair text-white font-bold text-sm'>M</span>
                        </div>
                        <span className="text-xl font-bold font-playfair text-gray-900">MarketPlace</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Menubar className="border-none bg-transparent">
                            {navItems.map((nav, index) => (
                                <MenubarMenu key={index}>
                                    <MenubarTrigger className="text-gray-600 hover:text-gray-900 font-medium font-inter transition-colors duration-300 relative group">
                                        <motion.span whileHover={{ y: -2 }} className="hover:border-b-2 hover:border-gray-900 transition-all duration-300 space-x-4">
                                            {nav.name}
                                        </motion.span>
                                    </MenubarTrigger>
                                    
                                    {nav.submenu && (
                                        <MenubarContent className="bg-white shadow-lg rounded-md border border-gray-200 min-w-[160px]">
                                            {nav.submenu.map((item, subIndex) => (
                                                <MenubarItem key={subIndex} asChild>
                                                    <Link
                                                        href={item.href}
                                                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-sm cursor-pointer transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </MenubarItem>
                                            ))}
                                        </MenubarContent>
                                    )}
                                </MenubarMenu>
                            ))}
                        </Menubar>
                        
                        {/* Direct links for non-submenu items
                        {navItems.filter(item => !item.submenu).slice(1).map((nav, index) => (
                            <motion.a
                                key={index}
                                href={nav.href}
                                whileHover={{ y: -2 }}
                                className="text-gray-600 hover:text-gray-900 font-medium font-inter transition-colors duration-300 relative group"
                            >
                                {nav.name}
                            </motion.a>
                        ))} */}
                    </div>

                    {/* Auth Buttons */}
                    <div className='hidden md:flex items-center gap-4'>
                        <Link href="/auth/login">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="justify-start cursor-pointer font-inter font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                        </Link>
                        <Link href="/auth/signup" >
                            <Button className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white px-4 py-2 font-inter font-medium rounded-full">
                                <UserPlus className="w-4 h-4 mr-2 mt-0.6" />
                                Sign Up
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors'
                    >
                        {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 py-4"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <div key={index}>
                                    <a
                                        href={item.href}
                                        className="text-gray-700 hover:text-gray-900 font-medium font-inter py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors block"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                    {/* Mobile submenu */}
                                    {item.submenu && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <a
                                                    key={subIndex}
                                                    href={subItem.href}
                                                    className="text-gray-600 hover:text-gray-800 text-sm py-1 px-4 rounded-lg hover:bg-gray-50 transition-colors block"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {subItem.name}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {/* Mobile Auth Buttons */}
                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                <Link href="/auth/login">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start font-inter font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/auth/signup">
                                    <Button
                                        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 font-inter font-medium rounded-full w-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;