"use client";
import axios from 'axios';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface ProfileProps {
    storeName: string;
    storeDescription: string;
    logo: string | null;
}

export default function StoreProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);
    const [existingProfile, setExistingProfile] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<ProfileProps>({
        storeName: '',
        storeDescription: '',
        logo: null
    });

    // Fetch existing profile on component mount
    useEffect(() => {
        const checkExistingProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) {
                    throw new Error("Authentication is required");
                }
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data && response.data.vendor) {
                    const { storeName, storeDescription, logo } = response.data.vendor;
                    setFormData({
                        storeName: storeName || '',
                        storeDescription: storeDescription || '',
                        logo: logo || null
                    });

                    if (logo) {
                        setPreviewLogo(logo);
                    }

                    setExistingProfile(true);
                    setIsEditing(false);
                }
            } catch (error) {
                // Profile doesn't exist yet or error fetching
                setExistingProfile(false);
                console.log("No existing profile found or error fetching");
            }
        };

        checkExistingProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview URL
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setPreviewLogo(result);
                setFormData(prev => ({ ...prev, logo: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const endpoint = existingProfile
                ? `${process.env.NEXT_PUBLIC_API_URL}/auth/update/profile`
                : `${process.env.NEXT_PUBLIC_API_URL}/auth/create/profile`;

            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Authorization': `Bearer ${token}` // Make sure you're including your token
                }
            });

            if (response.status === 200 || response.status === 201) {
                toast.success(existingProfile
                    ? 'Profile updated successfully!'
                    : 'Profile created successfully!');
                setExistingProfile(true);
                setIsEditing(false);
            }
        } catch (error: any) {
            console.error('Error saving profile:', error);
            toast.error(error.response?.data?.message || 'Failed to save profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>{existingProfile ? 'Update Store Profile' : 'Create Store Profile'}</title>
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="p-8">
                        {/* Header Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-3xl font-bold text-gray-900">
                                {existingProfile ? 'Update Your Store Profile' : 'Create Your Store Profile'}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {existingProfile
                                    ? 'Update your store information to keep customers informed.'
                                    : 'Let customers know more about your brand and what you offer.'}
                            </p>
                        </motion.div>

                        {!isEditing && existingProfile ? (
                            // View Mode - Display the profile
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gray-50 rounded-lg p-6 mb-6"
                            >
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                        {previewLogo ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={previewLogo}
                                                    alt="Store Logo"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900">{formData.storeName}</h2>
                                        <p className="mt-2 text-gray-700">{formData.storeDescription}</p>
                                    </div>
                                </div>
                                <div className="mt-6 text-right">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            // Edit Mode - Show the form
                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                {/* Logo Upload Section */}
                                <div>
                                    <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 mb-2">
                                        Store Logo
                                    </label>
                                    <div className="flex items-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors"
                                            onClick={handleLogoClick}
                                        >
                                            {previewLogo ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={previewLogo}
                                                        alt="Logo Preview"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            ) : (
                                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                </svg>
                                            )}
                                        </motion.div>

                                        <input
                                            ref={fileInputRef}
                                            id="logo-upload"
                                            name="logo"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleLogoChange}
                                        />

                                        <div className="ml-5">
                                            <p className="text-sm text-gray-500">
                                                Click to upload your store logo
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                PNG, JPG, GIF up to 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Store Name Field */}
                                <div>
                                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Store Name
                                    </label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        type="text"
                                        name="storeName"
                                        id="storeName"
                                        required
                                        value={formData.storeName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                                        placeholder="e.g. Pixel Perfect Crafts"
                                    />
                                </div>

                                {/* Store Description Field */}
                                <div>
                                    <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                        Store Description
                                    </label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.01 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        id="storeDescription"
                                        name="storeDescription"
                                        rows={4}
                                        required
                                        value={formData.storeDescription}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                                        placeholder="Tell customers about your store and what you offer..."
                                    />
                                </div>

                                {/* Buttons Section */}
                                <div className="flex justify-end gap-4">
                                    {existingProfile && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="button"
                                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </motion.button>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className={`px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            existingProfile ? 'Update Profile' : 'Create Profile'
                                        )}
                                    </motion.button>
                                </div>
                            </motion.form>
                        )}
                    </div>
                </motion.div>

                {/* Helper box at the bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="max-w-3xl mx-auto mt-6 bg-blue-50 rounded-lg p-4 flex items-start"
                >
                    <div className="flex-shrink-0 pt-0.5">
                        <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3 text-sm text-blue-700">
                        <p>Your store profile helps build trust with customers. A clear description and professional logo can significantly improve conversion rates.</p>
                    </div>
                </motion.div>
            </div>
        </>
    );
}