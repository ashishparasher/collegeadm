// app/(directory)/scholarships/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Award, ChevronRight, IndianRupee, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'College Scholarships 2026 - Merit & Need-Based Funding | CollegeAdm',
  description: 'Find the latest scholarship opportunities for MBBS, BAMS, BPT and Engineering students. Apply for merit-based financial aid and secure your education.',
};

export default async function ScholarshipsPage() {
  const scholarships = await prisma.scholarship.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Financial Aid</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Education Scholarships 2026
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Explore various funding options to support your higher education. We list merit-based, category-based, and institutional scholarships.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {scholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scholarships.map((s) => (
              <div key={s.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-orange-600" />
                  </div>
                  {s.amount && (
                    <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      Upto {s.amount}
                    </span>
                  )}
                </div>
                
                <h3 className="font-comfortaa font-bold text-xl text-navy-800 mb-3">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.description}</p>
                
                {s.eligibility && (
                  <div className="mb-8 p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Eligibility</p>
                    <p className="text-xs text-gray-600 font-medium">{s.eligibility}</p>
                  </div>
                )}
                
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-navy font-bold text-sm hover:text-orange-600 transition-colors"
                >
                  Check Application Process <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
            <Award className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Updating Scholarship List</h3>
            <p className="text-gray-500">We are curating the latest scholarships for the upcoming academic session. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
