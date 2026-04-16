'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab { id: string; label: string; icon?: React.ReactNode }

export function TabsNav({ tabs, activeTab, onChange }: { tabs: Tab[]; activeTab: string; onChange: (id: string) => void }) {
  return (
    <div className="flex overflow-x-auto no-scrollbar border-b border-border bg-card sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-5 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap flex items-center gap-2',
              activeTab === tab.id ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.icon}{tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TabPanel({ children, id, active }: { children: React.ReactNode; id: string; active: string }) {
  if (id !== active) return null;
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
