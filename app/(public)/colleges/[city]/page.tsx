import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollegesByCity } from '@/services/college.service';
import { getCityVariants } from '@/lib/utils';
import { CollegeCard } from '@/components/cards/college-card';
import { LeadForm } from '@/components/forms/lead-form';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';
import { MessageSquare, MapPin } from 'lucide-react';

const VALID_CITIES = ['bangalore', 'mysore', 'mangalore', 'hubli', 'belgaum', 'davangere', 'tumkur', 'shimoga', 'gulbarga', 'udupi', 'kolar', 'bidar'];

export async function generateStaticParams() {
  return VALID_CITIES.map(city => ({ city }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `Top Colleges in ${cityName} 2026 – Admission Guide`,
    description: `Explore the best colleges in ${cityName}. Direct admission guidance, fees, rankings, and management quota support for MBBS, BAMS, Engineering.`,
    alternates: { canonical: `${SITE.url}/colleges/${params.city}` },
  };
}

export default async function CityCollegesPage({ params }: { params: { city: string } }) {
  if (!VALID_CITIES.includes(params.city)) notFound();

  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const variants = getCityVariants(params.city);
  const colleges = await getCollegesByCity(variants, 20);

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${SITE.url}/colleges` },
      { '@type': 'ListItem', position: 3, name: cityName, item: `${SITE.url}/colleges/${params.city}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-background pt-20">
        <div className="gradient-hero py-16 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <Badge variant="accent" className="mb-4 gap-2 py-1.5">
              <MapPin className="w-3 h-3" /> {cityName}, Karnataka
            </Badge>
            <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-white mb-4">
              Top Colleges in {cityName}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Explore {colleges.length} premier institutions in {cityName}. Get direct admission support, fee details, and expert counselling.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
            <div>
              {colleges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {colleges.map((c: any, i) => <CollegeCard key={c.id} college={c} index={i} />)}
                </div>
              ) : (
                <div className="bg-card rounded-4xl border border-border p-12 text-center text-muted-foreground">
                  <p className="text-lg font-bold mb-2">No colleges found in {cityName} yet.</p>
                  <p>Browse our full directory for more options.</p>
                </div>
              )}
            </div>

            <aside className="sticky top-24">
              <div className="gradient-hero rounded-5xl shadow-2xl p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5"><MessageSquare className="w-20 h-20" /></div>
                <h3 className="font-comfortaa font-bold text-white text-lg mb-5 text-center relative z-10">
                  Get Admission Help in {cityName}
                </h3>
                <div className="relative z-10">
                  <LeadForm collegeName={`Colleges in ${cityName}`} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
