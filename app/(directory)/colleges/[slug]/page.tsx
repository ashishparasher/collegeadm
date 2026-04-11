// app/(directory)/colleges/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import {
  generateListingMetadata,
  listingBreadcrumbSchema,
  collegeOrganizationSchema,
} from '@/lib/seo-utils';
import { extractHeadings } from '@/lib/utils';
import { ContentRenderer } from '@/components/directory/ContentRenderer';
import { BlogSidebar } from '@/components/directory/BlogSidebar';
import { ListingCard } from '@/components/directory/ListingCard';
import { LeadForm } from '@/components/ui/LeadForm';

interface Props {
  params: { slug: string };
}

// ─── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const colleges = await prisma.college.findMany({ select: { slug: true } });
  return colleges.map((l) => ({ slug: l.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await prisma.college.findUnique({ where: { slug: params.slug } });
  if (!listing) return { title: 'College Not Found' };
  // Mock SEO fields for schema compat
  const seoListing = { ...listing, shortTitle: listing.name, seo: { title: listing.name, description: listing.description.slice(0, 160), focus_keyword: '' }, city: listing.location };
  return generateListingMetadata(seoListing as any);
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CollegeDetailPage({ params }: Props) {
  const listing = await prisma.college.findUnique({
    where: { slug: params.slug },
  });

  if (!listing) notFound();

  // Similar colleges
  const similar = await prisma.college.findMany({
    where: { 
      id: { not: listing.id },
      // Matching by city or something for similarity
      location: { contains: listing.location.split(',')[0] }
    },
    take: 3,
  });

  const headings = extractHeadings(listing.description);
  
  // Re-map for existing components
  const displayListing = {
    ...listing,
    shortTitle: listing.name,
    city: listing.location,
    content: listing.description,
    courseType: 'Direct Admission',
    collegeType: 'Partner',
    seo: { title: listing.name, description: listing.description.slice(0, 160) }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50/30 pt-20">
        {/* Hero */}
        <div className="gradient-navy py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-navy-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70 truncate max-w-xs">{listing.name}</span>
            </nav>

            <h1 className="font-comfortaa font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4 text-balance leading-tight">
              {listing.name}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-navy-200 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-400" />
                {listing.location}
              </span>
              {listing.ranking && (
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-orange-400" />
                  {listing.ranking}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 min-w-0">
              <ContentRenderer html={listing.description} />
            </article>

            {/* Sticky Lead Form & Sidebar */}
            <aside className="space-y-8 sticky top-24">
              <div className="bg-white rounded-3xl border border-navy-100 shadow-xl shadow-navy-900/5 p-6 border-t-4 border-t-orange-500">
                <h3 className="font-comfortaa font-bold text-navy-800 text-lg mb-4 text-center">
                  Direct Admission Enquiry
                </h3>
                <LeadForm collegeId={listing.id} collegeName={listing.name} />
              </div>
              <BlogSidebar headings={headings} />
            </aside>
          </div>

          {/* Similar colleges */}
          {similar.length > 0 && (
            <section className="mt-16">
              <h2 className="font-comfortaa font-bold text-2xl text-navy-800 mb-8">
                Similar Colleges in {listing.location.split(',')[0]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similar.map((l: any, i) => (
                  <ListingCard 
                    key={l.id} 
                    listing={{
                      ...l, 
                      shortTitle: l.name.split('|')[0].split('-')[0].trim(), 
                      city: l.location.split(',')[0].trim(), 
                      courseType: 'Direct Admission',
                      featured_image: l.featuredImage,
                      excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
                      collegeType: 'Partner'
                    }} 
                    index={i} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Comparison Suggestions */}
          <section className="mt-16 bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
            <h2 className="font-comfortaa font-bold text-2xl text-navy-800 mb-6">Popular Comparisons</h2>
            <div className="flex flex-wrap gap-4">
              {similar.slice(0, 4).map((l: any) => (
                <Link 
                  key={l.id}
                  href={`/compare/${listing.slug}-vs-${l.slug}`}
                  className="px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold text-navy-700 hover:bg-navy-700 hover:text-white transition-all shadow-sm"
                >
                  {listing.name.split('|')[0].split('-')[0].trim()} vs {l.name.split('|')[0].split('-')[0].trim()}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
