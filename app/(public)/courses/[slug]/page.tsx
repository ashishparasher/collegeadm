import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, MapPin, ArrowUpRight, Clock, Shield, Briefcase } from 'lucide-react';
import { getCourseBySlug, getAllCourses, COURSE_DATA } from '@/services/course.service';
import { LeadForm } from '@/components/forms/lead-form';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.name} Admission 2026 – Top Colleges in Karnataka`,
    description: `Direct admission for ${course.name} in Karnataka. Explore ${course.colleges.length} colleges, fees, eligibility & placement info.`,
    alternates: { canonical: `${SITE.url}/courses/${course.slug}` },
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();
  const meta = COURSE_DATA[course.slug];

  const schema = {
    '@context': 'https://schema.org', '@type': 'Course', name: course.name,
    provider: { '@type': 'Organization', name: SITE.name },
    description: `${course.name} admission in Karnataka`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-background pt-20">
        <div className="gradient-hero py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-6 font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">{course.name}</span>
            </nav>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">{meta?.icon || '📚'}</div>
              <div>
                <h1 className="font-comfortaa font-bold text-3xl lg:text-4xl text-white">{course.name} Admission 2026</h1>
                <p className="text-white/50 mt-1">Direct admission guidance in Karnataka</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {meta && (
                <>
                  <Badge className="bg-white/15 text-white border-white/20 gap-1.5 py-1.5"><Clock className="w-3 h-3" /> {meta.duration}</Badge>
                  <Badge className="bg-white/15 text-white border-white/20 gap-1.5 py-1.5"><Shield className="w-3 h-3" /> {meta.eligibility}</Badge>
                  <Badge className="bg-white/15 text-white border-white/20 gap-1.5 py-1.5"><Briefcase className="w-3 h-3" /> {meta.career.split(',')[0]}</Badge>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            <div className="space-y-8">
              {meta && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                    <p className="font-bold text-foreground">{meta.duration}</p>
                  </div>
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Eligibility</p>
                    <p className="font-bold text-foreground text-sm">{meta.eligibility}</p>
                  </div>
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Career Options</p>
                    <p className="font-bold text-foreground text-sm">{meta.career}</p>
                  </div>
                </div>
              )}

              <div>
                <h2 className="font-comfortaa font-bold text-xl text-foreground mb-5">
                  Colleges Offering {course.name} in Karnataka ({course.colleges.length})
                </h2>
                <div className="bg-card rounded-3xl border border-border overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">College</th>
                        <th className="px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</th>
                        <th className="px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Fees</th>
                        <th className="px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {course.colleges.map((c: any) => (
                        <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-5 py-4">
                            <Link href={`/college/${c.slug}`} className="font-semibold text-foreground text-sm hover:text-accent transition-colors">
                              {c.name.split('|')[0].trim()}
                            </Link>
                          </td>
                          <td className="px-5 py-4"><span className="flex items-center gap-1 text-muted-foreground text-sm"><MapPin className="w-3 h-3" /> {c.location}</span></td>
                          <td className="px-5 py-4 text-sm text-muted-foreground">{c.fees || 'Contact Us'}</td>
                          <td className="px-5 py-4 text-right">
                            <Link href={`/college/${c.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
                              View <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <aside className="sticky top-20">
              <div className="gradient-hero rounded-3xl p-6 relative overflow-hidden surface-elevated">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <h3 className="font-comfortaa font-bold text-white text-lg mb-1 text-center">Get {course.name} Admission Help</h3>
                  <p className="text-white/40 text-xs text-center mb-5">Free counselling for {course.name}</p>
                  <LeadForm collegeName={`${course.name} Admission`} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
