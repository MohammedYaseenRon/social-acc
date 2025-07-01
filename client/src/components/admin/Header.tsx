"use client";
import React, { useEffect } from 'react';
import { Bell, Search, HelpCircle, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import CartIntializer from '../CartIntializer';
import { NavbarSearch } from '../Search';

type AdminProps = {
  name: string
}

const Header: React.FC<AdminProps> = ({ name }) => {
  const { items, openCart } = useCartStore();
  const totalItems = (items ?? []).reduce((acc, item) => acc + item.quantity, 0);




  return (
    <>
      <CartIntializer />
      <motion.header
        className="bg-white z-20 shadow-sm border-b border-border h-16 flex justify-between items-center p-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-xl font-semibold">{name}</h1>
        </div>

        <NavbarSearch />

        <div className="flex items-center space-x-3">
          <div className='relative'>
            <ShoppingCart size={24} className="text-gray-500 rounded-full hover:bg-gray-100" onClick={openCart} />
            <span
              className={`absolute -top-2 -right-2 text-white text-xs font-bold px-1.5 py-0.5 rounded-full transition-all duration-200
    ${totalItems > 0 ? "bg-red-500" : "bg-gray-300"}`}
            >
              {totalItems}
            </span>

          </div>

          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
          </div>
        </div>
      </motion.header>
    </>

  );
};

export default Header;

