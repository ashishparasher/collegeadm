'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CollegeCard } from '@/components/cards/college-card';
import { Button } from '@/components/ui/button';
import type { CollegeListing } from '@/types';

export function FeaturedColleges({ colleges }: { colleges: CollegeListing[] }) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-14 gap-6"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-5">
              <Sparkles className="w-3 h-3" /> Curated Selection
            </div>
            <h2 className="text-3xl lg:text-[2.75rem] text-foreground leading-[1.15]">
              Explore Partner Institutions
            </h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Handpicked colleges with verified admission seats for the upcoming academic session.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full group shrink-0">
            <Link href="/colleges">
              Browse All <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {colleges.map((c: any, i) => <CollegeCard key={c.id} college={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
