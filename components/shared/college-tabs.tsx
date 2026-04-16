'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowUpRight, BookOpen, FileCheck, BarChart3, Image as ImageIcon, GraduationCap } from 'lucide-react';
import { TabsNav, TabPanel } from '@/components/ui/tabs';
import { ContentRenderer } from '@/components/shared/content-renderer';
import { Badge } from '@/components/ui/badge';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'courses', label: 'Courses & Fees', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: 'admission', label: 'Admission', icon: <FileCheck className="w-3.5 h-3.5" /> },
  { id: 'placements', label: 'Placements', icon: <BarChart3 className="w-3.5 h-3.5" /> },
];

interface Props {
  college: any;
  headings: { id: string; text: string; level: number }[];
}

export function CollegeTabs({ college, headings }: Props) {
  const [tab, setTab] = useState('overview');

  return (
    <>
      <TabsNav tabs={TABS} activeTab={tab} onChange={setTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TabPanel id="overview" active={tab}>
          <div className="space-y-6">
            {headings.length > 3 && (
              <div className="bg-card rounded-2xl border border-border p-5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">On this page</p>
                <div className="space-y-1">
                  {headings.map(h => (
                    <a key={h.id} href={`#${h.id}`} className={`block text-sm text-muted-foreground hover:text-accent transition-colors py-1 ${h.level === 3 ? 'pl-4' : ''}`}>{h.text}</a>
                  ))}
                </div>
              </div>
            )}
            <article className="bg-card rounded-3xl border border-border p-7 lg:p-10 surface-raised">
              <ContentRenderer html={college.content} />
            </article>
          </div>
        </TabPanel>

        <TabPanel id="courses" active={tab}>
          <div className="bg-card rounded-3xl border border-border overflow-hidden surface-raised">
            <div className="p-7 border-b border-border">
              <h2 className="font-comfortaa font-bold text-xl text-foreground">Courses & Fee Structure</h2>
              <p className="text-muted-foreground text-sm mt-1">{college.courses?.length || 0} courses offered at this institution</p>
            </div>
            {college.courses && college.courses.length > 0 ? (
              <table className="w-full text-left">
                <thead><tr className="bg-muted/50 border-b border-border">
                  <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Fees</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Details</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  {college.courses.map((c: any) => {
                    const meta = require('@/services/course.service').COURSE_DATA[c.slug];
                    return (
                      <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-foreground text-sm">{c.name}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{meta?.duration || '-'}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{college.fees || 'Contact Us'}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/courses/${c.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline">
                            View <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-10 text-center text-muted-foreground">Course details will be updated soon.</div>
            )}
          </div>
        </TabPanel>

        <TabPanel id="admission" active={tab}>
          <div className="bg-card rounded-3xl border border-border p-7 lg:p-10 surface-raised space-y-8">
            <div>
              <h2 className="font-comfortaa font-bold text-xl text-foreground mb-4">Admission Process</h2>
              <div className="space-y-4">
                {['Check eligibility and required entrance exams', 'Prepare required documents (marksheets, ID proof, NEET/KCET scorecard)', 'Submit application form online or via our counselling team', 'Confirm seat through management quota or counselling round', 'Pay fees and complete admission formalities'].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs shrink-0">{i + 1}</div>
                    <p className="text-foreground text-sm pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            {college.exams && college.exams.length > 0 && (
              <div>
                <h3 className="font-comfortaa font-bold text-lg text-foreground mb-3">Accepted Entrance Exams</h3>
                <div className="flex flex-wrap gap-2">
                  {college.exams.map((e: any) => (
                    <Link key={e.id} href={`/exams/${e.slug}`}>
                      <Badge variant="outline" className="hover:bg-accent/5 hover:border-accent/30 transition-all cursor-pointer py-1.5 px-3 font-bold">{e.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {college.cutoff && (
              <div>
                <h3 className="font-comfortaa font-bold text-lg text-foreground mb-2">Cutoff</h3>
                <p className="text-muted-foreground text-sm">{college.cutoff}</p>
              </div>
            )}
          </div>
        </TabPanel>

        <TabPanel id="placements" active={tab}>
          <div className="bg-card rounded-3xl border border-border p-7 lg:p-10 surface-raised">
            <h2 className="font-comfortaa font-bold text-xl text-foreground mb-6">Placement Information</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-muted/50 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold font-comfortaa text-foreground">85%+</p>
                <p className="text-xs text-muted-foreground font-semibold mt-1 uppercase tracking-wider">Placement Rate</p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold font-comfortaa text-foreground">50+</p>
                <p className="text-xs text-muted-foreground font-semibold mt-1 uppercase tracking-wider">Recruiters</p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-5 text-center">
                <p className="text-2xl font-bold font-comfortaa text-foreground">Top</p>
                <p className="text-xs text-muted-foreground font-semibold mt-1 uppercase tracking-wider">Hospitals & Companies</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Detailed placement statistics are updated annually. Contact our counselling team for the latest placement data and recruiter list for this institution.
            </p>
          </div>
        </TabPanel>
      </div>
    </>
  );
}
