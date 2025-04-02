"use client";
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import React, { ReactNode } from 'react'
import { delay, motion } from 'framer-motion'

const layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Header />
                <motion.main
                    className="flex-1 overflow-y-auto p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    {children}

                </motion.main>
            </div>

        </div>
    )
}

export default layout