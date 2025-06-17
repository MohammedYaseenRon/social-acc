"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"




interface SignupProps {
    name: string,
    email: string,
    password: string,
    role: string
}

export default function Signup() {
    const [formData, setFormData] = useState<SignupProps>({
        name: "",
        email: "",
        password: "",
        role: "USER",

    });
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('user');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            role: activeTab === "vendor" ? "VENDOR" : "USER",
        }));
    }, [activeTab]);
    useEffect(() => {
        console.log("Form Data:", formData);
    }, [formData]);


    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errorMessages: string[] = [];

        if (!formData.name) {
            errorMessages.push('Name is required.');
        }

        if (!formData.email) {
            errorMessages.push('Email is required.');
        }

        // Check if password is empty or too short
        if (!formData.password) {
            errorMessages.push('Password is required.');
        } else if (formData.password.length < 6) {
            errorMessages.push('Password must be at least 6 characters.');
        }
        setErrors(errorMessages);
        return errorMessages.length === 0;

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()) return;
        // Perform signup logic (e.g., API request)

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
            if (response.status === 201) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                setFormData({ name: '', email: '', password: '', role: "USER" });
                router.push("/");
            }
            console.log(response.data);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error during signup", error.message);
                setErrors([error.message]);
            } else {
                console.error("Error during signup", error);
                setErrors(["Something went wrong!"]);
            }
        }

    }

    const [errors, setErrors] = useState<string[]>([]);
    const renderForm = (userType: string) => (
        <Card className="w-full max-w-md shadow-xl rounded-3xl border border-gray-100 bg-white/90 backdrop-blur-md px-2 py-8 transition-all hover:shadow-2xl">
            <CardHeader className="relative">
                <CardTitle className="text-2xl font-medium text-start text-gray-800 tracking-tight">
                    {userType === "user" ? "Join as User" : "Join as a Vendor"}
                </CardTitle>
                <p className="text-start text-sm font-medium text-gray-700 mt-1">Sign in to continue your journey</p>
            </CardHeader>
            <CardContent className="mt-2">
                {errors.length > 0 && (
                    <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-700">Error</AlertTitle>
                        <AlertDescription className="text-red-600">
                            {errors.map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">{userType === "user" ? "Full Name" : "Business Name"}</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={userType === "user" ? "Full Name" : "Business Name"}
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>

                    <div className="relative space-y-2">
                        <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        {showPassword ? (
                            <EyeOff
                                size={18}
                                className="absolute right-3 top-8 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                size={18}
                                className="absolute right-3 top-8 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl py-3 font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-indigo-600 hover:underline font-medium">Log in</a>
                    </p>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} >
                    <TabsList className="grid w-full grid-cols-2 mb-4 h-12 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200">
                        <TabsTrigger value="user" className="rounded-lg font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                        >User</TabsTrigger>
                        <TabsTrigger value="vendor" className="rounded-lg font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                        >Vendor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="user" className="flex items-center justify-center">
                        {renderForm('user')}
                    </TabsContent>
                    <TabsContent value="vendor" className="flex items-center justify-center">
                        {renderForm('vendor')}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}