"use client";



import React, { useEffect, useState } from 'react';
import { Earth, Menu, Phone, SearchIcon, User, Facebook, Twitter, Mail, Linkedin, Send, RefreshCw, Heart, ShoppingCart } from "lucide-react";
import { FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { Input } from './ui/input';
import { Button } from './ui/button';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreensize = () => {
            setIsMobile(window.innerWidth < 1327);
        };

        checkScreensize();

        window.addEventListener('resize', checkScreensize);
        return () => window.removeEventListener('resize', checkScreensize);
    }, []);

    // Desktop layout
    if (!isMobile) {
        return (
            <div className="w-full bg-white px-4 md:px-20 py-2">
                <div className="flex items-center justify-between">
                    {/* Logo & Tagline */}
                    <div className="py-1">
                        <h1 className="text-xl md:text-3xl font-semibold">
                            Social's <span className="text-red-700">Account</span>
                        </h1>
                        <p className="text-sm">Biggest marketplace for buy and sell</p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-3xl mx-8 relative">
                        <SearchIcon size={20} className="absolute left-3 top-3 text-gray-500" />
                        <Input
                            type="text"
                            className="w-full rounded-full pl-10 h-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Search..."
                        />
                    </div>

                    {/* Contact & Services */}
                    <div className="flex items-center gap-12">
                        {/* Support */}
                        <div className="flex items-center gap-2">
                            <Phone size={20} />
                            <div>
                                <h2 className="text-base">24 <span className="text-blue-600">Support</span></h2>
                                <p className="text-blue-600 text-base">+91-9080890059</p>
                            </div>
                        </div>

                        {/* Worldwide Service */}
                        <div className="flex items-center gap-2">
                            <Earth size={20} />
                            <div>
                                <h2 className="text-base text-gray-600">Worldwide</h2>
                                <p className="font-medium text-blue-600 text-base">Services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile layout
    return (
        <div className="w-full bg-white shadow-sm px-4">
            {/* Top section with logo and menu */}
            <div className="flex items-center justify-between py-3">
                <Menu size={24} className="text-blue-600" />
                <div className="text-center">
                    <h1 className="text-xl font-semibold">
                        Social's <span className="text-red-700">Account</span>
                    </h1>
                </div>
                <User size={20} />
            </div>

            {/* Search bar below logo */}
            <div className="pb-4 relative">
                <SearchIcon size={20} className="absolute left-3 top-3 text-gray-500" />
                <Input
                    type="text"
                    className="w-full rounded-full pl-10 h-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search..."
                />
            </div>
        </div>
    );
};

export default Navbar;