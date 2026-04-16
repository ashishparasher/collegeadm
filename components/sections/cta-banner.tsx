'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';

export function CtaBanner() {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative"
      >
        <div className="gradient-hero rounded-[2.5rem] p-10 lg:p-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/15 rounded-full blur-[80px]" />
          <div className="absolute top-6 right-8 w-16 h-16 border border-white/10 rounded-2xl rotate-12" />
          <div className="absolute bottom-8 left-10 w-12 h-12 border border-white/5 rounded-full" />

          <div className="relative z-10 text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-bold mb-6 border border-white/10">
              <Sparkles className="w-3 h-3" /> Limited Seats Available
            </div>
            <h2 className="font-comfortaa font-bold text-3xl lg:text-4xl text-white mb-5 leading-tight">
              Ready to secure your future?
            </h2>
            <p className="text-white/50 text-base mb-10 leading-relaxed">
              Our experts guide you through the entire admission process — completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full bg-white text-foreground hover:bg-white/90 shadow-xl group font-bold">
                <a href={`tel:${SITE.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button asChild size="lg" className="rounded-full bg-accent text-white hover:bg-accent/90 shadow-xl shadow-accent/30 group font-bold">
                <Link href="/contact">
                  Send Enquiry <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
