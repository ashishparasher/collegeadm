// components/seo/ProgrammaticPage.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, ChevronRight, Building2, CheckCircle2, Phone, 
  MessageSquare, Sparkles, TrendingUp, GraduationCap, Award, Info, HelpCircle 
} from 'lucide-react';
import { ListingCard } from '@/components/directory/ListingCard';
import { LeadForm } from '@/components/ui/LeadForm';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

interface ProgrammaticPageProps {
  city: string;
  course: string;
  modifier: string;
  cityName: string;
  courseName: string;
  modifierTitle: string;
  listings: any[];
  isFallback?: boolean;
}

export function ProgrammaticPage({
  city,
  course,
  modifier,
  cityName,
  courseName,
  modifierTitle,
  listings,
  isFallback = false
}: ProgrammaticPageProps) {
  const year = new Date().getFullYear();
  const title = `${modifierTitle} ${courseName} Colleges in ${cityName} 2026`;
  const featuredImage = listings[0]?.featuredImage || '/images/blog-placeholder.jpg';

  const admissionSteps = [
    { step: '1', process: 'Entrance Exam (NEET/CAT/CET)' },
    { step: '2', process: 'Online Application & Choice Filling' },
    { step: '3', process: 'Counselling & Document Verification' },
    { step: '4', process: 'Seat Allotment & Selection' },
    { step: '5', process: 'Fee Payment & Final Admission' },
  ];

  const eligibilityData = [
    { label: 'Minimum Qualification', value: course.includes('mba') || course.includes('pg') ? 'Graduation' : '10+2 (PUC)' },
    { label: 'Minimum Marks', value: '50% Aggregate' },
    { label: 'Entrance Exams', value: course.toUpperCase() },
    { label: 'Age Criteria', value: 'As per norms' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#001529] opacity-90" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="flex items-center gap-1 text-xs text-navy-200 mb-6 font-bold tracking-widest uppercase">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-orange-400">{cityName}</span>
              </nav>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-white text-[11px] font-bold uppercase tracking-widest">Admission Guide 2026-27</span>
              </div>
              
              <h1 className="font-comfortaa font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                {title}
              </h1>
              <p className="text-navy-100/80 text-lg mb-10 max-w-xl font-medium leading-relaxed">
                Complete guide to {courseName} admissions in {cityName}. Find the best {modifier} institutions with updated fees, rankings, and direct admission availability.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#listings" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-500 transition-all hover:scale-105">
                  View Colleges
                </a>
                <a href="#contact" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
                  Consult Expert
                </a>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 relative z-10 border-8 border-white/10">
                <Image src={featuredImage} alt={title} fill priority className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 p-8 rounded-[2rem] bg-orange-600 text-white shadow-2xl z-20 -rotate-3">
                <p className="text-4xl font-bold font-comfortaa mb-1">99%</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info & Listings */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Introduction */}
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-bold text-navy-800 mb-6 font-comfortaa">Introduction</h2>
                <p className="text-slate-600 leading-relaxed">
                  Looking for the <strong>{modifier} {courseName} colleges in {cityName}</strong>? {cityName} has emerged as one of India's leading hubs for higher education, specifically in the {courseName} sector. With a robust industry presence and a legacy of academic excellence, institutions in this region provide students with unmatched exposure and career opportunities.
                </p>
                <p className="text-slate-600 mt-4 leading-relaxed">
                  This comprehensive guide covers everything you need to know about securing your seat in a top-tier institution, including the 2026 admission cycle, expected fee structures, and placement statistics.
                </p>
              </div>

              {/* Admission Table */}
              <div>
                <h2 className="text-3xl font-bold text-navy-800 mb-8 font-comfortaa flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-orange-500" /> Admission Process
                </h2>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 font-bold text-navy-800 text-sm border-b">Step</th>
                        <th className="px-6 py-4 font-bold text-navy-800 text-sm border-b">Process</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {admissionSteps.map((row) => (
                        <tr key={row.step} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-bold text-orange-600 text-sm">{row.step}</td>
                          <td className="px-6 py-4 text-slate-600 text-sm">{row.process}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Listings Grid */}
              <div id="listings">
                <h2 className="text-3xl font-bold text-navy-800 mb-8 font-comfortaa">
                  {isFallback ? `Top Colleges in Karnataka` : `Recommended Colleges in ${cityName}`}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {listings.map((l, i) => (
                    <ListingCard key={l.id} listing={l} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-navy-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden border border-white/10">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare className="w-20 h-20" />
                  </div>
                  <h3 className="font-comfortaa font-bold text-2xl mb-6 relative z-10 text-orange-400">Direct Admission Query</h3>
                  <LeadForm collegeName={`${courseName} in ${cityName}`} />
                </div>
                
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6">
                  <h4 className="font-bold text-navy-800 border-b pb-4">Eligibility Criteria</h4>
                  <div className="space-y-4">
                    {eligibilityData.map((item) => (
                      <div key={item.label} className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="font-bold text-navy-700">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links & Footer CTA */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-12 font-comfortaa">Explore More Options</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/colleges" className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-navy-900 hover:text-white transition-all">All Colleges</Link>
            <Link href="/blog" className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-navy-900 hover:text-white transition-all">Admission Blog</Link>
            <Link href="/compare" className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-navy-900 hover:text-white transition-all">Compare Tool</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
