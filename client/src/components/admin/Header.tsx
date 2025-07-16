"use client";
import React, { useEffect } from 'react';
import { Bell, Search, HelpCircle, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import CartIntializer from '../CartIntializer';
import { NavbarSearch } from '../Search';
import { SidebarTrigger } from '../ui/sidebar';
import { usePathname } from 'next/navigation';

type AdminProps = {
  name: string
}

const Header: React.FC<AdminProps> = ({ name }) => {
  const { items, openCart } = useCartStore();
  const totalItems = (items ?? []).reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();





  return (
    <>
      <CartIntializer />
      <motion.header
        className="sticky flex items-center justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold">{name}</h1>
          </div>

          {pathname !== "/admin/products" && (
            <div className='hidden md:flex flex-1 max-w-md mx-8'>
              <NavbarSearch />
            </div>
          )}

          <div className="flex items-center gap-4">
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
        </div>
      </motion.header>
    </>

  );
};

export default Header;

