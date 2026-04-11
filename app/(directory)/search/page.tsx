// app/(directory)/search/page.tsx
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { SearchFilter } from '@/components/directory/SearchFilter';
import { Search as SearchIcon, GraduationCap } from 'lucide-react';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; course?: string; city?: string };
}) {
  const query = searchParams.q || '';
  
  const dbListings = await prisma.college.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { location: { contains: query } },
        { description: { contains: query } },
      ],
    },
    include: { courses: true },
    orderBy: { createdAt: 'desc' },
  });

  const listings = dbListings.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: l.courses[0]?.name || 'Direct Admission',
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner',
    terms: l.courses.map(c => ({ term_id: c.id, name: c.name, slug: c.slug, taxonomy: 'course' }))
  }));

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <SearchIcon className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Advanced Search</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Find Your Ideal College
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            {query ? `Search results for "${query}"` : 'Browse our comprehensive directory of partner institutions.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchFilter listings={listings as any} />
      </div>
    </div>
  );
}
