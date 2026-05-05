"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const FloatingBackground = () => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  const cards = Array.from({ length: 12 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {cards.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-28 md:w-28 md:h-36 bg-blue-400/20 border border-blue-400/30 rounded-xl shadow-lg"
          initial={{ 
            top: "110%", 
            left: `${(i * 9)}%`, 
            rotate: Math.random() * 45 
          }}
          animate={{
            top: "-20%",
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );
};

function CardForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [editId, setEditId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    const q = searchParams.get("question");
    const a = searchParams.get("answer");

    if (id && q && a) {
      setEditId(id);
      setQuestion(q);
      setAnswer(a);
    }
  }, [searchParams]);

  const handleSaveCard = (e) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim()) {
      setError(true);
      return;
    }

    const saved = localStorage.getItem("flashmind_data");
    let cards = saved ? JSON.parse(saved) : [];

    if (editId) {
      cards = cards.map((c) =>
        c.id.toString() === editId.toString() 
          ? { ...c, question, answer } 
          : c
      );
    } else {
      const newCard = { id: Date.now(), question, answer };
      cards = [newCard, ...cards];
    }

    localStorage.setItem("flashmind_data", JSON.stringify(cards));
    router.push("/flashcards");
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      /* RESPONSIVE FIX: max-w-md on desktop, but takes full width on mobile with reduced padding */
      className="max-w-md w-full bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-2xl relative z-10"
    >
      <header className="flex items-center justify-between mb-8 md:mb-10">
        <button onClick={() => router.push("/flashcards")} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <ArrowLeft size={20} className="text-gray-400" />
        </button>
        <h2 className="text-xl md:text-2xl font-black text-gray-900">
          {editId ? "Edit Card" : "New Card"}
        </h2>
        <div className="w-9" />
      </header>

      <form onSubmit={handleSaveCard} className="space-y-4 md:space-y-6">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, x: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                x: [0, -5, 5, -5, 5, 0] 
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 mb-2"
            >
              <AlertCircle size={18} />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-tight">Please fill in both fields!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 ml-2">Question</label>
          <textarea 
            value={question} 
            onChange={handleInputChange(setQuestion)}
            /* RESPONSIVE FIX: Padding and font size adjusted for small screens */
            className={`w-full p-4 md:p-5 text-sm md:text-base bg-gray-50 border-2 rounded-2xl md:rounded-3xl transition-all outline-none resize-none font-medium text-gray-800 ${
              error && !question ? 'border-red-200 bg-red-50/30' : 'border-transparent focus:border-blue-500 focus:bg-white'
            }`}
            placeholder="What's the challenge?" rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 ml-2">Answer</label>
          <textarea 
            value={answer} 
            onChange={handleInputChange(setAnswer)}
            className={`w-full p-4 md:p-5 text-sm md:text-base bg-gray-50 border-2 rounded-2xl md:rounded-3xl transition-all outline-none resize-none font-medium text-gray-800 ${
              error && !answer ? 'border-red-200 bg-red-50/30' : 'border-transparent focus:border-blue-500 focus:bg-white'
            }`}
            placeholder="And the solution..." rows={3}
          />
        </div>

        {/* RESPONSIVE FIX: Button padding and text size */}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-black py-4 md:py-5 rounded-2xl md:rounded-[24px] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer">
          {editId ? "Save Changes" : "Add to Deck"} 
          {editId ? <Save size={18} /> : <Plus size={18} />}
        </button>
      </form>
    </motion.div>
  );
}

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-white font-poppins relative flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <FloatingBackground />
      <Suspense fallback={<div className="z-10 font-black text-blue-500">Loading...</div>}>
        <CardForm />
      </Suspense>
    </main>
  );
}