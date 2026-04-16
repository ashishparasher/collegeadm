import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCollegesFiltered } from '@/services/college.service';
import { getAllCourses } from '@/services/course.service';
import { CollegeCard } from '@/components/cards/college-card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'All Colleges – Direct Admission 2026',
  description: 'Browse top partner colleges in Karnataka. Filter by course, city, and more. Direct admission guidance.',
  alternates: { canonical: 'https://collegeadm.org/colleges' },
};

const CITIES = ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Davangere', 'Kolar'];

export default async function CollegesPage({ searchParams }: { searchParams: { course?: string; city?: string; q?: string } }) {
  const [colleges, courses] = await Promise.all([
    getAllCollegesFiltered({ course: searchParams.course, city: searchParams.city, search: searchParams.q }),
    getAllCourses(),
  ]);

  const hasFilters = Boolean(searchParams.course || searchParams.city || searchParams.q);

  function buildUrl(key: string, value: string) {
    const params = new URLSearchParams();
    if (searchParams.course && key !== 'course') params.set('course', searchParams.course);
    if (searchParams.city && key !== 'city') params.set('city', searchParams.city);
    if (searchParams.q && key !== 'q') params.set('q', searchParams.q);
    params.set(key, value);
    return `/colleges?${params.toString()}`;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-5">
            <GraduationCap className="w-3 h-3" /> College Directory
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">Partner Colleges</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            <span className="font-bold text-foreground">{colleges.length}</span> colleges found
            {searchParams.course && <> for <span className="font-bold text-foreground">{courses.find(c => c.slug === searchParams.course)?.name || searchParams.course}</span></>}
            {searchParams.city && <> in <span className="font-bold text-foreground">{searchParams.city}</span></>}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Filter Sidebar */}
          <aside className="sticky top-20 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2"><Filter className="w-4 h-4 text-accent" /> Filters</h3>
                {hasFilters && <Link href="/colleges" className="text-xs text-accent font-semibold hover:underline flex items-center gap-1"><X className="w-3 h-3" /> Clear</Link>}
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Course</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {courses.map((c: any) => (
                    <Link
                      key={c.slug}
                      href={buildUrl('course', c.slug)}
                      className={`block px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${searchParams.course === c.slug ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    >
                      {c.name} <span className="text-muted-foreground/60">({c.colleges?.length || 0})</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">City</p>
                <div className="space-y-1">
                  {CITIES.map(city => (
                    <Link
                      key={city}
                      href={buildUrl('city', city)}
                      className={`block px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${searchParams.city === city ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchParams.course && <Badge variant="accent" className="gap-1 py-1.5">Course: {courses.find(c => c.slug === searchParams.course)?.name} <Link href={`/colleges${searchParams.city ? `?city=${searchParams.city}` : ''}`}><X className="w-3 h-3 hover:text-white/70" /></Link></Badge>}
                {searchParams.city && <Badge variant="accent" className="gap-1 py-1.5">City: {searchParams.city} <Link href={`/colleges${searchParams.course ? `?course=${searchParams.course}` : ''}`}><X className="w-3 h-3 hover:text-white/70" /></Link></Badge>}
              </div>
            )}
            {colleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {colleges.map((c: any, i) => <CollegeCard key={c.id} college={c} index={i} />)}
              </div>
            ) : (
              <div className="bg-card rounded-3xl border border-border p-12 text-center">
                <p className="text-lg font-bold text-foreground mb-2">No colleges found</p>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters.</p>
                <Button asChild variant="accent" className="rounded-full"><Link href="/colleges">Clear Filters</Link></Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
