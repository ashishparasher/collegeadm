import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, BookOpen, ChevronRight, Phone, Clock, Users, ExternalLink } from 'lucide-react';
import { getCollegeWithRelations, getSimilarColleges } from '@/services/college.service';
import { extractHeadings } from '@/lib/utils';
import { LeadForm } from '@/components/forms/lead-form';
import { CollegeCard } from '@/components/cards/college-card';
import { CollegeTabs } from '@/components/shared/college-tabs';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { cleanSlug } from '@/lib/utils';

export async function generateStaticParams() {
  const colleges = await prisma.college.findMany({ select: { slug: true } });
  const slugs = new Set<string>();
  colleges.forEach(c => { slugs.add(c.slug); slugs.add(cleanSlug(c.slug)); });
  return Array.from(slugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await getCollegeWithRelations(params.slug);
  if (!c) return { title: 'College Not Found' };
  return {
    title: `${c.shortTitle} – Admission 2026, Fees, Courses, Placements`,
    description: `${c.shortTitle} admission 2026. Courses, fees, cutoff, placement info & management quota guidance.`,
    alternates: { canonical: `${SITE.url}/college/${c.slug}` },
    openGraph: { title: c.shortTitle, description: c.excerpt, url: `${SITE.url}/college/${c.slug}`, type: 'article', ...(c.featuredImage ? { images: [{ url: c.featuredImage }] } : {}) },
  };
}

export default async function CollegeDetailPage({ params }: { params: { slug: string } }) {
  const college = await getCollegeWithRelations(params.slug);
  if (!college) notFound();

  const similar = await getSimilarColleges(college.city, college.id, 3);
  const headings = extractHeadings(college.content);
  const imageSrc = college.featuredImage?.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  const schemas = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${SITE.url}/colleges` },
      { '@type': 'ListItem', position: 3, name: college.shortTitle, item: `${SITE.url}/college/${college.slug}` },
    ]},
    { '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: college.shortTitle, description: college.excerpt, url: `${SITE.url}/college/${college.slug}`, address: { '@type': 'PostalAddress', addressLocality: college.city, addressRegion: 'Karnataka', addressCountry: 'IN' }},
  ];

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <div className="min-h-screen bg-background pt-20">
        {/* Hero Banner */}
        <div className="relative">
          <div className="absolute inset-0 h-72 gradient-hero" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
            <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-6 font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80 truncate max-w-xs">{college.shortTitle}</span>
            </nav>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end">
              <div>
                <h1 className="font-comfortaa font-bold text-2xl lg:text-3xl text-white mb-4 leading-tight">{college.name}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm gap-1.5 py-1.5"><MapPin className="w-3 h-3" /> {college.location}</Badge>
                  {college.ranking && <Badge className="bg-accent/90 text-white border-none gap-1.5 py-1.5"><BookOpen className="w-3 h-3" /> {college.ranking}</Badge>}
                  {college.category && <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm py-1.5">{college.category.name}</Badge>}
                  {college.fees && <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm py-1.5">₹ {college.fees}</Badge>}
                </div>
              </div>
              {imageSrc && (
                <div className="hidden lg:block w-44 h-28 rounded-2xl overflow-hidden relative shadow-2xl border-2 border-white/20">
                  <Image src={imageSrc} alt={college.shortTitle} fill className="object-cover" sizes="176px" priority />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-6 overflow-x-auto text-sm">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0"><Clock className="w-4 h-4 text-accent" /> <span className="font-semibold">2026-27</span></div>
              <div className="flex items-center gap-2 text-muted-foreground shrink-0"><Users className="w-4 h-4 text-accent" /> <span className="font-semibold">Management Quota</span></div>
              {college.courses && college.courses.length > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground shrink-0"><BookOpen className="w-4 h-4 text-accent" /> <span className="font-semibold">{college.courses.length} Courses</span></div>
              )}
              {college.website && (
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent font-semibold shrink-0 ml-auto hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" /> Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs + Content */}
        <div className="grid lg:grid-cols-[1fr_340px] items-start">
          <div>
            <CollegeTabs college={college} headings={headings} />
          </div>
          <aside className="p-4 sm:p-6 lg:py-10 lg:pr-8 space-y-5 sticky top-16">
            <div className="gradient-hero rounded-3xl p-6 relative overflow-hidden surface-elevated">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <h3 className="font-comfortaa font-bold text-white text-lg mb-1 text-center">Admission Enquiry</h3>
                <p className="text-white/40 text-xs text-center mb-5">Get seat & fee details</p>
                <LeadForm collegeId={college.id} collegeName={college.shortTitle} />
              </div>
            </div>
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-4 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Phone className="w-5 h-5 text-emerald-600" /></div>
              <div><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Call Expert</p><p className="font-bold text-foreground">+91 {SITE.phoneDisplay}</p></div>
            </a>
            {college.courses && college.courses.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Courses Offered</p>
                <div className="flex flex-wrap gap-1.5">
                  {college.courses.map((c: any) => (
                    <Link key={c.id} href={`/courses/${c.slug}`}><Badge variant="secondary" className="text-[10px] hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors">{c.name}</Badge></Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="font-comfortaa font-bold text-2xl text-foreground mb-8">Similar Colleges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{similar.map((c: any, i) => <CollegeCard key={c.id} college={c} index={i} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
