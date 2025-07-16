"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Filter, Search, Edit, Trash2, MoreHorizontal, Download, Eye, FileText, Film, Music, Code } from 'lucide-react';
import Link from 'next/link';
import { useProductStore } from '@/store/productStore';
import Image from 'next/image';
import { useUserStore } from '@/store/userStore';
import { NavbarSearch } from '@/components/Search';
import { query } from 'express';
import { useSearchParams } from 'next/navigation';


const getFormatIcon = (format: string) => {
    switch (format) {
        case 'file':
            return <Package size={16} />;
        case 'video':
            return <Film size={16} />;
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
    const { products, loading, error, fetchVendorProducts, updateProduct } = useProductStore();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const handleArchieve = (id: number) => {
        updateProduct(id, {
            isActive: false
        });
    }
    const toggleProductSelection = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id))
        } else {
            setSelectedProducts([...selectedProducts, id])

        }
    }

    const selectAllProducts = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([])
        } else {
            setSelectedProducts(products.map(product => product.id));
        }
    }

    useEffect(() => {
        fetchVendorProducts({ query, page, limit });
    }, [query, page]);

    if (loading) return <p>Loading…</p>;
    if (error) return <p>{error}</p>;


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
                    <Link href="/admin/products/add"><motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-blue-500 text-white px-4 py-2 cursor-pointer flex items-center gap-2 rounded-md hover:bg-blue-600 transition duration-200'>

                        <Plus className='mr-2' size={16} />
                        Add New Product

                    </motion.button></Link>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-border mb-6 p-4">
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 overflow-x-auto'>
                    <div className='max-w-md mx-8'>
                        <NavbarSearch />
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
                                            checked={selectedProducts.length === products.length && products.length > 0}
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

                            {products.map((product) => (
                                <tr key={product.id} className={`hover:bg-gray-50 ${!product.isActive ? "opacity-50" : ""}`}>
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
                                            <div className="relative">
                                                <Image src={Array.isArray(product.images) ? product.images[0] : product.images}
                                                    alt='Product'
                                                    objectFit="cover"
                                                    width={20}
                                                    height={20}
                                                    className='w-16 h-16 rounded-xl'
                                                />
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-white rounded-full p-0.5 shadow">
                                                    <div className="bg-gray-100 rounded-full p-1">
                                                        {getFormatIcon(product.format)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500">{product.category?.name}</div>
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
                                        {product.vendor?.storeName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className='flex flex-col gap-1'>
                                            <span className={`px-2 py-1 text-xs rounded-full capitalize 
                                            ${product.status === 'INSTOCK' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {product.status === 'INSTOCK' ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                            {!product.isActive && (
                                                <span className='px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'>
                                                    Archived
                                                </span>
                                            )}

                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-1 text-gray-400 hover:text-brand-500">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-brand-500">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleArchieve(product.id)} className="p-1 text-gray-400 hover:text-red-500">
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
                    <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                        {products && products.length > 0 && (
                            <div className="flex space-x-2">
                                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50">
                                    Previous
                                </button>
                                <span>{page}</span>
                                <button onClick={() => setPage((prev) => prev + 1)} className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        )}
                        {products && products.length === 0 && (
                            <div className="text-center py-12 text-gray-500 text-lg">
                                No products found.
                            </div>
                        )}

                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default ProductPage