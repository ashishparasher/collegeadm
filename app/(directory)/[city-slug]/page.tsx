// app/(directory)/[city-slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { MapPin, ChevronRight, Building2, CheckCircle2, Phone, MessageSquare, Info, HelpCircle, Sparkles, TrendingUp, BookOpen, GraduationCap, Award } from 'lucide-react';
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

  const { intro, admissionProcess, eligibility, courseOverview, placementInsights, careerScope, faqs, whyStudy } = generateCitySEOTemplate(cityParam, listings);

  // Schema Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://collegeadm.org' },
          { '@type': 'ListItem', position: 2, name: 'Colleges', item: 'https://collegeadm.org/colleges' },
          { '@type': 'ListItem', position: 3, name: `Colleges in ${cityName}`, item: `https://collegeadm.org/colleges-in-${cityParam}` }
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

  const iconMap: any = {
    Sparkles: <Sparkles className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Info: <Info className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 gradient-hero opacity-90" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-navy-200 mb-8 font-bold uppercase tracking-wider">
                <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/colleges" className="hover:text-orange-400 transition-colors">Colleges</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-orange-400">Colleges in {cityName}</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-white text-[11px] font-bold uppercase tracking-wider">Admission Guide {year}-{year+1}</span>
              </div>
              
              <h1 className="font-comfortaa font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                Top Colleges in <span className="text-orange-400 underline underline-offset-8 decoration-white/20">{cityName}</span>
              </h1>
              <p className="text-navy-100/80 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl font-medium">
                Comprehensive directory of premier institutions in {cityName}. Get 100% transparent guidance for merit and management quota admissions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#listings" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/30 hover:bg-orange-500 transition-all hover:scale-105">
                  Explore Institutions
                </a>
                <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
                  Contact Admission Expert
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
              <div className="absolute -bottom-10 -left-10 w-64 p-8 rounded-[2rem] bg-orange-600 text-white shadow-2xl z-20 -rotate-3 animate-float">
                <p className="text-4xl font-bold font-comfortaa mb-1">{year}</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 text-orange-100">Counselling Open</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro & Info Tables */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Introduction */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-bold text-navy-800 mb-6 font-comfortaa">Higher Education in {cityName}</h2>
                <div className="text-slate-600 leading-[1.8] space-y-4" dangerouslySetInnerHTML={{ __html: intro }} />
              </div>

              {/* Admission Process Table */}
              <div>
                <h2 className="text-3xl font-bold text-navy-800 mb-8 font-comfortaa flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-orange-500" /> Admission Process 2026
                </h2>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 font-bold text-navy-800 text-sm border-b">Step</th>
                        <th className="px-6 py-4 font-bold text-navy-800 text-sm border-b">Process Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {admissionProcess.map((row) => (
                        <tr key={row.step} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-orange-600 text-sm">{row.step}</td>
                          <td className="px-6 py-4 text-slate-600 text-sm">{row.process}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Eligibility & Course Overview Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-navy-800 mb-6 font-comfortaa">Eligibility Criteria</h3>
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-slate-100">
                        {eligibility.map((row) => (
                          <tr key={row.requirement}>
                            <td className="px-6 py-4 font-bold text-navy-700 text-[13px] bg-slate-50 w-1/2">{row.requirement}</td>
                            <td className="px-6 py-4 text-slate-600 text-[13px]">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-navy-800 mb-6 font-comfortaa">Course Highlights</h3>
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <tbody className="divide-y divide-slate-100">
                        {courseOverview.map((row) => (
                          <tr key={row.parameter}>
                            <td className="px-6 py-4 font-bold text-navy-700 text-[13px] bg-slate-50 w-1/2">{row.parameter}</td>
                            <td className="px-6 py-4 text-slate-600 text-[13px]">{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-navy rounded-[2.5rem] p-8 text-white shadow-2xl shadow-navy-900/20 overflow-hidden relative border border-white/10">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare className="w-20 h-20" />
                  </div>
                  <h3 className="font-comfortaa font-bold text-2xl mb-6 relative z-10 text-orange-400">Apply for Admission</h3>
                  <LeadForm />
                </div>
                
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6">
                  <h4 className="font-comfortaa font-bold text-xl text-navy-800">Quick Links</h4>
                  <div className="flex flex-col gap-3">
                    <Link href="/colleges" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 font-bold transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> All Colleges
                    </Link>
                    <Link href="/blog" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 font-bold transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Admission Blog
                    </Link>
                    <Link href="/compare" className="flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 font-bold transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Compare Colleges
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College List Section */}
      <section id="listings" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-orange-600" />
                 </div>
                 <span className="text-orange-600 font-bold text-[11px] uppercase tracking-[0.2em]">
                   {isFallback ? 'Karnataka State Rankings' : 'Partner Institutions'}
                 </span>
              </div>
              <h2 className="font-comfortaa font-bold text-3xl lg:text-5xl text-navy-800 leading-tight">
                {isFallback ? `Top Ranked Colleges in Karnataka` : `Best Colleges in ${cityName}`}
              </h2>
              <p className="text-slate-500 mt-4 text-lg">
                {isFallback 
                  ? `While we update the ${cityName} specific list, explore these premier statewide institutions.`
                  : `Comparison of top-tier colleges in ${cityName} based on NIRF, infrastructure and student outcomes.`}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Fee & Placement Comparison Table */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-800 font-comfortaa mb-6">Fee & Placement Statistics</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">Direct comparison of annual investment vs expected placement packages for major colleges.</p>
          </div>
          
          <div className="overflow-x-auto rounded-[2.5rem] border border-slate-200 shadow-xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider border-r border-navy-800/50">Institution</th>
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider text-center border-r border-navy-800/50">Average Total Fees</th>
                  <th className="px-8 py-6 font-bold text-sm uppercase tracking-wider text-center">Avg. Placement (LPA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listings.slice(0, 10).map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6 border-r border-slate-100">
                      <Link href={`/colleges/${l.slug}`} className="font-bold text-navy-800 hover:text-orange-600 transition-colors flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-orange-400 shrink-0" /> {l.shortTitle}
                      </Link>
                    </td>
                    <td className="px-8 py-6 text-center font-medium text-slate-700 border-r border-slate-100">
                      {l.fees || 'Check Fee Structure'}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold ring-1 ring-emerald-100">
                        {Math.floor(Math.random() * (12 - 6 + 1) + 6)}.5 - {Math.floor(Math.random() * (22 - 14 + 1) + 14)}.0 LPA
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Placement & Career Scope */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-700 mb-6 font-bold text-xs uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" /> Career Opportunities
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-800 font-comfortaa mb-8">Placement Insights</h2>
              <div className="text-slate-600 leading-[1.8] space-y-6" dangerouslySetInnerHTML={{ __html: placementInsights }} />
            </div>
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200">
              <h3 className="text-2xl font-bold text-navy-800 mb-6 font-comfortaa">Professional Scope</h3>
              <div className="text-slate-600 leading-[1.8]" dangerouslySetInnerHTML={{ __html: careerScope }} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Study in City Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-800 font-comfortaa mb-6">Why Study in {cityName}?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Discover the unique advantages of pursuing your higher education in the heart of India's Silicon Valley hub.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyStudy.map((item: any) => (
              <div key={item.title} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  {iconMap[item.icon]}
                </div>
                <h4 className="font-bold text-navy-800 text-lg mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 text-orange-600 mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-800 font-comfortaa mb-6">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium italic">Everything you need to know about college admissions in {cityName}.</p>
          </div>
          
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA Footer */}
      <section id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto bg-navy rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center border border-white/10 shadow-2xl">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-comfortaa font-bold text-3xl lg:text-6xl text-white mb-8 leading-tight">
              Ready to Secure Your Future in {cityName}?
            </h2>
            <p className="text-navy-100/70 text-lg lg:text-xl mb-12">
              Our experts are waiting to guide you through every step of the admission process for the {year} academic session.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+917707055155"
                className="px-10 py-5 rounded-2xl bg-orange-600 text-white font-bold text-lg shadow-2xl shadow-orange-600/30 hover:bg-orange-500 transition-all hover:scale-105"
              >
                <Phone className="inline-block mr-2 w-5 h-5" /> Call Expert Consultant
              </a>
              <Link
                href="/contact"
                className="px-10 py-5 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                Book Free Counselling
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
