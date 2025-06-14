"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
    "Fashion & Apparel",
    "Electronics",
    "Home & Garden",
    "Beauty & Wellness",
    "Sports & Outdoors",
    "Books & Media",
    "Jewelry & Accessories",
    "Art & Collectibles"
];

const Categories = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-8 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                        Explore Categories
                    </h2>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Discover premium products across diverse categories, curated for quality and style.          </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className=""
                        >
                            <h2 className="text-md font-medium rounded-2xl border px-2 py-2">
                                {category}
                            </h2>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
