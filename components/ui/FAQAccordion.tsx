'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  faqs: { q: string; a: string }[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map(({ q, a }, i) => (
        <div
          key={i}
          className={cn(
            'bg-white rounded-2xl border transition-all duration-200',
            open === i ? 'border-navy-200 shadow-md shadow-navy-500/8' : 'border-gray-100 shadow-sm'
          )}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 p-6 text-left"
          >
            <span className={cn('font-comfortaa font-bold text-base leading-snug transition-colors', open === i ? 'text-navy-700' : 'text-gray-800')}>
              {q}
            </span>
            <div className={cn(
              'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
              open === i ? 'bg-navy-700 rotate-180' : 'bg-gray-100'
            )}>
              <ChevronDown className={cn('w-4 h-4 transition-colors', open === i ? 'text-white' : 'text-gray-500')} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
