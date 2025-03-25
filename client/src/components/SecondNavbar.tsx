"use client";
import React, { useState } from 'react'
import { Earth, Menu, Phone, SearchIcon, User, Facebook, Twitter, Mail, Linkedin, Send, RefreshCw, Heart, ShoppingCart } from "lucide-react";
import { FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { Button } from './ui/button';

const SecondNavbar = () => {
    const [isHovered, setIsHovered] = useState<string | null>(null)


    return (
        <div className='pl-18'>
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
                        className="relative"
                        onMouseEnter={() => setIsHovered("our-product")}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                            Our Product
                        </Button>
                        {isHovered === "our-product" && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-opacity duration-300 p-2">
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
                        className="relative"
                        onMouseEnter={() => setIsHovered("pages")}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                            Pages
                        </Button>
                        {isHovered === "pages" && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-opacity duration-300 p-2">
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
                        className="relative"
                        onMouseEnter={() => setIsHovered("account")}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <Button className="border px-4 py-6 rounded-full bg-white text-black text-lg hover:bg-gray-300">
                            My Account
                        </Button>
                        {isHovered === "account" && (
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-opacity duration-300 p-2">
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

                    {/* Profile Icon */}
                    <div className="relative bg-white p-2 rounded-full shadow-md cursor-pointer">
                        <User size={20} className="text-gray-600" />
                    </div>

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

                    {/* Price Text */}
                    <p className="text-black font-medium">₹4,999.00</p>

                </div>

            </div>
        </div>
    )
}

export default SecondNavbar