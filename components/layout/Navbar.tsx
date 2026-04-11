'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, Phone, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/colleges', label: 'All Colleges' },
  { href: '/blog', label: 'Blog' },
  { href: '/compare', label: 'Compare' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isSolid = scrolled || !isHome;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isSolid
          ? 'bg-white/80 backdrop-blur-xl shadow-xl shadow-navy-900/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="w-11 h-11 rounded-2xl bg-navy flex items-center justify-center shadow-2xl shadow-navy-500/40 group-hover:rotate-6 transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-comfortaa font-bold text-xl leading-none tracking-tight transition-colors duration-300',
                  isSolid ? 'text-navy-800' : 'text-white'
                )}
              >
                CollegeAdm
              </span>
              <div className="flex items-center gap-1 mt-1">
                <ShieldCheck className={cn('w-3 h-3', isSolid ? 'text-orange-500' : 'text-orange-400')} />
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-widest leading-none transition-colors duration-300',
                    isSolid ? 'text-gray-400' : 'text-white/60'
                  )}
                >
                  Verified Admission
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200/20 glass-dark:border-white/10 transition-all duration-300">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                    isActive 
                      ? (isSolid ? 'bg-navy text-white shadow-lg shadow-navy-200' : 'bg-white text-navy shadow-lg shadow-white/20')
                      : (isSolid ? 'text-gray-600 hover:bg-white hover:text-navy' : 'text-white/80 hover:bg-white/10 hover:text-white')
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+917707055155"
              className={cn(
                'flex items-center gap-2 text-sm font-bold transition-colors group',
                isSolid ? 'text-navy-700' : 'text-white hover:text-orange-400'
              )}
            >
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                <Phone className="w-4 h-4 text-orange-500" />
              </div>
              <span>77070 55155</span>
            </a>
            <Link
              href="/contact"
              className="shine px-7 py-3 rounded-2xl bg-[#ff6f00] text-white text-sm font-bold shadow-2xl shadow-orange-500/40 hover:scale-[1.05] active:scale-95 transition-all duration-300"
            >
              Get Free Help
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden p-3 rounded-2xl transition-all duration-300',
              isSolid 
                ? 'bg-gray-50 text-navy-700 hover:bg-gray-100' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-8 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-6 py-4 rounded-2xl text-base font-bold transition-all',
                    pathname === link.href ? 'bg-navy/5 text-navy border-l-4 border-navy' : 'text-gray-600'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-4">
                <a href="tel:+917707055155" className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-gray-50 text-navy font-bold">
                  <Phone className="w-5 h-5 text-orange-500" />
                  77070 55155
                </a>
                <Link href="/contact" className="w-full text-center py-5 rounded-2xl bg-[#ff6f00] text-white font-bold shadow-xl">
                  Get Free Counselling
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
