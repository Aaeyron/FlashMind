"use client";

import React from "react";
import { Copy, Layers, GraduationCap, CheckCircle2, Zap, Brain, ShieldCheck, Clock, BookOpen, Fingerprint, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FloatingCards = () => {
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => { 
    setMounted(true); 
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
            willChange: "transform", // Forces GPU acceleration
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

export default function HowItWorks() {
  const steps = [
    {
      icon: <Copy className="text-blue-600" size={32} />,
      title: "Input Content",
      description: "Paste your raw lecture notes, textbook chapters, or even messy brainstorms. Our system uses advanced processing to read and interpret your text regardless of length."
    },
    {
      icon: <Layers className="text-indigo-600" size={32} />,
      title: "Smart Synthesis",
      description: "FlashMind doesn't just copy-paste. It analyzes your data, identifies key concepts, and transforms them into concise, high-yield Question & Answer pairs automatically."
    },
    {
      icon: <GraduationCap className="text-purple-600" size={32} />,
      title: "Active Recall",
      description: "Study using the built-in Study Area. By using active recall and spaced repetition principles, you move information from short-term to long-term memory faster."
    }
  ];

  const benefits = [
    { icon: <Zap size={20} />, text: "Instant Generation" },
    { icon: <Clock size={20} />, text: "Saves 2+ Hours" },
    { icon: <Brain size={20} />, text: "Concept Extraction" },
    { icon: <ShieldCheck size={20} />, text: "Private Storage" }
  ];

  return (
    <main className="min-h-screen bg-white font-poppins pt-24 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden">
      <FloatingCards />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 cursor-default"
          >
            <Zap size={14} fill="currentColor" /> The FlashMind Method
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Everything you need to <span className="text-blue-600 underline decoration-blue-200 underline-offset-4 md:underline-offset-8">study faster</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base md:text-lg max-w-3xl mx-auto font-medium leading-relaxed px-2"
          >
            We bridge the gap between passive reading and active learning. Stop spending hours designing flashcards and start spending those hours mastering the material.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10 mb-24">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 md:p-8 rounded-3xl border border-gray-100 bg-gray-50/90 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 cursor-default"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                {step.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 size={16} /> Phase 0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center p-6 md:p-12 rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 border border-gray-100 relative overflow-hidden mb-24 transition-shadow"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 p-2 md:p-0">
            <h2 className="text-2xl md:text-3xl font-black mb-6 leading-tight text-gray-900">Why Choose FlashMind?</h2>
            <p className="text-gray-600 mb-8 font-medium leading-relaxed text-sm md:text-base">
              Standard studying involves re-reading notes—a method proven to be one of the least effective ways to learn. FlashMind forces your brain to work through retrieval practice.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm cursor-default"
                >
                  <div className="text-blue-600">{benefit.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-gray-700">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative flex justify-center p-4 md:p-0">
             <motion.div 
               whileHover={{ rotate: 0, scale: 1.05 }}
               className="relative z-10 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-2xl md:rotate-3 transition-transform duration-500 w-full max-w-[320px]"
             >
                <div className="space-y-4">
                   <div className="h-2 w-24 md:w-32 bg-blue-600 rounded-full" />
                   <div className="h-2 w-full bg-gray-100 rounded-full" />
                   <div className="h-2 w-4/5 bg-gray-100 rounded-full" />
                   <div className="pt-4 flex justify-between gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-indigo-50" />
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-50" />
                   </div>
                </div>
                <p className="mt-8 text-center font-black text-blue-600 text-lg md:text-xl tracking-tighter italic">"Study Smarter, Not Longer"</p>
             </motion.div>
          </div>
        </motion.div>

        {/* Scientific Foundations & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[24px] md:rounded-[32px] bg-blue-600 text-white shadow-xl shadow-blue-100 cursor-default transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-4">Scientific Learning</h3>
            <p className="text-blue-50 text-xs md:text-sm leading-relaxed font-medium">
              We utilize <strong>Spaced Repetition</strong> logic. Instead of cramming, we help you review at the exact moment you're about to forget.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-[24px] md:rounded-[32px] bg-white border-2 border-gray-50 shadow-xl shadow-gray-100 cursor-default transition-all"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
              <Fingerprint className="text-gray-900" size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4">Privacy First</h3>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
              FlashMind uses <strong>Local Storage</strong>. Meaning your cards stay on your device. No cloud, no tracking.
            </p>
          </motion.div>
        </div>

        {/* Feature Highlights Section */}
        <div className="text-center mb-24 px-2">
          <h3 className="text-gray-400 font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] mb-12">Core Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Sparkles size={28} />, label: "Automated" },
              { icon: <Layers size={28} />, label: "Unlimited Decks" },
              { icon: <Zap size={28} />, label: "Offline Access" },
              { icon: <ShieldCheck size={28} />, label: "No Ads" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group"
              >
                <div className="text-blue-600 mb-2 group-hover:scale-125 transition-transform">{feature.icon}</div>
                <span className="font-bold text-gray-900 text-xs md:text-sm">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* End of Guide */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center border-t border-gray-100 pt-20"
        >
            <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-[10px]">End of Guide</p>
            <p className="mt-6 text-gray-900 font-medium italic text-base md:text-lg tracking-tight px-4">"The beautiful thing about learning is that no one can take it away from you."</p>
            <p className="mt-2 text-gray-400 text-xs md:text-sm px-4">Ready to begin your journey? Navigate to the home page.</p>
        </motion.div>
        
      </div>
    </main>
  );
}