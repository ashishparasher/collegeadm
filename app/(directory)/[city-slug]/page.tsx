// app/(directory)/colleges-in-[city]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { MapPin, ChevronRight, Building2, CheckCircle2, Phone, MessageSquare, Info, HelpCircle, Sparkles } from 'lucide-react';
import { generateCitySEOTemplate } from '@/lib/templates';
import { LeadForm } from '@/components/ui/LeadForm';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { getCityVariants } from '@/lib/utils';

interface Props {
  params: { "city-slug": string };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = ["bangalore", "mysore", "mangalore", "hubli", "belgaum"];
  return cities.map((city) => ({ "city-slug": `colleges-in-${city}` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.["city-slug"] || "";
  if (!slug.startsWith("colleges-in-")) return {};
  
  const city = slug.replace("colleges-in-", "");
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://collegeadm.org';
  
  return {
    title: `Best Colleges in ${cityName} 2026 | Direct Admission Guide`,
    description: `Explore the top colleges in ${cityName} with updated fees, rankings and admission details. Secure your direct admission under management quota seats today.`,
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
    openGraph: {
      title: `Top Colleges in ${cityName} | Admission Guide`,
      description: `Discover top-ranked colleges in ${cityName}. Get complete details on fees, rankings and more.`,
      url: `${baseUrl}/${slug}`,
      type: 'website',
    }
  };
}

export default async function CityPage({ params }: Props) {
  const year = new Date().getFullYear();
  const slug = params?.["city-slug"] || "";
  
  if (!slug.startsWith("colleges-in-")) {
    notFound();
  }
  
  const cityParam = slug.replace("colleges-in-", "");
  const cityName = cityParam.charAt(0).toUpperCase() + cityParam.slice(1);
  const cityVariants = getCityVariants(cityParam);
  
  // Try to find colleges in specific city
  let dbListings = await prisma.college.findMany({
    where: {
      OR: cityVariants.map(variant => ({
        location: {
          contains: variant,
          mode: 'insensitive'
        }
      }))
    },
    include: {
      courses: true
    },
    orderBy: { createdAt: 'desc' }
  });

  let isFallback = false;
  // If no colleges found, fallback to statewide (Karnataka) featured colleges
  if (dbListings.length === 0) {
    isFallback = true;
    dbListings = await prisma.college.findMany({
      where: {
        OR: [
          { location: { contains: 'Karnataka', mode: 'insensitive' } },
          { location: { contains: 'Bangalore', mode: 'insensitive' } }
        ]
      },
      take: 6,
      include: { courses: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  const listings = dbListings.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: 'Admission 2026',
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner'
  }));

  const { intro, admissionProcess, whyStudy, faqs } = generateCitySEOTemplate(cityParam, listings);

  // Schema Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegeadm.org' },
          { '@type': 'ListItem', position: 2, name: 'Colleges', item: 'https://collegeadm.org/colleges' },
          { '@type': 'ListItem', position: 3, name: `Colleges in ${cityName}` }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };

  const featuredCollegeImage = listings[0]?.featuredImage || '/images/blog-placeholder.jpg';

  return (
    <div className="min-h-screen bg-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy z-0">
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-navy-200 mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/70">Colleges in {cityName}</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-white text-[11px] font-bold uppercase tracking-wider">Admission Guide {year}-{year+1}</span>
              </div>
              
              <h1 className="font-comfortaa font-bold text-4xl lg:text-6xl text-white mb-6 leading-tight">
                Top Colleges in <span className="text-orange-400 underline underline-offset-8 decoration-white/20">{cityName}</span>
              </h1>
              <p className="text-navy-100/80 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl font-medium">
                Explore premier institutions in {cityName}. Secure your management quota seat with 100% transparency and expert guidance.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#listings" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 hover:bg-orange-600 transition-all hover:scale-105">
                  Browse Colleges
                </a>
                <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
                  Get Free Counselling
                </a>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 relative z-10 border-8 border-white/10">
                <Image 
                  src={featuredCollegeImage} 
                  alt={`${cityName} Colleges`} 
                  fill 
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 p-8 rounded-[2rem] bg-orange-500 text-white shadow-2xl z-20 -rotate-3 animate-float">
                <p className="text-4xl font-bold font-comfortaa mb-1">{year}</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Admissions Open</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 prose prose-lg prose-navy max-w-none">
              <div className="text-gray-600 leading-[1.8]" dangerouslySetInnerHTML={{ __html: intro }} />
              
              <div className="my-16 bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div dangerouslySetInnerHTML={{ __html: admissionProcess }} />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-navy rounded-[2.5rem] p-8 text-white shadow-2xl shadow-navy-900/20 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare className="w-20 h-20" />
                  </div>
                  <h3 className="font-comfortaa font-bold text-2xl mb-6 relative z-10">Instant Admission Query</h3>
                  <LeadForm />
                </div>
                
                <div className="bg-orange-50 rounded-[2.5rem] p-8 border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Call Expert</p>
                      <p className="font-bold text-navy-800">+91 77070 55155</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Speak directly with our senior consultant for management quota seat availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College List Section */}
      <section id="listings" className="py-24 bg-[#fcfdfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-orange-600" />
                 </div>
                 <span className="text-orange-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                   {isFallback ? 'Recommended Institutions' : 'Partner Colleges'}
                 </span>
              </div>
              <h2 className="font-comfortaa font-bold text-3xl lg:text-5xl text-navy-800 leading-tight">
                {isFallback ? `Top Colleges in Karnataka` : `Best Colleges in ${cityName}`}
              </h2>
              <p className="text-gray-500 mt-4 text-lg">
                {isFallback 
                  ? `While we update our ${cityName} list, explore these premier institutions in Karnataka.`
                  : `Comparing features, infrastructure and placement records of top institutions in ${cityName}.`}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/colleges" className="inline-flex items-center gap-2 text-navy-600 font-bold hover:text-orange-600 transition-colors">
              View All Colleges in India <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fees Table Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-800 font-comfortaa mb-6">Fees & Ranking Comparison</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Quick overview of the fee structure and regional rankings for major institutions.</p>
          </div>
          
          <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-xl shadow-navy-900/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider">College Name</th>
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider">Location</th>
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider text-center">Fees (Annual)</th>
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider text-center">NIRF/Ranking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listings.slice(0, 8).map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <Link href={`/colleges/${l.slug}`} className="font-bold text-navy-800 hover:text-orange-500 transition-colors">
                        {l.shortTitle}
                      </Link>
                    </td>
                    <td className="px-8 py-6 text-gray-500 text-sm flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" /> {l.city}
                    </td>
                    <td className="px-8 py-6 text-center font-medium text-navy-700">
                      {l.fees || 'Check Fees'}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold uppercase">
                        {l.ranking || 'Top 50'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Study Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div dangerouslySetInnerHTML={{ __html: whyStudy }} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-50 text-navy-600 mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-800 font-comfortaa mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find answers to the most common queries regarding college admissions in {cityName}.</p>
          </div>
          
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA Footer */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto bg-navy rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-comfortaa font-bold text-3xl lg:text-6xl text-white mb-8 leading-tight">
              Ready to secure your seat in {cityName}?
            </h2>
            <p className="text-navy-100/70 text-lg lg:text-xl mb-12">
              Our experts are ready to guide you through the entire management quota process for {year} academic session.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+917707055155"
                className="px-10 py-5 rounded-2xl bg-orange-500 text-white font-bold text-lg shadow-2xl shadow-orange-500/30 hover:bg-orange-600 transition-all hover:scale-105"
              >
                Call Consultant
              </a>
              <Link
                href="/contact"
                className="px-10 py-5 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                Send Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
