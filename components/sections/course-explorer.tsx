'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { COURSE_DATA } from '@/services/course.service';

const COURSES = [
  { name: 'MBBS', slug: 'mbbs' }, { name: 'BAMS', slug: 'bams' }, { name: 'BDS', slug: 'bds' },
  { name: 'B.Tech', slug: 'btech' }, { name: 'MBA', slug: 'mba' }, { name: 'BPT', slug: 'bpt' },
  { name: 'B.Sc Nursing', slug: 'bsc-nursing' }, { name: 'B.Pharm', slug: 'bpharm' },
  { name: 'MCA', slug: 'mca' }, { name: 'BHMS', slug: 'bhms' },
];

export function CourseExplorer() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-5">
            📚 Browse by Course
          </div>
          <h2 className="font-comfortaa font-bold text-3xl lg:text-[2.75rem] text-foreground leading-tight">
            Explore by Course
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Find colleges offering your preferred course in Karnataka.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {COURSES.map((course, i) => {
            const meta = COURSE_DATA[course.slug];
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link href={`/courses/${course.slug}`} className="block group">
                  <div className="bg-card rounded-2xl border border-border p-5 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{meta?.icon || '📚'}</div>
                    <p className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">{course.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-semibold">{meta?.duration || '-'}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/courses" className="text-sm font-bold text-accent hover:underline inline-flex items-center gap-1">
            View All Courses <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
