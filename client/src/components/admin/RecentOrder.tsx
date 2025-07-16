import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Orders {
    id: number;
    createdAt: string;
    user: {
        name: string;
    };
    orderItems:{
        productId: number;
    }[];
    totalAmount: number;
    status: string;
}

const containerStyle = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemStyle = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'processing':
            return 'bg-blue-100 text-blue-800';
        case 'refunded':
            return 'bg-red-100 text-red-800';
        case 'pending':
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const RecentOrder = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVendorOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Token not found!");
                return;
            }

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/vendor`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200 && Array.isArray(response.data.orders)) {
                setOrders(response.data.orders);
                toast.success("Orders fetched successfully");
            } else {
                setOrders([]);
                toast.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error while getting orders", error);
            toast.error("Something went wrong while fetching orders");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendorOrder();
    }, []);

    return (
        <motion.div
            className="dashboard-card border border-gray-200 bg-white shadow-md rounded-lg p-4"
            variants={containerStyle}
            initial="hidden"
            animate="show"
        >
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-medium'>Recent Orders</h2>
                <span className='text-sm text-gray-500 cursor-pointer hover:border-b border-gray-400'>
                    See all
                </span>
            </div>

            <div className='overflow-x-auto'>
                <table className='min-w-full'>
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order) => (
                                <motion.tr key={order.id} className='hover:bg-gray-50' variants={itemStyle}>
                                    <td className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.id}</td>
                                    <td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {order.orderItems.map(item => item.productId).join(", ")}
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        {order.user?.name || "Unknown"}
                                    </td>

                                    <td className='px-2 py-4 whitespace-nowrap text-sm text-gray-900'>
                                        ₹{order.totalAmount}
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap'>
                                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className='px-2 py-4 whitespace-nowrap text-right text-sm'>
                                        <button className="p-1 text-gray-500 hover:text-brand-500">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : !loading && (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    No recent orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default RecentOrder;
