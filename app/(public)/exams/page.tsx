import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllExams, EXAM_DATA } from '@/services/exam.service';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';
import { ArrowUpRight, FileText, Calendar, Monitor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Entrance Exams – Karnataka Admissions 2026',
  description: 'Complete info on NEET, KCET, COMEDK, CAT, GATE and other entrance exams for Karnataka college admissions.',
  alternates: { canonical: `${SITE.url}/exams` },
};

export default async function ExamsPage() {
  const exams = await getAllExams();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold mb-5">
            <FileText className="w-3 h-3" /> Exam Directory
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">Entrance Exams</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {exams.length} key entrance exams for admission to Karnataka colleges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exams.map((exam: any) => {
            const meta = EXAM_DATA[exam.slug];
            const count = exam.colleges?.length ?? 0;
            return (
              <Link href={`/exams/${exam.slug}`} key={exam.id} className="group">
                <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">{meta?.icon || '📝'}</div>
                      <div>
                        <h3 className="font-comfortaa font-bold text-foreground group-hover:text-accent transition-colors">{exam.name}</h3>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{exam.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {meta && (
                            <>
                              <Badge variant="secondary" className="text-[10px] gap-1"><Calendar className="w-3 h-3" /> {meta.date}</Badge>
                              <Badge variant="secondary" className="text-[10px] gap-1"><Monitor className="w-3 h-3" /> {meta.mode.split('(')[0].trim()}</Badge>
                            </>
                          )}
                          <Badge variant="accent" className="text-[10px]">{count} colleges accept</Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
