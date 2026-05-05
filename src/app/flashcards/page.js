"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Play, Layout, Pencil, RotateCcw, AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// BACKGROUND LOGIC (Unchanged)
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

// CUSTOM CONFIRMATION MODAL (Unchanged)
const ResetModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
               <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                  <X size={20} />
               </button>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Reset Library?</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                This action will permanently delete all your decks and cards. You cannot undo this once it's done.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Keep them
                </button>
                <button 
                  onClick={onConfirm}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all cursor-pointer active:scale-95"
                >
                  Yes, Reset
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// FLASHCARD COMPONENT (Unchanged)
const Flashcard = ({ card, onDelete }) => {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();

  const handleEdit = (e) => {
    e.stopPropagation(); 
    const params = new URLSearchParams({ id: card.id, question: card.question, answer: card.answer });
    router.push(`/create?${params.toString()}`);
  };

  return (
    <div className="group h-[380px] md:h-[450px] w-full max-w-[320px] [perspective:1000px] relative z-10">
      <div
        className={`relative h-full w-full shadow-xl transition-all duration-700 [transform-style:preserve-3d] rounded-[24px] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div 
          onClick={() => setFlipped(true)}
          className="absolute inset-0 h-full w-full bg-white border border-gray-100 p-6 md:p-8 flex flex-col items-start [backface-visibility:hidden] z-10 rounded-[24px] overflow-hidden cursor-pointer"
        >
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-100/50 z-0" />
          <span className="shrink-0 mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 ml-2 relative z-10 pointer-events-none">Question</span>
          <div className="flex-grow w-full overflow-hidden relative z-20">
            <div className="w-full h-full overflow-y-auto custom-scrollbar pr-4 md:pr-8 pl-2 py-4 pointer-events-auto">
               <h3 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight break-words text-left pointer-events-none">{card.question}</h3>
            </div>
          </div>
          <div className="shrink-0 mt-4 flex gap-4 self-end md:opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-30">
            <button onClick={handleEdit} className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer p-2"><Pencil size={18} /></button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(card.id); }} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2"><Trash2 size={18} /></button>
          </div>
        </div>

        <div 
          onClick={() => setFlipped(false)}
          className="absolute inset-0 h-full w-full bg-gray-900 p-6 md:p-8 text-white flex flex-col items-start [transform:rotateY(180deg)] [backface-visibility:hidden] z-20 rounded-[24px] overflow-hidden cursor-pointer"
        >
          <span className="shrink-0 mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2 relative z-10 pointer-events-none">Answer</span>
          <div className="flex-grow w-full overflow-hidden relative z-20">
            <div className="w-full h-full overflow-y-auto custom-scrollbar pr-4 md:pr-8 pl-2 py-4 pointer-events-auto">
              <p className="text-base md:text-xl font-medium leading-relaxed break-words text-gray-100 text-left pointer-events-none">{card.answer}</p>
            </div>
          </div>
          <div className="h-6 shrink-0 relative z-10" /> 
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(226, 232, 240, 0); border-radius: 10px; transition: background-color 0.3s ease; }
        .group:hover .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(226, 232, 240, 1); }
        .custom-scrollbar { scrollbar-width: none; }
        .group:hover .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent; }
      `}</style>
    </div>
  );
};

export default function FlashcardsPage() {
  const [cards, setCards] = useState([]);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("flashmind_data");
    if (saved) setCards(JSON.parse(saved));
  }, []);

  const deleteCard = (id) => {
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    localStorage.setItem("flashmind_data", JSON.stringify(updated));
  };

  const confirmReset = () => {
    setCards([]);
    localStorage.removeItem("flashmind_data");
    setIsResetModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-white p-6 md:p-16 font-poppins relative overflow-hidden">
      <FloatingCards />
      
      <ResetModal 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)} 
        onConfirm={confirmReset} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Layout className="text-blue-600" size={24} />
              <span className="font-black text-blue-600 uppercase tracking-widest text-xs md:text-sm">Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Your Decks</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {cards.length > 0 && (
              <button 
                onClick={() => setIsResetModalOpen(true)}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 md:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-100 active:scale-95"
              >
                <RotateCcw size={18} /> Reset
              </button>
            )}

            <Link href="/create" className="bg-white border-2 border-gray-100 hover:border-blue-500 text-gray-600 hover:text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
              <Plus size={20} /> Add Card
            </Link>
            
            {cards.length > 0 && (
              <button 
                onClick={() => router.push("/study")} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 cursor-pointer active:scale-95"
              >
                <Play size={20} fill="currentColor" /> Start Session
              </button>
            )}
          </div>
        </header>

        {/* EMPTY STATE - SIMPLE FLOATING TEXT */}
        {cards.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <h2 className="text-6xl md:text-8xl font-black text-gray-100/80 uppercase tracking-tighter italic select-none">
                Empty
              </h2>
              <p className="text-gray-300 font-bold text-xs md:text-sm tracking-[0.4em] uppercase mt-2 select-none">
                Create a card to start
              </p>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 justify-items-center">
          <AnimatePresence mode="popLayout">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                className="w-full flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <Flashcard card={card} onDelete={deleteCard} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}