import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <motion.div
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-12 h-12 border-4 border-[#491a95]/20 border-t-[#491a95] rounded-full"
    />
  </div>
);

export default LoadingSpinner; 