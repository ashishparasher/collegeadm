'use client';

import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Star, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CHIPS = ['MBBS', 'BAMS', 'Engineering', 'MBA', 'BPT', 'Nursing'];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center gradient-hero overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute top-1/4 right-[15%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] animate-float-slow" />
      <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px] animate-float" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      
      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.12] mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-white/80">Admissions 2026 — Now Open</span>
            </div>

            <h1 className="font-comfortaa font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-[1.05] mb-7">
              Find Your Perfect{' '}
              <span className="relative inline-block">
                <span className="text-gradient bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400">College</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C40 3 100 2 198 8" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                  <defs><linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0"><stop stopColor="#fbbf24" /><stop offset="1" stopColor="#f97316" /></linearGradient></defs>
                </svg>
              </span>
            </h1>

            <p className="text-white/55 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
              Expert guidance for direct admission to India's premier medical, engineering, and management institutions. Trusted by 5,000+ students.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link href="/colleges" className="block max-w-lg group">
              <div className="flex items-center bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-1.5 hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-300">
                <div className="flex items-center flex-1 px-4 py-3">
                  <Search className="w-5 h-5 text-white/40 mr-3 group-hover:text-accent transition-colors" />
                  <span className="text-white/40 text-sm">Search colleges, courses, exams…</span>
                </div>
                <Button variant="accent" size="sm" className="rounded-xl shadow-lg shadow-accent/30" tabIndex={-1}>
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2 mt-6"
          >
            <span className="text-white/30 text-xs font-semibold uppercase tracking-widest mr-1 py-1.5">Popular:</span>
            {CHIPS.map((s) => (
              <Link key={s} href={`/colleges?q=${s.toLowerCase()}`} className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-lg transition-all hover:bg-white/5">{s}</Link>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-white/[0.08]"
          >
            <div className="flex -space-x-2.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-indigo-950 flex items-center justify-center text-[10px] font-bold text-white">
                  {['A', 'R', 'P', 'S'][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-white/40 text-xs font-semibold">Trusted by <span className="text-white/70">5,000+</span> students</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-6 border-l border-white/10">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-white/40 text-xs font-semibold">Verified Partner Network</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
