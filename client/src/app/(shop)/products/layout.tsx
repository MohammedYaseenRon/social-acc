"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed or regular Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar />

          <div className="flex-1 p-4 bg-gray-50 min-h-screen">
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="max-w-7xl mx-auto w-full mt-16"
            >
              {/* <SidebarTrigger  className="mt-12"/> */}
                {children}
            </motion.main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Layout;
