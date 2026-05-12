"use client";
import React, { useState, useEffect } from "react";
import { BookOpen, Zap, ShieldCheck, Clock, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const FloatingCards = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { 
    setMounted(true); 
    // Check if device is mobile to optimize performance
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!mounted) return null;

  // Use 6 cards for mobile, 12 for desktop to prevent CPU lag
  const count = isMobile ? 6 : 12;
  const cards = Array.from({ length: count }); 

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {cards.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-28 md:w-28 md:h-36 bg-blue-400/20 border border-blue-400/30 rounded-xl shadow-lg"
          style={{ 
            willChange: "transform", // Forces hardware acceleration on phones
          }}
          initial={{ 
            top: "110%", 
            left: `${isMobile ? (i * 18) : (i * 9)}%`, 
            rotate: Math.random() * 45 
          }}
          animate={{ 
            top: "-20%", 
            // Simple tilt for mobile, full spin for PC
            rotate: isMobile ? (i % 2 === 0 ? 20 : -20) : (i % 2 === 0 ? 360 : -360) 
          }}
          transition={{ 
            duration: isMobile ? 15 + Math.random() * 10 : 10 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "linear", 
            delay: i * 1.2 
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <main className="bg-white font-poppins relative overflow-x-hidden">
      <FloatingCards />

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-start pt-10 md:pt-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 md:p-20 text-left text-white shadow-2xl shadow-blue-200 -mt-10"
          >
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
            
            <div className="relative z-20">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-sm font-bold mb-6 border border-white/10"
              >
                <Zap size={14} className="fill-blue-100" />
                Easy Learning
              </motion.div>
              
              <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                Master anything with <br />
                <span className="text-blue-100 italic">FlashMind</span>
              </h1>
              
              <p className="text-blue-100 text-lg md:text-2xl max-w-2xl leading-relaxed font-medium">
                The easiest way to turn your messy school notes into organized flashcards. Simple, fast, and built for students.
              </p>
            </div>
          </motion.div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce hidden md:block">
            <p className="text-xs font-bold uppercase tracking-widest mb-2">Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-20 px-2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              Why use <span className="text-blue-600">FlashMind?</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              We know that exam season is tough. Most students spend way too much time just preparing to study, rather than actually learning. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              FlashMind helps you bridge that gap. We focus on the boring stuff—organizing and formatting—so you can get straight to the part that matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: <Clock className="text-blue-600" />, title: "Save Hours of Time", desc: "Don't waste your night typing. Get your study deck ready in minutes." },
              { icon: <ShieldCheck className="text-indigo-600" />, title: "Private and Secure", desc: "Your notes are yours. Everything stays right in your browser storage." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.03, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all cursor-default"
              >
                <div className="bg-gray-50 p-3 rounded-2xl h-fit">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Core Concept Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-blue-600 rounded-[40px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-blue-100 relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mb-32 -mr-32" />
          
          <div className="flex-1 relative z-10">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform"
            >
              <Lightbulb className="text-white" size={24} />
            </motion.div>
            <h2 className="text-3xl font-black mb-4">How it helps you pass</h2>
            <p className="text-blue-100 leading-relaxed mb-6 font-medium">
              Our system is built on simple logic: if you see a question and have to think of the answer, your brain gets stronger. 
            </p>
            <ul className="space-y-3">
              {["No more messy notebooks", "Study anywhere on your phone", "Focus on weakest topics"].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }} 
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    className="w-1.5 h-1.5 bg-white rounded-full" 
                  /> 
                  {text}
                </li>
              ))}
            </ul>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="flex-1 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-inner"
          >
            <div className="space-y-4">
              <div className="h-3 w-1/2 bg-white/30 rounded-full animate-pulse" />
              <div className="h-3 w-3/4 bg-white/10 rounded-full" />
              <div className="h-3 w-1/3 bg-white/20 rounded-full" />
              <div className="pt-6 border-t border-white/10 mt-6 text-sm italic text-blue-100 flex items-center gap-2">
                <Sparkles size={14} /> "The tool we use for our own exams."
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- START BUTTON --- */}
        <div className="mt-20 text-center">
          <Link href="/create">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              className="relative inline-flex group"
            >
              <motion.div 
                variants={{
                  hover: { scale: 1.05, opacity: 1 },
                  initial: { scale: 1, opacity: 0.5 }
                }}
                className="absolute -inset-4 bg-blue-100 rounded-full blur-xl transition-all"
              />
              <motion.button
                variants={{
                  hover: { scale: 1.05, backgroundColor: "#2563eb" },
                  tap: { scale: 0.95 }
                }}
                className="relative flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-full font-black text-lg tracking-tight shadow-xl transition-colors cursor-pointer active:scale-95"
              >
                Start making flashcards
                <motion.div
                  variants={{
                    hover: { x: 5, transition: { repeat: Infinity, repeatType: "mirror", duration: 0.4 } }
                  }}
                >
                  <ArrowRight size={22} />
                </motion.div>
              </motion.button>
            </motion.div>
          </Link>
        </div>
      </section>
    </main>
  );   
}