// app/compare/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  ChevronRight, MapPin, Star, Building2, TrendingUp, 
  BookOpen, IndianRupee, Sparkles, CheckCircle2, XCircle,
  LucideIcon, ShieldCheck
} from 'lucide-react';
import { LeadForm } from '@/components/ui/LeadForm';
import { cn } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const colleges = await prisma.college.findMany({ select: { slug: true } });
  const params: { slug: string }[] = [];

  for (let i = 0; i < Math.min(colleges.length, 10); i++) {
    for (let j = i + 1; j < Math.min(colleges.length, 11); j++) {
      params.push({ slug: `${colleges[i].slug}-vs-${colleges[j].slug}` });
    }
  }

  return params;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parts = params.slug.split('-vs-');
  if (parts.length !== 2) return { title: 'College Comparison' };
  const [slug1, slug2] = parts;

  const [c1, c2] = await Promise.all([
    prisma.college.findUnique({ where: { slug: slug1 } }),
    prisma.college.findUnique({ where: { slug: slug2 } })
  ]);

  if (!c1 || !c2) return { title: 'Comparison Not Found' };

  return {
    title: `${c1.name} vs ${c2.name} Comparison 2026 - Fees, Placement & Ranking`,
    description: `Detailed comparison between ${c1.name} and ${c2.name}. Compare fees structure, placement records, cutoffs and campus facilities.`,
  };
}

export default async function ComparePage({ params }: Props) {
  const parts = params.slug.split('-vs-');
  if (parts.length !== 2) notFound();
  const [slug1, slug2] = parts;

  const [c1, c2] = await Promise.all([
    prisma.college.findUnique({ where: { slug: slug1 } }),
    prisma.college.findUnique({ where: { slug: slug2 } })
  ]);

  if (!c1 || !c2) notFound();

  const comparisonData: { label: string; v1: any; v2: any; icon: LucideIcon; isBool?: boolean }[] = [
    { label: 'Location', v1: c1.location, v2: c2.location, icon: MapPin },
    { label: 'Fees Structure', v1: c1.fees || 'Contact for Fees', v2: c2.fees || 'Contact for Fees', icon: IndianRupee },
    { label: 'Ranking', v1: c1.ranking || 'N/A', v2: c2.ranking || 'N/A', icon: Star },
    { label: 'Cutoff', v1: c1.cutoff || 'N/A', v2: c2.cutoff || 'N/A', icon: TrendingUp },
    { label: 'Direct Admission', v1: true, v2: true, icon: CheckCircle2, isBool: true },
    { label: 'Management Quota', v1: true, v2: true, icon: ShieldCheck, isBool: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-center items-center gap-1.5 text-xs text-navy-300 mb-8 font-bold uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{c1.name} vs {c2.name}</span>
          </nav>
          
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-6 leading-tight">
            {c1.name} <span className="text-orange-400">vs</span> {c2.name}
          </h1>
          <p className="text-navy-200 text-lg max-w-3xl mx-auto">
            Direct comparison of fees, placement packages, and infrastructure to help you choose the right institution.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
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
                    {row.isBool ? (
                      <span className="flex justify-center items-center gap-1.5 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Yes
                      </span>
                    ) : row.v1}
                  </div>
                  <div className="p-6 text-center border-l border-gray-100 text-sm font-medium text-gray-700">
                    {row.isBool ? (
                      <span className="flex justify-center items-center gap-1.5 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Yes
                      </span>
                    ) : row.v2}
                  </div>
                </div>
              ))}
            </div>

            {/* Overviews */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="font-comfortaa font-bold text-xl text-navy-800 mb-4">{c1.name}</h3>
                <div className="text-gray-600 text-sm leading-relaxed line-clamp-6 mb-6" dangerouslySetInnerHTML={{ __html: c1.description }} />
                <Link href={`/colleges/${c1.slug}`} className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View Full Profile <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="font-comfortaa font-bold text-xl text-navy-800 mb-4">{c2.name}</h3>
                <div className="text-gray-600 text-sm leading-relaxed line-clamp-6 mb-6" dangerouslySetInnerHTML={{ __html: c2.description }} />
                <Link href={`/colleges/${c2.slug}`} className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  View Full Profile <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="sticky top-24 bg-white rounded-[2.5rem] border border-navy-100 shadow-2xl p-8 border-t-8 border-t-orange-500">
              <div className="text-center mb-8">
                <Sparkles className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-comfortaa font-bold text-xl text-navy-800">Direct Admission</h3>
                <p className="text-gray-500 text-sm mt-2">Get verified seat availability for both institutions from our experts.</p>
              </div>
              <LeadForm collegeName={`${c1.name} vs ${c2.name}`} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
