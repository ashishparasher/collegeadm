import type { Metadata } from 'next';
import Link from 'next/link';
import { getForComparison, getAllColleges } from '@/services/college.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';
import { Scale, ArrowRight, MapPin, BookOpen, GraduationCap, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Colleges – Side by Side Comparison',
  description: 'Compare top colleges in Karnataka side by side. Fees, courses, exams, rankings and more.',
  alternates: { canonical: `${SITE.url}/compare` },
};

export default async function ComparePage({ searchParams }: { searchParams: { colleges?: string } }) {
  const slugs = searchParams.colleges?.split(',').filter(Boolean).slice(0, 3) || [];
  const compared = slugs.length >= 2 ? await getForComparison(slugs) : [];
  const allColleges = await getAllColleges();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold mb-5">
            <Scale className="w-3 h-3" /> Compare Tool
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">Compare Colleges</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">Select colleges to compare fees, courses, rankings, and admission criteria side-by-side.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Comparison Table */}
        {compared.length >= 2 ? (
          <div className="bg-card rounded-3xl border border-border overflow-hidden surface-raised mb-12">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-40 bg-muted/30">Criteria</th>
                  {compared.map((c: any) => (
                    <th key={c.id} className="px-6 py-5 text-center">
                      <Link href={`/college/${c.slug}`} className="font-comfortaa font-bold text-foreground hover:text-accent transition-colors text-sm">{c.shortTitle}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/20"><td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Location</td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-sm text-center text-foreground">{c.location}</td>)}</tr>
                <tr className="hover:bg-muted/20"><td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Ranking</td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-sm text-center text-foreground">{c.ranking || '-'}</td>)}</tr>
                <tr className="hover:bg-muted/20"><td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">₹ Fees</td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-sm text-center text-foreground font-semibold">{c.fees || 'Contact Us'}</td>)}</tr>
                <tr className="hover:bg-muted/20"><td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5" /> Courses</td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-center"><div className="flex flex-wrap gap-1 justify-center">{c.courses?.map((co: any) => <Badge key={co.id} variant="secondary" className="text-[9px]">{co.name}</Badge>) || '-'}</div></td>)}</tr>
                <tr className="hover:bg-muted/20"><td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Exams</td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-center"><div className="flex flex-wrap gap-1 justify-center">{c.exams?.map((e: any) => <Badge key={e.id} variant="outline" className="text-[9px]">{e.name}</Badge>) || '-'}</div></td>)}</tr>
                <tr className="hover:bg-muted/20"><td className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Category</td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-sm text-center text-foreground">{c.category?.name || '-'}</td>)}</tr>
                <tr><td className="px-6 py-4"></td>{compared.map((c: any) => <td key={c.id} className="px-6 py-4 text-center"><Button asChild variant="accent" size="sm" className="rounded-full"><Link href={`/college/${c.slug}`}>View Details</Link></Button></td>)}</tr>
              </tbody>
            </table>
          </div>
        ) : slugs.length > 0 && slugs.length < 2 ? (
          <div className="bg-card rounded-3xl border border-border p-10 text-center mb-12">
            <p className="text-muted-foreground">Please select at least 2 colleges to compare.</p>
          </div>
        ) : null}

        {/* Popular Comparisons */}
        <h2 className="font-comfortaa font-bold text-xl text-foreground mb-6">Popular Comparisons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allColleges.slice(0, 9).flatMap((c1: any, i) =>
            allColleges.slice(i + 1, i + 2).map((c2: any) => (
              <Link key={`${c1.id}-${c2.id}`} href={`/compare?colleges=${c1.slug},${c2.slug}`} className="group">
                <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-card-hover transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-[10px] flex-1 justify-center py-2 font-bold truncate">{c1.shortTitle}</Badge>
                    <span className="text-xs font-bold text-accent">vs</span>
                    <Badge variant="outline" className="text-[10px] flex-1 justify-center py-2 font-bold truncate">{c2.shortTitle}</Badge>
                  </div>
                  <div className="text-center text-[11px] font-bold text-accent uppercase tracking-widest group-hover:underline">Compare Now <ArrowRight className="w-3 h-3 inline ml-1" /></div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-12 bg-card rounded-3xl border border-border p-10 text-center">
          <h2 className="font-comfortaa font-bold text-xl text-foreground mb-3">Need help choosing?</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">Our experts recommend the best college for your profile, budget, and goals.</p>
          <Button asChild variant="accent" className="rounded-full"><Link href="/contact">Get Expert Recommendation</Link></Button>
        </div>
      </div>
    </div>
  );
}
