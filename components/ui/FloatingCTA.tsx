'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Send } from 'lucide-react';
import Link from 'next/link';

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-72"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-comfortaa font-bold text-navy-700">Get Free Counselling</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Our experts will guide you through the admission process — completely free.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="tel:+917707055155"
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-navy-700 text-white text-sm font-semibold hover:bg-navy-800 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now: +91 77070 55155
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Enquiry
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-2xl bg-[#ff6f00] text-white shadow-2xl shadow-orange-500/40 flex items-center justify-center relative"
            aria-label="Open counselling chat"
          >
            {!isOpen && (
              <motion.span
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
