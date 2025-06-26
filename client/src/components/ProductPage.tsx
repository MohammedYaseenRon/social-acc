"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import { ProductProps } from '@/state/types';
import RelatedProducts from './RelatedProduct';

interface ProductPageClientProps {
    product: ProductProps;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Handle images
    const images = Array.isArray(product.images) ? product.images :
        product.images ? [product.images] : [];

    const onAddToCart = () => {
        // Add your cart logic here
        console.log(`Adding ${quantity} of ${product.name} to cart`);
    };

    const onBuyNow = () => {
        // Add your buy now logic here
        console.log(`Buying ${quantity} of ${product.name}`);
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                {/* Product Images */}
                {images.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
                            <Image
                                src={images[selectedImageIndex] || images[0]}
                                fill
                                alt={`${product.name} main image`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Thumbnail Images
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((src: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={src}
                      fill
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )} */}
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='space-y-6'
                >
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center space-x-2 mb-3"
                        >
                            <Badge variant="secondary" className="text-sm">
                                {product.category?.name || 'Product'}
                            </Badge>
                            {product.stock > 0 ? (
                                <Badge variant="default" className="text-sm bg-green-100 text-green-800">
                                    In Stock
                                </Badge>
                            ) : (
                                <Badge variant="destructive" className="text-sm">
                                    Out of Stock
                                </Badge>
                            )}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3"
                        >
                            {product.name}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center space-x-4 mb-4"
                        >
                            <div className="flex items-center space-x-1">
                                {renderStars(4.8)}
                            </div>
                            <span className="text-sm text-gray-600">(4.8 out of 5)</span>
                            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                                1,234 reviews
                            </span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="border-y border-gray-200 py-6"
                    >
                        <div className="flex items-baseline space-x-3 mb-2">
                            <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                            {/* <span className="text-xl text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</span>
              <Badge variant="destructive" className="text-sm">Save ₹{Math.round(product.price * 0.2)}</Badge> */}
                        </div>
                        <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-3"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">SKU:</span>
                                <span className="text-sm font-semibold text-gray-900">{product.sku}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">Stock:</span>
                                <span className="text-sm font-semibold text-gray-900">{product.stock} units</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600">Vendor:</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {product.vendor?.storeName || product.vendor?.name || "N/A"}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-4">
                            <label className="text-lg font-semibold text-gray-900">Quantity:</label>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-6 py-3 border-l border-r border-gray-300 min-w-[60px] text-center font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-gray-100 transition-colors"
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={onAddToCart}
                                    className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
                                    size="lg"
                                    disabled={product.stock === 0}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={onBuyNow}
                                    variant="outline"
                                    className="w-full py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                                    size="lg"
                                    disabled={product.stock === 0}
                                >
                                    Buy Now
                                </Button>
                            </motion.div>

                            <div className="flex space-x-3">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                                    <Button
                                        variant="outline"
                                        className="w-full py-2 px-4"
                                        size="sm"
                                    >
                                        <Heart className="w-4 h-4 mr-2" />
                                        Wishlist
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                                    <Button
                                        variant="outline"
                                        className="w-full py-2 px-4"
                                        size="sm"
                                    >
                                        <Share2 className="w-4 h-4 mr-2" />
                                        Share
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className='mt-12 border-t border-gray-200'>
                <RelatedProducts />
            </div>


        </div>
    );
}