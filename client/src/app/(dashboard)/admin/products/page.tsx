"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Filter, Search, Edit, Trash2, MoreHorizontal, Download, Eye,FileText,Film,Image,Music,Code } from 'lucide-react';

const mockProducts = [
    {
        id: 1,
        name: 'Premium UI Kit Bundle',
        image: '/placeholder.svg',
        type: 'Design Template',
        category: 'UI Kits',
        price: '$49.99',
        sales: 128,
        vendor: 'DesignCo',
        status: 'active',
        format: 'file'
    },
    {
        id: 2,
        name: 'JavaScript Course 2023',
        image: '/placeholder.svg',
        type: 'Course',
        category: 'Programming',
        price: '$89.99',
        sales: 97,
        vendor: 'CodeMasters',
        status: 'active',
        format: 'video'
    },
    {
        id: 3,
        name: 'Stock Photo Collection',
        image: '/placeholder.svg',
        type: 'Media',
        category: 'Photography',
        price: '$29.99',
        sales: 215,
        vendor: 'PixelPerfect',
        status: 'active',
        format: 'image'
    },
    {
        id: 4,
        name: 'Marketing eBook Bundle',
        image: '/placeholder.svg',
        type: 'eBook',
        category: 'Marketing',
        price: '$19.99',
        sales: 63,
        vendor: 'MarketPro',
        status: 'pending',
        format: 'document'
    },
    {
        id: 5,
        name: 'Podcast Series: Growth Hacking',
        image: '/placeholder.svg',
        type: 'Audio',
        category: 'Business',
        price: '$24.99',
        sales: 42,
        vendor: 'GrowthGurus',
        status: 'active',
        format: 'audio'
    },
    {
        id: 6,
        name: 'ReactJS Component Library',
        image: '/placeholder.svg',
        type: 'Code',
        category: 'Web Development',
        price: '$39.99',
        sales: 87,
        vendor: 'CodeCrafters',
        status: 'active',
        format: 'code'
    },
];

const getFormatIcon = (format: string) => {
    switch (format) {
        case 'file':
            return <Package size={16} />;
        case 'video':
            return <Film size={16} />;
        case 'image':
            return <Image size={16} />;
        case 'document':
            return <FileText size={16} />;
        case 'audio':
            return <Music size={16} />;
        case 'code':
            return <Code size={16} />;
        default:
            return <Package size={16} />;
    }
};

const ProductPage = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const toggleProductSelection = (id:number) => {
        if(selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id))
        }else{
            setSelectedProducts([...selectedProducts, id])

        }
    }

    const selectAllProducts = () => {
        if(selectedProducts.length === mockProducts.length) {
            setSelectedProducts([])
        }else{
            setSelectedProducts(mockProducts.map(product => product.id));
        }
    }

    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between mb-6'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className='text-3xl font-bold text-black'>Products</h2>
                    <p className='text-base font-medium text-gray-400'>Manage your digital products</p>
                </motion.div>
                <div>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-blue-500 text-white px-4 py-2 flex items-center gap-2 rounded-md hover:bg-blue-600 transition duration-200'>

                        <Plus className='mr-2' size={16} />
                        Add New Product

                    </motion.button>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-border mb-6 p-4">
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0'>
                    <div className='w-full relative md:w-80'>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-2 border border-gray-200 rounded-lg flex items-center hover:bg-gray-50">
                                <Filter size={16} className="mr-2 text-gray-500" />
                                <span>Filters</span>
                            </button>

                            <select className="px-3 py-2 border border-gray-200 rounded-lg bg-white">
                                <option>All Categories</option>
                                <option>UI Kits</option>
                                <option>Programming</option>
                                <option>Photography</option>
                                <option>Marketing</option>
                                <option>Business</option>
                                <option>Web Development</option>
                            </select>

                            <select className="px-3 py-2 border border-gray-200 rounded-lg bg-white">
                                <option>All Vendors</option>
                                <option>DesignCo</option>
                                <option>CodeMasters</option>
                                <option>PixelPerfect</option>
                                <option>MarketPro</option>
                                <option>GrowthGurus</option>
                                <option>CodeCrafters</option>
                            </select>
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-brand-500 border-gray-300 rounded"
                                            checked={selectedProducts.length === mockProducts.length && mockProducts.length > 0}
                                            onChange={selectAllProducts}
                                        />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sales
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vendor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-brand-500 border-gray-300 rounded"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => toggleProductSelection(product.id)}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 relative">
                                                <img className="h-10 w-10 rounded-md object-cover" src={product.image} alt="" />
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-white rounded-full p-0.5 shadow">
                                                    <div className="bg-gray-100 rounded-full p-1">
                                                        {getFormatIcon(product.format)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500">{product.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.price}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.sales}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.vendor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-1 text-gray-400 hover:text-brand-500">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-brand-500">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-red-500">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-gray-700">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">12</span> products
                        </div>

                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                                Previous
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-500 text-white hover:bg-brand-600">
                                1
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ProductPage