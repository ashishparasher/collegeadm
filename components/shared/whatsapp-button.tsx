'use client';

import { MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';

export function WhatsAppButton() {
  const url = `https://wa.me/91${SITE.phoneDisplay.replace(/\s/g, '')}?text=Hi, I need help with college admission.`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" />
      <div className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </div>
    </a>
  );
}
