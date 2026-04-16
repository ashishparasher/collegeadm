'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap, Phone, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { Button } from '@/components/ui/button';

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

  const solid = scrolled || !isHome;

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      solid ? 'py-2' : 'py-4'
    )}>
      <nav className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500',
        solid ? '' : ''
      )}>
        <div className={cn(
          'flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500',
          solid 
            ? 'bg-white/80 backdrop-blur-2xl shadow-nav border border-white/50' 
            : 'bg-white/[0.07] backdrop-blur-xl border border-white/[0.08]'
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6',
              solid ? 'bg-gradient-to-br from-accent to-amber-500 shadow-lg shadow-accent/25' : 'bg-white/15'
            )}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className={cn(
              'font-comfortaa font-bold text-lg tracking-tight transition-colors duration-300',
              solid ? 'text-foreground' : 'text-white'
            )}>
              CollegeAdm
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 relative',
                    active
                      ? (solid ? 'text-accent' : 'text-white')
                      : (solid ? 'text-muted-foreground hover:text-foreground' : 'text-white/70 hover:text-white')
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={cn('absolute bottom-0 left-3 right-3 h-0.5 rounded-full', solid ? 'bg-accent' : 'bg-white')}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className={cn(
                'flex items-center gap-1.5 text-xs font-bold transition-colors',
                solid ? 'text-muted-foreground hover:text-foreground' : 'text-white/70 hover:text-white'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              {SITE.phoneDisplay}
            </a>
            <Button asChild variant="accent" size="sm" className="rounded-full shadow-lg shadow-accent/20">
              <Link href="/contact">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Free Counselling
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden p-2 rounded-full transition-all',
              solid ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-border p-5 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-2xl text-sm font-semibold transition-all',
                    pathname === link.href ? 'bg-accent/5 text-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-border space-y-3">
                <a href={`tel:${SITE.phone}`} className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-muted text-foreground text-sm font-bold">
                  <Phone className="w-4 h-4 text-accent" /> {SITE.phoneDisplay}
                </a>
                <Button asChild variant="accent" size="lg" className="w-full rounded-2xl">
                  <Link href="/contact">Get Free Counselling</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
