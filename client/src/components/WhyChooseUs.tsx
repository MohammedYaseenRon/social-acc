"use client";

import { motion } from "framer-motion";
import { Shield, CreditCard, Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: Shield,
        title: "Trusted Vendors",
        description: "Carefully vetted sellers ensuring quality and reliability in every purchase."
    },
    {
        icon: CreditCard,
        title: "Seamless Payments",
        description: "Secure, fast transactions with multiple payment options for your convenience."
    },
    {
        icon: Star,
        title: "Curated Collections",
        description: "Hand-picked premium products across diverse categories and styles."
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Reviews and ratings from real customers to guide your decisions."
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-8 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-5xl font-light text-gray-900 mb-4">
                        Why Choose Our Platform
                    </h2>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                        Experience the difference with our commitment to quality, security, and exceptional service.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="w-[250px]-auto h-[300px] border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                                <CardContent className="p-8 text-center">
                                    <div className="mb-6">
                                        <feature.icon className="w-12 h-12 text-gray-700 mx-auto" />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
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

export default Features;
