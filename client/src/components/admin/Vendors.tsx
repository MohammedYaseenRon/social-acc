import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight } from 'lucide-react'

const mockVendors = [
    {
        id: 1,
        name: 'DesignCo',
        avatar: '/placeholder.svg',
        products: 15,
        revenue: '$2,540.00',
        status: 'active',
        growth: '+12%'
    },
    {
        id: 2,
        name: 'CodeMasters',
        avatar: '/placeholder.svg',
        products: 8,
        revenue: '$1,820.00',
        status: 'active',
        growth: '+8%'
    },
    {
        id: 3,
        name: 'PixelPerfect',
        avatar: '/placeholder.svg',
        products: 22,
        revenue: '$4,120.00',
        status: 'active',
        growth: '+15%'
    },
    {
        id: 4,
        name: 'MarketPro',
        avatar: '/placeholder.svg',
        products: 6,
        revenue: '$980.00',
        status: 'pending',
        growth: '+5%'
    },
];

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
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};
const Vendors = () => {
    return (
        <motion.div
            className="dashboard-card border border-gray-200 bg-white shadow-md rounded-lg p-4"
            variants={containerStyle}
            initial="hidden"
            animate="show"
        >
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-medium'>Top Vendors</h2>
                <span className='text-sm text-gray-700 cursor-pointer hover:border-b border-gray-400'>View all
                    <ArrowUpRight className='inline-block ml-1 mb-1.5' size={16} />
                </span>
            </div>
            <div className='space-y-4'>
                {mockVendors.map((vendor) => (
                    <motion.div
                        key={vendor.id}
                        variants={item}
                        className='flex items-center p-4'
                    >
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">
                            <img src={vendor.avatar} alt={vendor.name} className="h-full w-full object-cover" />
                        </div>

                        <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                                <h3 className="text-sm font-medium">{vendor.name}</h3>
                                <span className="text-sm font-medium text-green-600">{vendor.growth}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">{vendor.products} products</span>
                                <span className="text-xs font-medium">{vendor.revenue}</span>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Vendors