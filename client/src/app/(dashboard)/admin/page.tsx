"use client"
import React from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Download,
  Users,
  DollarSign,
  Store,
  Layers,
  BarChart4
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import RecentOrder from '@/components/admin/RecentOrder';
import RecentProducts from '@/components/admin/RecentProducts';
import Vendors from '@/components/admin/Vendors';

const page = () => {
  return (
    <div className="p-6 h-full overflow-y-auto ">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
        <p className="text-gray-500">Here's what's happening with your store today.</p>
      </motion.div>
      <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mb-6'>
        <StatCard
          title="Total Revenue"
          value="$12,564"
          icon={<DollarSign size={20} />}
          change={{ value: "8.2%", positive: true }}
          iconClassName="text-green-500"
        />
        <StatCard
          title="Total Orders"
          value="529"
          icon={<ShoppingCart size={20} />}
          change={{ value: "5.1%", positive: true }}
          iconClassName="text-brand-500"
        />
        <StatCard
          title="Total Downloads"
          value="1,832"
          icon={<Download size={20} />}
          change={{ value: "12.5%", positive: true }}
          iconClassName="text-teal-500"
        />
        <StatCard
          title="Total Customers"
          value="642"
          icon={<Users size={20} />}
          change={{ value: "3.8%", positive: true }}
          iconClassName="text-purple-500"
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <RecentOrder />
        <RecentProducts />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
        <Vendors />
      </div>
    </div>
  )
}

export default page