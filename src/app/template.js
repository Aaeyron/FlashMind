"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}    // Starts invisible and slightly down
      animate={{ opacity: 1, y: 0 }}     // Fades in and slides up to position
      exit={{ opacity: 0, y: -10 }}      // Fades out and slides up when leaving
      transition={{ 
        duration: 0.4,                   // How long the fade takes (0.4 seconds)
        ease: "easeInOut"                // Makes it feel "natural"
      }}
    >
      {children}
    </motion.div>
  );
}