"use client";

import React, { useState, useEffect } from "react";
import { Users, Target, Heart, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Reusable Floating Background
const FloatingCards = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const cards = Array.from({ length: 12 });
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {cards.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-28 md:w-28 md:h-36 bg-blue-400/20 border border-blue-400/30 rounded-xl shadow-lg"
          initial={{ top: "110%", left: `${(i * 9)}%`, rotate: Math.random() * 45 }}
          animate={{ top: "-20%", rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
        />
      ))}
    </div>
  );
};

export default function About() {
  const points = [
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: "Our Goal",
      description: "We want to stop you from wasting hours making flashcards by hand so you can spend that time actually learning."
    },
    {
      icon: <Users className="text-indigo-600" size={24} />,
      title: "Made for You",
      description: "We are students too. We know how stressful exam season is, so we built the tool we always wanted to have."
    },
    {
      icon: <Heart className="text-purple-600" size={24} />,
      title: "Keep it Simple",
      description: "Learning is hard enough. We believe your study tools should be easy to use and actually help you get better grades."
    }
  ];

  return (
    <main className="min-h-screen bg-white font-poppins pt-32 pb-20 px-6 relative overflow-hidden">
      <FloatingCards />
      
      <div className="max-w-[1000px] mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-blue-600 bg-blue-50 rounded-full cursor-default"
          >
            The Story
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
            We help you study <br />
            <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">without the headache.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl font-medium">
            FlashMind started because we were tired of spending all night typing up 
            notes into cards. We thought, <span className="text-gray-900 italic">"Why can't a computer do the boring part for us?"</span>
            {" "}So, we built it.
          </p>
        </motion.div>

        {/* Middle Box (The Rocket Modal) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(37, 99, 235, 0.25)" }}
          viewport={{ once: true }}
          className="w-full h-64 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[32px] mb-20 shadow-xl flex items-center justify-center p-8 text-center relative overflow-hidden group cursor-default transition-all duration-300"
        >
          {/* Animated Background Decor */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          />

          <div className="text-white relative z-10">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Rocket size={56} className="mx-auto mb-4 drop-shadow-lg" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Better Grades, Less Stress</h2>
            <p className="text-blue-100 mt-2 font-medium">Built to help your brain remember things faster.</p>
          </div>
        </motion.div>

        {/* Points Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {points.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-6 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all group"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className="mb-4 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-all"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-gray-100 text-center"
        >
          <div className="flex justify-center gap-1 text-blue-600 mb-4">
             <Sparkles size={16} />
             <Sparkles size={16} />
             <Sparkles size={16} />
          </div>
          <p className="text-gray-500 italic text-lg">
            "We built FlashMind to be your favorite study buddy."
          </p>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="mt-6 font-black text-gray-900 tracking-tight"
          >
            — The FlashMind Team
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}