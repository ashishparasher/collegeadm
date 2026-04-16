import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllScholarships } from '@/services/scholarship.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { Award, IndianRupee, UserCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Scholarships – Financial Aid for Students in Karnataka',
  description: 'Explore scholarships and fee concessions available for students seeking admission in Karnataka colleges.',
  alternates: { canonical: `${SITE.url}/scholarships` },
};

export default async function ScholarshipsPage() {
  const scholarships = await getAllScholarships();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold mb-5">
            <Award className="w-3 h-3" /> Financial Aid
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">Scholarships</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">Scholarships and fee concessions for students in Karnataka.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-5">
        {scholarships.map((s: any) => (
          <div key={s.id} className="bg-card rounded-3xl border border-border p-7 hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="font-comfortaa font-bold text-lg text-foreground mb-2">{s.name}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="flex flex-wrap gap-3">
                  {s.amount && (
                    <Badge variant="secondary" className="gap-1.5 py-1.5">
                      <IndianRupee className="w-3 h-3 text-emerald-600" /> {s.amount}
                    </Badge>
                  )}
                  {s.eligibility && (
                    <Badge variant="secondary" className="gap-1.5 py-1.5">
                      <UserCheck className="w-3 h-3 text-blue-600" /> {s.eligibility}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-card rounded-3xl border border-border p-10 text-center mt-8">
          <h2 className="font-comfortaa font-bold text-xl text-foreground mb-3">Need Scholarship Guidance?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">Our team can help identify scholarships you qualify for and assist with applications.</p>
          <Button asChild variant="accent" className="rounded-full group">
            <Link href="/contact">Talk to an Expert <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
