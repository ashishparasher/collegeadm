// app/(directory)/compare/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ChevronRight, MapPin, Star, Building2, TrendingUp, BookOpen, IndianRupee, Sparkles } from 'lucide-react';
import { LeadForm } from '@/components/ui/LeadForm';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  // For programmatic SEO, we can pre-generate top combinations
  // But for now we might leave it dynamic or generate a few.
  // Real programmatic SEO would use a predefined list of top comparisons.
  return [
    { slug: 'rvce-vs-bmsce' },
    { slug: 'msrit-vs-bmsce' }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [slug1, slug2] = params.slug.split('-vs-');
  if (!slug1 || !slug2) return { title: 'Comparison' };

  const c1 = await prisma.college.findUnique({ where: { slug: slug1 } });
  const c2 = await prisma.college.findUnique({ where: { slug: slug2 } });

  if (!c1 || !c2) return { title: 'Comparison' };

  return {
    title: `${c1.name} vs ${c2.name} Comparison - Fees, Placement & Ranking`,
    description: `Compare ${c1.name} and ${c2.name}. Detailed analysis of fees, cutoffs, placements, and infrastructure to help you choose the right college.`,
  };
}

export default async function ComparePage({ params }: Props) {
  const [slug1, slug2] = params.slug.split('-vs-');
  if (!slug1 || !slug2) notFound();

  const [c1, c2] = await Promise.all([
    prisma.college.findUnique({ where: { slug: slug1 } }),
    prisma.college.findUnique({ where: { slug: slug2 } })
  ]);

  if (!c1 || !c2) notFound();

  const comparisonData = [
    { label: 'Location', v1: c1.location, v2: c2.location, icon: MapPin },
    { label: 'Fees Structure', v1: c1.fees || 'Contact for Fees', v2: c2.fees || 'Contact for Fees', icon: IndianRupee },
    { label: 'Ranking', v1: c1.ranking || 'N/A', v2: c2.ranking || 'N/A', icon: Star },
    { label: 'Cutoff', v1: c1.cutoff || 'N/A', v2: c2.cutoff || 'N/A', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-center items-center gap-1.5 text-xs text-navy-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{c1.name} vs {c2.name}</span>
          </nav>
          
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-6">
            {c1.name} <span className="text-orange-400">vs</span> {c2.name}
          </h1>
          <p className="text-navy-200 text-lg max-w-3xl mx-auto">
            A comprehensive comparison to help you make an informed decision for your admission.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Comparison Table */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-navy-900/5 border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-3 border-b border-gray-100">
                <div className="p-6 bg-gray-50/50"></div>
                <div className="p-6 text-center border-l border-gray-100 bg-navy-50/30">
                  <p className="font-bold text-navy-800 text-sm">{c1.name}</p>
                </div>
                <div className="p-6 text-center border-l border-gray-100 bg-orange-50/30">
                  <p className="font-bold text-navy-800 text-sm">{c2.name}</p>
                </div>
              </div>
              
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/30 transition-colors">
                  <div className="p-6 flex items-center gap-3">
                    <row.icon className="w-5 h-5 text-gray-400" />
                    <span className="font-bold text-gray-500 text-xs uppercase tracking-wider">{row.label}</span>
                  </div>
                  <div className="p-6 text-center border-l border-gray-100 text-sm font-medium text-gray-700">
                    {row.v1}
                  </div>
                  <div className="p-6 text-center border-l border-gray-100 text-sm font-medium text-gray-700">
                    {row.v2}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Description Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-comfortaa font-bold text-xl text-navy-800 mb-4">{c1.name} Overview</h3>
                <div className="text-gray-600 text-sm leading-relaxed line-clamp-[10]" dangerouslySetInnerHTML={{ __html: c1.description }} />
                <Link href={`/colleges/${c1.slug}`} className="mt-6 inline-block text-orange-600 font-bold text-sm">View Full Details →</Link>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-comfortaa font-bold text-xl text-navy-800 mb-4">{c2.name} Overview</h3>
                <div className="text-gray-600 text-sm leading-relaxed line-clamp-[10]" dangerouslySetInnerHTML={{ __html: c2.description }} />
                <Link href={`/colleges/${c2.slug}`} className="mt-6 inline-block text-orange-600 font-bold text-sm">View Full Details →</Link>
              </div>
            </div>
          </div>

          {/* Sidebar Lead Form */}
          <aside className="space-y-8">
            <div className="sticky top-24 bg-white rounded-[2.5rem] border border-navy-100 shadow-2xl p-8 border-t-8 border-t-orange-500">
              <div className="text-center mb-8">
                <Sparkles className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-comfortaa font-bold text-xl text-navy-800">Expert Counselling</h3>
                <p className="text-gray-500 text-sm mt-2">Get free guidance for both colleges from our admission experts.</p>
              </div>
              <LeadForm collegeName={`${c1.name} vs ${c2.name}`} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
