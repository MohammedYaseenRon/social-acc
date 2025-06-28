"use client";
import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type AdminProps = {
  name: string
}

const Header: React.FC<AdminProps> = ({name}) => {
  return (
    <motion.header
      className="bg-white z-20 shadow-sm border-b border-border h-16 flex justify-between items-center p-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-xl font-semibold">{name}</h1>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="py-2 pl-10 pr-4 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500 w-96"
        />
        <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircle size={20} className="text-gray-500" />
        </button>

        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

