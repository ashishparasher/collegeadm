// app/(directory)/colleges/page.tsx
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { SearchFilter } from '@/components/directory/SearchFilter';
import { GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Colleges – Direct Admission 2026 | CollegeAdm',
  description:
    'Browse top partner colleges in Karnataka. Find direct admission for MBBS, BAMS, BPT, B.Tech with expert counselling support.',
  alternates: { canonical: 'https://collegeadm.org/colleges' },
};

export default async function CollegesPage() {
  const dbListings = await prisma.college.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Re-map for existing SearchFilter component
  const listings = dbListings.map((l) => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: 'Direct Admission',
    collegeType: 'Partner',
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    terms: []
  }));

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      {/* Page header */}
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">College Directory</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            All Partner Colleges
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Explore {listings.length} top institutions in Karnataka. Filter by course, city, and more. Direct admission guidance available for every college.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchFilter listings={listings as any} />
      </div>
    </div>
  );
}
