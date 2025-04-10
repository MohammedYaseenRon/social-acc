"use client";



import React, { useEffect, useState } from 'react';
import { Earth, Menu, Phone, SearchIcon, User } from "lucide-react";
import { Input } from './ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkScreensize = () => {
            setIsMobile(window.innerWidth < 1327);
        };

        checkScreensize();

        window.addEventListener('resize', checkScreensize);
        return () => window.removeEventListener('resize', checkScreensize);
    }, []);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowText(true);
    //     }, 3500);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                const { role } = response.data;
    
                // Handle different roles (if needed)
                if (role === "VENDOR") {
                    toast.success("You are now a Vendor!");
                    router.push("/admin");
                }else if(role !== "USER"){
                    clearInterval(interval);
                }
                clearInterval(interval);
            } catch (error) {
                console.error("Error checking user role", error);
            }
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);
    

    const handleRequest = async () => {
        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            setMessage("You must be logged in to request vendor access.");
            return;
        }
        // console.log(token);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/vendor`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(response.data.message || "Request submitted!");
            toast.success("Vendor request sent, Come back after 10minutes");
        } catch (error: any) {
            toast.error("Error while requesting");
            console.log("Error while sending request", error);
            if (error.response?.data?.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("Something went wrong.");
            }
        }
    }

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
                        <div className='flex items-center gap-2'>
                            <button
                                onClick={handleRequest}
                                className='bg-white text-black px-4 py-2 border rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={loading}
                            >
                                <User size={20} className='inline-flex' />
                                {loading ? "Requesting..." : "Request Vendor"}
                            </button>
                        </div>

                        {message && (
                            <p className="mt-2 text-sm text-gray-600">{message}</p>
                        )}

                        {/* {showText && (
                            <div className="absolute right-4 mt-2 bg-white rounded-lg shadow-md p-2 animate-text-fade z-10">
                                <div className="flex flex-col items-end cursor-pointer">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-gray-800">
                                            If you want to become vendor then
                                        </span>
                                        <User size={14} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-bold text-blue-600">
                                        request admin
                                    </span>
                                </div>
                            </div>
                        )} */}

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
            {/* {showText && (
                <div className="absolute right-4 mt-2 bg-white rounded-lg shadow-md p-2 animate-text-fade z-10">
                    <div className="flex flex-col items-end cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-800">
                                If you want to become vendor then
                            </span>
                            <User size={14} className="text-blue-600" />
                        </div>
                        <span className="text-xs font-bold text-blue-600">
                            request admin
                        </span>
                    </div>
                </div>
            )} */}
            <div className='flex items-center gap-2'>
                <button onClick={handleRequest} className='bg-white text-black px-4 py-2 border rounded-lg'>
                    <User size={24} className='inline-flex mb-1' />
                    Request Vendor
                </button>
            </div>
        </div>
    );
};

export default Navbar;