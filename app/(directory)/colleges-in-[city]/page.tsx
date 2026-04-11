// app/(directory)/colleges-in-[city]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  const colleges = await prisma.college.findMany({ select: { location: true } });
  const cities = Array.from(new Set(colleges.map(c => c.location.split(',')[0].trim().toLowerCase())));
  return cities.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = params?.city ? (params.city.charAt(0).toUpperCase() + params.city.slice(1)) : 'Locations';
  return {
    title: `Best Colleges in ${city} - Direct Admission 2026`,
    description: `Discover top colleges in ${city}. Get expert guidance for management quota and direct admission seats in ${city}'s premier institutions.`,
  };
}

export default async function CityPage({ params }: Props) {
  const cityName = params?.city ? (params.city.charAt(0).toUpperCase() + params.city.slice(1)) : 'Unknown';
  
  const dbListings = await prisma.college.findMany({
    where: {
      location: {
        contains: params?.city || ''
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const listings = dbListings.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: 'Direct Admission',
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner'
  }));

  if (listings.length === 0) {
    // If no colleges found, it might still be a valid SEO page, but we'll show empty state
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">Colleges in {cityName}</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Location Guide</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Top Colleges in {cityName}
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Explore {listings.length} top-tier institutions in {cityName}. Secure your future with direct admission and management quota seats.
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
            <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No colleges found in {cityName}</h3>
            <p className="text-gray-500">We are expanding our network. Check back soon for colleges in this location.</p>
          </div>
        )}
      </div>
    </div>
  );
}
