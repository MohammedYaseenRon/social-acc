'use client';

import { ArrowRight, Ghost, Package, Play, Shield, ShoppingBag, Star, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion'
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className='relative min-h-screen flex items-center overflow-hidden pt-16'>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Premium Shopping Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
      <div className='container mx-auto px-8 md:px-20 py-12 relative z-10'>
        <div className='grid lg:grid-cols-2 gap-12 items-center gap-12 min-h-[80vh]'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 8, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"

          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white rounded-full px-6 py-3 border border-white/20"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold font-inter">Premium Marketplace</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold leading-tight font-playfair"
              >
                <span className="block text-white">Discover</span>
                <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Premium
                </span>
                <span className="block text-gray-200 text-4xl md:text-5xl font-light">
                  Collections
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 rounded-full"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl text-gray-200 leading-relaxed max-w-lg font-inter"

            >
              Experience the future of shopping with our curated marketplace.
              <span className="font-semibold text-white"> Premium quality</span>,
              trusted vendors, and seamless transactions all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-poppins">50K+</div>
                  <div className="text-sm text-gray-300 font-inter">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-poppins">1M+</div>
                  <div className="text-sm text-gray-300 font-inter">Products</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-poppins">4.9</div>
                  <div className="text-sm text-gray-300 font-inter">Rating</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <Button
                className="bg-white text-black hover:bg-gray-100 px-8 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 text-lg font-semibold group font-inter"
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-2xl transition-all duration-500 text-lg font-semibold bg-white/5 backdrop-blur-sm group font-inter"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex items-center gap-6 pt-8 border-t border-white/20"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-200 font-medium font-inter">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-200 font-medium font-inter">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-200 font-medium font-inter">Quality Assured</span>
              </div>
            </motion.div>
          </motion.div>
        </div>




      </div>
    </div>
  );
};

export default Hero;
