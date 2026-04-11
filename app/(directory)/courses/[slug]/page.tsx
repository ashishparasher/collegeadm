// app/(directory)/courses/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { BookOpen, GraduationCap, ChevronRight } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({ select: { slug: true } });
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });
  if (!course) return { title: 'Course Not Found' };
  
  return {
    title: `Best Colleges for ${course.name} - Direct Admission 2026`,
    description: `Explore the top-rated colleges offering ${course.name} programs. Get details on fees, eligibility, and direct admission support.`,
  };
}

export default async function CoursePage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      colleges: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!course) notFound();

  const listings = course.colleges.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: course.name,
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner'
  }));

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{course.name}</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Course Guide</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Best Colleges for {course.name}
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Explore {listings.length} premier institutions offering {course.name} programs with direct admission support and management quota options.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No colleges listed yet</h3>
            <p className="text-gray-500">We are currently updating our database for {course.name} colleges.</p>
          </div>
        )}
      </div>
    </div>
  );
}
