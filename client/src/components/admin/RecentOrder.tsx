import React from 'react'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'

const mockOrders = [
    {
        id: "#ORD-1234",
        date: "20-09-2023",
        customer: "John Doe",
        product: 'Facebook 2023',
        amount: "$400",
        status: "completed",
    },
    {
        id: '#ORD-1235',
        date: '2023-09-09',
        customer: 'Jane Smith',
        product: 'JavaScript Course 2023',
        total: '$89.99',
        status: 'processing'
    },
    {
        id: '#ORD-1236',
        date: '2023-09-08',
        customer: 'Bob Johnson',
        product: 'Stock Photo Collection',
        total: '$29.99',
        status: 'completed'
    },
    {
        id: '#ORD-1237',
        date: '2023-09-07',
        customer: 'Alice Brown',
        product: 'Marketing eBook Bundle',
        total: '$19.99',
        status: 'refunded'
    },
]

const containerStyle = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
    }
}
const itemStyle = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    show: {
        opacity: 1,
        y: 0,
    }
}
const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'processing':
            return 'bg-blue-100 text-blue-800';
        case 'refunded':
            return 'bg-red-100 text-red-800';
        case 'pending':
            return 'bg-gray-100 text-gray-800';
    }
}

const RecentOrder = () => {
    return (
        <motion.div
            className="dashboard-card border border-gray-200 bg-white shadow-md rounded-lg p-4"
            variants={containerStyle}
            initial="hidden"
            animate="show"
        >
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-medium'>Recent Products</h2>
                <span className='text-sm text-gray-500 cursor-pointer hover:border-b border-gray-400'>See all</span>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full'>
                    <thead>
                        <tr className='border-b border-gray-200'>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map((order) => (
                            <motion.tr key={order.id} className='hover:bg-gray-50' variants={itemStyle}>
                                <td className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.id}</td>
                                <td className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.date}</td>
                                <td className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.customer}</td>
                                <td className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.product}</td>
                                <td className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{order.total}</td>
                                <td className='px-2 py-4 whitespace-nowrap'>
                                    <span className={`px-2 py-1 text=xs rounded-full capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className='px-2 py-4 whitesapce-nowrap text-right text-sm font-medium'>
                                    <button className="p-1 text-gray-500 hover:text-brand-500">
                                        <Eye size={16} />
                                    </button>
                                </td>

                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </motion.div>
    )
}

export default RecentOrder