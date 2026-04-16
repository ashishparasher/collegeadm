'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE } from '@/lib/constants';

export function FloatingCta() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 right-6 z-40 max-w-xs"
      >
        <div className="bg-white rounded-2xl shadow-elevated border border-border p-4 relative">
          <button onClick={() => setDismissed(true)} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          <p className="text-sm font-bold text-foreground mb-1 pr-6">Need admission help? 🎓</p>
          <p className="text-xs text-muted-foreground mb-3">Talk to our expert — it's free!</p>
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent text-white text-xs font-bold shadow-lg shadow-accent/20 hover:bg-accent/90 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
