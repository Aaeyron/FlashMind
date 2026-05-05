"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Brain, Menu, X } from "lucide-react"; // Added icons
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // New state for mobile menu
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking a link (pathname changes)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinkStyles = `
    relative text-[15px] font-semibold 
    font-poppins tracking-wide
    text-gray-600 hover:text-blue-600 
    transition-all duration-300 
    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
    after:h-[2px] after:w-0 after:bg-blue-600 
    after:transition-all after:duration-300 hover:after:w-full
  `;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full
      ${scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3" 
        : "bg-white py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-1">
          <motion.a 
            href="/" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 group cursor-pointer w-fit"
          >
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Brain size={20} className="text-white" />
            </div>
            <span className="text-2xl font-extrabold font-poppins tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              FlashMind
            </span>
          </motion.a>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-12">
          <motion.a 
            href={pathname === "/how-it-works" ? "/" : "/how-it-works"}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={navLinkStyles}
          >
            {pathname === "/how-it-works" ? "Home" : "How it works"}
          </motion.a>
          
          <motion.a 
            href="/about" 
            whileHover={{ y: -2 }}
            className={navLinkStyles}
          >
            About
          </motion.a>
        </div>

        {/* Right Side - Mobile Menu Button & Desktop Spacer */}
        <div className="flex-1 flex justify-end items-center">
          {/* Hamburger Button: Only visible on small screens (below md) */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Invisible spacer for desktop centering */}
          <div className="hidden md:block w-full" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6 shadow-inner">
              <a 
                href={pathname === "/how-it-works" ? "/" : "/how-it-works"}
                className="text-lg font-bold text-gray-800 flex justify-between items-center"
              >
                {pathname === "/how-it-works" ? "Home" : "How it works"}
              </a>
              <a 
                href="/about" 
                className="text-lg font-bold text-gray-800"
              >
                About
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}