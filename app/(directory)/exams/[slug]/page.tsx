// app/(directory)/exams/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { FileText, ChevronRight, GraduationCap } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const exams = await prisma.exam.findMany({ select: { slug: true } });
  return exams.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exam = await prisma.exam.findUnique({ where: { slug: params.slug } });
  if (!exam) return { title: 'Exam Not Found' };
  
  return {
    title: `${exam.name} 2026 - Eligibility, Dates & Participating Colleges`,
    description: `Complete guide to ${exam.name}. Find colleges accepting ${exam.name} scores and get direct admission support.`,
  };
}

export default async function ExamPage({ params }: Props) {
  const exam = await prisma.exam.findUnique({
    where: { slug: params.slug },
    include: {
      colleges: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!exam) notFound();

  const listings = exam.colleges.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: 'Accepts ' + exam.name,
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
            <span className="text-white/70">{exam.name} Exam</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Entrance Exam Guide</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            {exam.name} 2026 Information
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Everything you need to know about {exam.name}: eligibility criteria, important dates, and premier colleges accepting these scores.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Exam Content */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 college-prose">
              <h2>Overview of {exam.name}</h2>
              <p>{exam.description || `The ${exam.name} is a competitive entrance examination conducted for admission to various undergraduate and postgraduate programs in India.`}</p>
              
              <h2>Colleges Accepting {exam.name}</h2>
              <p>Below are some of the top-rated partner institutions where you can apply with your ${exam.name} scores.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {listings.map((l, i) => (
                  <ListingCard key={l.id} listing={l} index={i} />
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-navy rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
              <h3 className="font-comfortaa font-bold text-xl mb-4 relative z-10">Direct Admission?</h3>
              <p className="text-navy-100 text-sm mb-6 relative z-10 leading-relaxed">
                Didn't get the desired score in {exam.name}? You can still secure a seat through management quota.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all relative z-10 shadow-lg shadow-orange-900/20"
              >
                Get Expert Guidance
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
