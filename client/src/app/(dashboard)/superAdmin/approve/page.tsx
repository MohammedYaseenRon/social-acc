import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Approve = () => {
    // Sample static data (replace with real fetched user data)
    const users = [
        {
            id: 1,
            email: 'johndoe@example.com',
            role: 'Vendor',
            status: 'Pending',
        },
        {
            id: 2,
            email: 'janedoe@example.com',
            role: 'Vendor',
            status: 'Approved',
        },
    ];

    return (
        <div className='max-w-6xl h-auto mx-auto bg-white border space-y-6 p-6 rounded-lg shadow-md'>
            <div className='space-y-1'>
                <h1 className='text-3xl text-gray-800 font-semibold'>User Management</h1>
                <p className='text-base text-gray-500'>Manage vendors and their access levels</p>
            </div>

            <div className='space-y-2'>
                <Label htmlFor='user' className='text-lg font-medium text-gray-700'>
                    Search User
                </Label>
                <Input
                    type='text'
                    id='user'
                    placeholder='Search by name or email'
                    className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>

            <div className='w-full overflow-auto rounded-lg border'>
                <table className='w-full table-auto text-sm'>
                    <thead className='bg-gray-100 text-gray-700'>
                        <tr>
                            <th className='p-4 text-left'>Email</th>
                            <th className='p-4 text-left'>Role</th>
                            <th className='p-4 text-left'>Status</th>
                            <th className='p-4 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className='border-t hover:bg-gray-50'>
                                <td className='p-4'>{user.email}</td>
                                <td className='p-4'>{user.role}</td>
                                <td className='p-4'>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Approved'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className='flex items-center gap-2 p-4 space-x-2'>
                                    <Button className='bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100'>
                                        <User
                                            size={20}
                                            className='text-blue-600 cursor-pointer'

                                        />
                                    </Button>

                                    <Button className='bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 '><Trash2 size={20} className='text-blue-600 cursor-pointer'/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Approve;
