import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCourses, COURSE_DATA } from '@/services/course.service';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';
import { ArrowUpRight, BookOpen, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Courses – Direct Admission in Karnataka 2026',
  description: 'Explore MBBS, BAMS, BPT, B.Tech, MBA and more courses offered in Karnataka colleges. Direct admission guidance available.',
  alternates: { canonical: `${SITE.url}/courses` },
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  const streams: Record<string, string[]> = {
    'Medical & Dental': ['mbbs', 'bds', 'bhms'],
    'Ayurveda & AYUSH': ['bams'],
    'Nursing & Paramedical': ['bsc-nursing', 'gnm-nursing', 'bpt', 'mpt', 'bpharm', 'bsc-mlt'],
    'Engineering & Technology': ['btech', 'mtech', 'diploma-engineering'],
    'Management & IT': ['mba', 'mca'],
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-5">
            <BookOpen className="w-3 h-3" /> Course Directory
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Explore Courses
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {courses.length} professional courses with direct admission guidance across Karnataka colleges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {Object.entries(streams).map(([stream, slugs]) => {
          const streamCourses = courses.filter(c => slugs.includes(c.slug));
          if (streamCourses.length === 0) return null;
          return (
            <section key={stream}>
              <h2 className="font-comfortaa font-bold text-xl text-foreground mb-6">{stream}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {streamCourses.map((course) => {
                  const meta = COURSE_DATA[course.slug];
                  const count = course.colleges?.length ?? 0;
                  return (
                    <Link href={`/courses/${course.slug}`} key={course.id} className="group">
                      <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                          {meta?.icon || '📚'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">{course.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{meta?.duration || 'Varies'}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-[10px]">
                              <GraduationCap className="w-3 h-3 mr-1" /> {count} colleges
                            </Badge>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
