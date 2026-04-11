// app/(directory)/blog/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BlogCard } from '@/components/ui/StatsBar';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admission Blog – Guides, Tips & College Insights | CollegeAdm',
  description: 'Expert admission guides for MBBS, BAMS, BPT, and Engineering colleges in Bangalore. NEET cutoffs, fee structures, management quota explained.',
  alternates: { canonical: 'https://collegeadm.org/blog' },
};

export default async function BlogIndexPage() {
  const dbPosts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const posts = dbPosts.map(p => ({
    ...p,
    date: p.createdAt.toISOString(),
    seo: {
      title: p.metaTitle || p.title,
      description: p.metaDescription || ''
    }
  }));

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Knowledge Hub</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Admission Guides & Insights
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            {posts.length} expert-written guides to help you navigate college admissions, understand fee structures, and secure your seat.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post as any} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
