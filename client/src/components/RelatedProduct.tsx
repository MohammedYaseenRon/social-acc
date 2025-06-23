"use client";

import React from "react";
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from "framer-motion";

const relatedProducts = [
  {
    id: 1,
    name: "MacBook Air 13-inch",
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    originalPrice: null,
    rating: 4.8,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    badge: null
  },
  {
    id: 3,
    name: "Apple Studio Display",
    price: 1599,
    originalPrice: 1799,
    rating: 4.6,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    badge: "New"
  },
  {
    id: 4,
    name: "Magic Keyboard",
    price: 299,
    originalPrice: 349,
    rating: 4.5,
    reviews: 1205,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    badge: null
  }
];

const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };


export default function RelatedProducts() {
  return (
    <div className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 pt-4"
      >
        You might also like
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.badge && (
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${product.badge === 'Best Seller'
                      ? 'bg-orange-500 text-white'
                      : product.badge === 'New'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}>
                    {product.badge}
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ShoppingCart className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>

              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full mt-2 bg-blue-600 hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}