'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCH_SUGGESTIONS = [
  'MS Ramaiah Medical College',
  'RVCE Bangalore Admission',
  'BAMS colleges',
  'Physiotherapy Admission',
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroSection() {
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/colleges?q=${encodeURIComponent(query.trim())}`);
    else router.push('/colleges');
  };

  if (!mounted) return <div className="min-h-[85vh] bg-navy" />;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-navy z-0">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" 
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-2xl mb-8 text-white/90 text-[13px] font-bold tracking-tight">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Admission Season 2026-27 is LIVE
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="font-comfortaa font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-8 text-balance">
            Your Future, <span className="text-orange-400 underline decoration-white/20 underline-offset-8">Simplified.</span>
          </motion.h1>

          <motion.p variants={item} className="text-navy-100/80 text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0 font-medium">
            Get direct admission in India's premier medical & engineering colleges. Expert guidance for management quota seats with 100% transparency.
          </motion.p>

          {/* Search Box */}
          <motion.div variants={item} className="relative group max-w-2xl mx-auto lg:mx-0">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl shadow-navy-900/40">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for colleges or courses..."
                  className="w-full pl-14 pr-4 py-4 bg-transparent text-white text-base placeholder:text-navy-200 outline-none"
                />
              </div>
              <button
                type="submit"
                className="shine px-10 py-4 gradient-orange text-white font-bold rounded-[1.5rem] shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                Find College
              </button>
            </form>
            
            {/* Quick suggestions */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-6">
              {SEARCH_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setQuery(s); router.push(`/colleges?q=${encodeURIComponent(s)}`); }}
                  className="text-[11px] font-bold bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 px-4 py-2 rounded-xl transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Features / Graphics */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-1 hidden lg:grid grid-cols-2 gap-4 w-full max-w-md"
        >
          <div className="space-y-4 pt-12">
            <div className="glass p-6 rounded-[2rem] space-y-3 hover:bg-white/15 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-sm">Verified Seats</h3>
              <p className="text-white/50 text-[11px] leading-relaxed">Direct tie-ups with 50+ top-tier institutions across India.</p>
            </div>
            <div className="glass p-6 rounded-[2rem] space-y-3 hover:bg-white/15 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-sm">Expert Help</h3>
              <p className="text-white/50 text-[11px] leading-relaxed">Personalized counselling from industry veterans.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass p-6 rounded-[2rem] space-y-3 hover:bg-white/15 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-sm">Fast Process</h3>
              <p className="text-white/50 text-[11px] leading-relaxed">End-to-end documentation support for instant admission.</p>
            </div>
            <div className="bg-gradient-orange p-8 rounded-[2.5rem] shadow-2xl shadow-orange-600/20 flex flex-col justify-end min-h-[200px] relative overflow-hidden">
               <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
               <p className="text-white font-bold text-3xl mb-1 font-comfortaa">5k+</p>
               <p className="text-white/80 text-xs font-bold uppercase tracking-wider">Students Guided</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
