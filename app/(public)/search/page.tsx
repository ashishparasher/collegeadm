import type { Metadata } from 'next';
import Link from 'next/link';
import { searchAll } from '@/services/college.service';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';
import { Search, Building2, BookOpen, FileText, Newspaper, ArrowUpRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search – Find Colleges, Courses & Exams',
  description: 'Search across all colleges, courses, exams, and articles on CollegeAdm.',
};

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim() || '';
  const results = query ? await searchAll(query) : null;
  const total = results ? results.colleges.length + results.posts.length + results.courses.length + results.exams.length : 0;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-3xl mx-auto relative">
          <h1 className="font-comfortaa font-bold text-3xl lg:text-4xl text-foreground mb-6 text-center">Search</h1>
          <form action="/search" method="get">
            <div className="flex items-center bg-card rounded-2xl border border-border p-1.5 shadow-card focus-within:ring-2 focus-within:ring-accent/30">
              <div className="flex items-center flex-1 px-4"><Search className="w-5 h-5 text-muted-foreground mr-3" /><input type="text" name="q" defaultValue={query} placeholder="Search colleges, courses, exams, articles..." className="w-full py-3 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground" autoFocus /></div>
              <button type="submit" className="px-6 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent/90 transition-colors">Search</button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {query && results && (
          <>
            <p className="text-muted-foreground text-sm mb-8">{total} results for <span className="font-bold text-foreground">"{query}"</span></p>

            {results.colleges.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4"><Building2 className="w-4 h-4 text-accent" /><h2 className="font-comfortaa font-bold text-lg text-foreground">Colleges ({results.colleges.length})</h2></div>
                <div className="space-y-2">
                  {results.colleges.map((c: any) => (
                    <Link key={c.slug} href={`/college/${c.slug}`} className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border hover:shadow-card hover:-translate-y-0.5 transition-all group">
                      <div><p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{c.name.split('|')[0].trim()}</p><p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {c.location}</p></div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.courses.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4"><BookOpen className="w-4 h-4 text-accent" /><h2 className="font-comfortaa font-bold text-lg text-foreground">Courses ({results.courses.length})</h2></div>
                <div className="space-y-2">
                  {results.courses.map((c: any) => (
                    <Link key={c.slug} href={`/courses/${c.slug}`} className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border hover:shadow-card transition-all group">
                      <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{c.name}</p>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.exams.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4"><FileText className="w-4 h-4 text-accent" /><h2 className="font-comfortaa font-bold text-lg text-foreground">Exams ({results.exams.length})</h2></div>
                <div className="space-y-2">
                  {results.exams.map((e: any) => (
                    <Link key={e.slug} href={`/exams/${e.slug}`} className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border hover:shadow-card transition-all group">
                      <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{e.name}</p>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.posts.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4"><Newspaper className="w-4 h-4 text-accent" /><h2 className="font-comfortaa font-bold text-lg text-foreground">Articles ({results.posts.length})</h2></div>
                <div className="space-y-2">
                  {results.posts.map((p: any) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border hover:shadow-card transition-all group">
                      <p className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{p.title}</p>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {total === 0 && (
              <div className="bg-card rounded-3xl border border-border p-12 text-center">
                <p className="text-lg font-bold text-foreground mb-2">No results found</p>
                <p className="text-muted-foreground text-sm">Try a different search term or browse categories.</p>
              </div>
            )}
          </>
        )}

        {!query && (
          <div className="bg-card rounded-3xl border border-border p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg font-bold text-foreground mb-2">Search anything</p>
            <p className="text-muted-foreground text-sm">Find colleges, courses, exams, and articles across our platform.</p>
          </div>
        )}
      </div>
    </div>
  );
}
