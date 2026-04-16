import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';

export default async function AdminExamsPage() {
  const exams = await prisma.exam.findMany({ include: { colleges: { select: { id: true } } }, orderBy: { name: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-comfortaa font-bold text-2xl text-foreground">Exams</h1>
          <p className="text-muted-foreground text-sm mt-1">{exams.length} exams</p>
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead><tr className="bg-muted/50 border-b border-border">
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Exam</th>
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Slug</th>
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Colleges</th>
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground">{exam.name}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground font-mono">{exam.slug}</td>
                <td className="px-5 py-3.5"><Badge variant="secondary" className="text-[10px]">{exam.colleges.length} accept</Badge></td>
                <td className="px-5 py-3.5 text-right"><Link href={`/exams/${exam.slug}`} target="_blank" className="text-xs font-bold text-accent hover:underline">View Page</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
