'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EXAM_DATA } from '@/services/exam.service';

const EXAMS = [
  { name: 'NEET UG', slug: 'neet-ug' },
  { name: 'KCET', slug: 'kcet' },
  { name: 'COMEDK UGET', slug: 'comedk' },
  { name: 'Karnataka PGCET', slug: 'karnataka-pgcet' },
];

export function UpcomingExams() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-subtle" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold mb-5">
              📅 Exam Calendar
            </div>
            <h2 className="font-comfortaa font-bold text-3xl lg:text-[2.75rem] text-foreground leading-tight">Upcoming Exams</h2>
            <p className="text-muted-foreground mt-3 max-w-md">Key entrance exams for Karnataka college admissions.</p>
          </div>
          <Link href="/exams" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1 shrink-0">
            All Exams <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXAMS.map((exam, i) => {
            const meta = EXAM_DATA[exam.slug];
            return (
              <motion.div
                key={exam.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/exams/${exam.slug}`} className="block group">
                  <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                    <div className="text-2xl mb-3">{meta?.icon || '📝'}</div>
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors text-sm mb-2">{exam.name}</h3>
                    {meta && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="w-3 h-3 text-accent" /> {meta.date}</div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Monitor className="w-3 h-3 text-accent" /> {meta.mode.split('(')[0].trim()}</div>
                      </div>
                    )}
                    <Badge variant="secondary" className="text-[9px] mt-3">{meta?.level || 'Exam'}</Badge>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
