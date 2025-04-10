"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { Trash2, User, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VendorRequest {
    id: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    user: {
        id: number;
        name: string;
        email: string;
    };
}

const Approve = () => {
    const [requests, setRequests] = useState<VendorRequest[]>([]);
    const [search, setSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [users, setUsers] = useState<any[]>([]); // You'll need to define a proper User interface

    const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        const fetchVendorRequests = async () => {
            if (!localToken) return;
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/vendor`, {
                    headers: {
                        Authorization: `Bearer ${localToken}`,
                    },
                    withCredentials: true,
                });
                setRequests(response.data);
            } catch (error) {
                console.error("Error while getting vendor requests", error);
            }
        };
        fetchVendorRequests();
    }, [localToken]);

    const handleAction = async (id: number, status: 'APPROVED' | 'REJECTED') => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/vendor/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localToken}`,
                    },
                    withCredentials: true,
                }
            );
            setRequests((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status } : r))
            );
        } catch (error) {
            console.error(`Failed to ${status.toLowerCase()} request`, error);
        }
    };

    const filteredRequests = requests.filter((r) =>
        r.user.email.toLowerCase().includes(search.toLowerCase()) ||
        r.user.name?.toLowerCase().includes(search.toLowerCase())
    );

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.name?.toLowerCase().includes(userSearch.toLowerCase())
    );

    return (
        <div className='max-w-7xl h-auto mx-auto bg-white border space-y-6 p-6 rounded-lg shadow-md'>
            <div className='space-y-1'>
                <h1 className='text-3xl text-gray-800 font-semibold'>Admin Dashboard</h1>
                <p className='text-base text-gray-500'>Manage users and vendor requests</p>
            </div>

            <Tabs defaultValue="vendors" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                </TabsList>
                
                <TabsContent value="vendors" className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor='vendor-search' className='text-lg font-medium text-gray-700'>
                            Search Vendor Requests
                        </Label>
                        <Input
                            type='text'
                            id='vendor-search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search by name or email'
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='w-full overflow-auto rounded-lg border'>
                        <table className='w-full table-auto text-sm'>
                            <thead className='bg-gray-100 text-gray-700'>
                                <tr>
                                    <th className='p-4 text-left'>Email</th>
                                    <th className='p-4 text-left'>Name</th>
                                    <th className='p-4 text-left'>Status</th>
                                    <th className='p-4 text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((req) => (
                                    <tr key={req.id} className='border-t hover:bg-gray-50'>
                                        <td className='p-4'>{req.user.email}</td>
                                        <td className='p-4'>{req.user.name}</td>
                                        <td className='p-4'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    req.status === 'APPROVED'
                                                        ? 'bg-green-100 text-green-700'
                                                        : req.status === 'REJECTED'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className='flex items-center gap-2 p-4'>
                                            {req.status === "PENDING" && (
                                                <>
                                                    <Button
                                                        onClick={() => handleAction(req.id, 'APPROVED')}
                                                        className='p-2 bg-green-100 hover:bg-green-200'
                                                    >
                                                        <CheckCircle2 size={20} className='text-green-700' />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleAction(req.id, 'REJECTED')}
                                                        className='p-2 bg-red-100 hover:bg-red-200'
                                                    >
                                                        <XCircle size={20} className='text-red-700' />
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
                
                <TabsContent value="users" className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor='user-search' className='text-lg font-medium text-gray-700'>
                            Search Users
                        </Label>
                        <Input
                            type='text'
                            id='user-search'
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                            placeholder='Search by name or email'
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='w-full overflow-auto rounded-lg border'>
                        <table className='w-full table-auto text-sm'>
                            <thead className='bg-gray-100 text-gray-700'>
                                <tr>
                                    <th className='p-4 text-left'>Email</th>
                                    <th className='p-4 text-left'>Name</th>
                                    <th className='p-4 text-left'>Role</th>
                                    <th className='p-4 text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className='border-t hover:bg-gray-50'>
                                        <td className='p-4'>{user.email}</td>
                                        <td className='p-4'>{user.name}</td>
                                        <td className='p-4'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                user.role === 'ADMIN' 
                                                    ? 'bg-purple-100 text-purple-700' 
                                                    : user.role === 'VENDOR' 
                                                        ? 'bg-blue-100 text-blue-700' 
                                                        : 'bg-gray-100 text-gray-700'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className='p-4'>
                                            <Button
                                                className='p-2 bg-red-100 hover:bg-red-200'
                                                onClick={() => {
                                                    /* Implement user delete/ban functionality */
                                                    console.log("Delete user", user.id);
                                                }}
                                            >
                                                <Trash2 size={20} className='text-red-700' />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Approve;