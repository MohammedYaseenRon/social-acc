"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import SecondNavbar from "@/components/SecondNavbar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <AppSidebar />

        <div className="w-full min-h-screen flex flex-col pl-0 lg:pl-16">
          <Navbar />
          <SecondNavbar />
          <motion.main
            className="flex-1 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
