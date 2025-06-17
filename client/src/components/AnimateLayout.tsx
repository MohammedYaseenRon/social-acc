// components/AnimatedLayout.tsx
'use client';

import { motion } from "framer-motion";
import React from "react";

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="max-w-7xl mx-auto w-full mt-16"
    >
      {children}
    </motion.main>
  );
}
