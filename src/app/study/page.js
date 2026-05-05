"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Home, Layout, Shuffle } from "lucide-react";
import Link from "next/link";

const FloatingCards = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
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

export default function StudyPage() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("flashmind_data");
    if (saved) {
      setCards(JSON.parse(saved));
    }
  }, []);

  const handleShuffle = (e) => {
    e.preventDefault();
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShuffleKey(prev => prev + 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsCompleted(true);
      }
    }, 50); 
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 50);
    }
  };

  const resetStudy = (e) => {
    e.preventDefault();
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsCompleted(false);
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50 relative overflow-hidden">
        <FloatingCards />
        <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 text-gray-900">No cards to study!</h2>
            <Link href="/create" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-transform hover:scale-105 active:scale-95">
            Create some cards first
            </Link>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white relative overflow-hidden">
        <FloatingCards />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Layout size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter">Session Complete!</h2>
          <p className="text-gray-500 mb-10 font-medium italic">You've mastered {cards.length} cards today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button type="button" onClick={resetStudy} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-4 rounded-2xl font-bold transition-all cursor-pointer active:scale-95">
              <RotateCcw size={18} /> Restart
            </button>
            <Link href="/flashcards" scroll={false} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all cursor-pointer active:scale-95">
              <Home size={18} /> Back to Library
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8 md:py-12 px-4 md:px-6 font-poppins relative overflow-hidden">
      <FloatingCards />

      <div className="w-full flex flex-col items-center relative z-10">
        {/* Progress Header */}
        <div className="max-w-[320px] w-full mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                  <span className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Study Area</span>
                  <h2 className="text-xl font-black text-gray-900">Training</h2>
              </div>
              <span className="font-black text-gray-400 text-sm">
                  {currentIndex + 1} <span className="text-gray-300">/</span> {cards.length}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                  className="h-full bg-blue-600" 
                  initial={{ width: 0 }} 
                  animate={{ width: `${progress}%` }}
              />
            </div>
        </div>

        {/* The Study Card */}
        <div className="relative w-full max-w-[320px] h-[450px] [perspective:1000px]">
            <AnimatePresence mode="wait">
            <motion.div
                key={`${currentIndex}-${shuffleKey}`}
                initial={{ x: 100, opacity: 0, rotate: 10 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                exit={{ x: -100, opacity: 0, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full h-full"
            >
                <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
                >
                {/* Front */}
                <div className="absolute inset-0 bg-white border border-gray-100 rounded-[24px] shadow-xl flex flex-col [backface-visibility:hidden] overflow-hidden">
                    <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-100/50" />
                    <div className="p-6 pb-2 relative z-10">
                      <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em]">Question</span>
                    </div>
                    {/* FIXED: items-start allows scrolling to reach the very top */}
                    <div className="flex-grow flex items-start justify-center pl-8 pr-4 mr-1 py-4 overflow-y-auto custom-scrollbar relative z-10">
                        <h3 className="text-2xl font-bold text-gray-800 leading-tight text-center break-words w-full pt-2">
                        {cards[currentIndex]?.question}
                        </h3>
                    </div>
                    <div className="p-6 pt-2">
                      <p className="text-center text-gray-300 text-[10px] font-black uppercase tracking-widest animate-pulse">Click to flip</p>
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-gray-900 text-white rounded-[24px] shadow-xl flex flex-col [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                    <div className="p-6 pb-2">
                      <span className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">Answer</span>
                    </div>
                    {/* FIXED: items-start allows scrolling to reach the very top */}
                    <div className="flex-grow flex items-start justify-center pl-8 pr-4 mr-1 py-4 overflow-y-auto custom-scrollbar">
                      <p className="text-xl font-medium leading-relaxed text-center break-words w-full pt-2">
                          {cards[currentIndex]?.answer}
                      </p>
                    </div>
                    <div className="p-6 pt-2">
                      <p className="text-center text-gray-600 text-[10px] font-black uppercase tracking-widest">Click to flip</p>
                    </div>
                </div>
                </div>
            </motion.div>
            </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-4">
            <motion.button 
            type="button"
            whileHover={currentIndex !== 0 ? { scale: 1.1 } : {}}
            whileTap={currentIndex !== 0 ? { scale: 0.9 } : {}}
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                currentIndex === 0 
                ? "opacity-0 cursor-default" 
                : "border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 shadow-sm bg-white shadow-lg shadow-gray-200"
            }`}
            >
            <ChevronLeft size={20} />
            </motion.button>

            <motion.button 
            type="button"
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9, rotate: 90 }}
            onClick={handleShuffle}
            className="p-4 rounded-2xl border-2 border-gray-200 text-gray-400 hover:text-indigo-500 hover:border-indigo-500 shadow-sm bg-white shadow-lg shadow-gray-200 cursor-pointer transition-colors"
            title="Shuffle Deck"
            >
            <Shuffle size={20} />
            </motion.button>

            <motion.button 
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3 cursor-pointer shadow-blue-200"
            >
            {currentIndex === cards.length - 1 ? "Finish" : "Next"}
            <ChevronRight size={18} />
            </motion.button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.4); 
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}