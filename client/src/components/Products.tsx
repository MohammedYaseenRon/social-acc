"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

const products = [
    {
        id: 1,
        name: "Minimalist Watch",
        price: "$299",
        vendor: "TimeKeeper Co.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Organic Skincare Set",
        price: "$89",
        vendor: "Pure Beauty",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Artisan Coffee Beans",
        price: "$24",
        vendor: "Mountain Roasters",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Sustainable Backpack",
        price: "$159",
        vendor: "EcoTravel",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Ceramic Dinnerware",
        price: "$179",
        vendor: "Clay Studio",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Wireless Headphones",
        price: "$199",
        vendor: "SoundTech",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Handcrafted Candles",
        price: "$45",
        vendor: "Scent & Soul",
        image: "https://images.unsplash.com/photo-1602874801548-7e7e589c5b30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Premium Notebook",
        price: "$35",
        vendor: "Paper & Ink",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const Products = () => {
    return (
        <section className="py-24 bg-white" id="products">
            <div className="container mx-auto px-8 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                        Feature Products
                    </h2>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Discover our carefully selected premium products from trusted vendors around the world.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group cursor-pointer"

                        >
                            <Card className="w-[300px]-auto h-[400px] border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl overflow-hidden">
                                <div className="h-[60%] bg-gray-100 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt="Product Image"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <div className="mb-2">
                                        <Badge variant="outline" className="text-xs text-gray-500 border-gray-200 font-inter">
                                            {product.vendor}
                                        </Badge>
                                    </div>
                                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-poppins">
                                        {product.name}
                                    </h3>
                                    <p className="text-xl font-light text-gray-800 font-inter">
                                        {product.price}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
