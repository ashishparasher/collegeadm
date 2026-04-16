import type { Metadata } from 'next';
import Link from 'next/link';
import { getCollegesByCategory } from '@/services/college.service';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';
import { Trophy, MapPin, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'College Rankings 2026 – Top Colleges in Karnataka',
  description: 'Explore the top-ranked colleges in Karnataka by category — Medical, Engineering, Management, Ayurveda, and more.',
  alternates: { canonical: `${SITE.url}/rankings` },
};

export default async function RankingsPage() {
  const categories = await getCollegesByCategory();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold mb-5">
            <Trophy className="w-3 h-3" /> Rankings 2026
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">College Rankings</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">Top-ranked partner colleges in Karnataka, organized by category.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {categories.map((cat: any) => {
          if (cat.colleges.length === 0) return null;
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-comfortaa font-bold text-xl text-foreground">Top {cat.name} Colleges</h2>
                <Badge variant="secondary" className="text-[10px]">{cat.colleges.length} colleges</Badge>
              </div>
              <div className="bg-card rounded-3xl border border-border overflow-hidden">
                <table className="w-full text-left">
                  <thead><tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-12">#</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">College</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                  </tr></thead>
                  <tbody className="divide-y divide-border">
                    {cat.colleges.map((c: any, i: number) => (
                      <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4"><div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">{i + 1}</div></td>
                        <td className="px-6 py-4 font-semibold text-foreground text-sm"><Link href={`/college/${c.slug}`} className="hover:text-accent transition-colors">{c.shortTitle}</Link></td>
                        <td className="px-6 py-4"><span className="flex items-center gap-1 text-muted-foreground text-sm"><MapPin className="w-3 h-3" /> {c.location}</span></td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{c.ranking || '-'}</td>
                        <td className="px-6 py-4 text-right"><Link href={`/college/${c.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">View <ArrowUpRight className="w-3 h-3" /></Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
