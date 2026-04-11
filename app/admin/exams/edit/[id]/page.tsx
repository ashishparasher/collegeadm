// app/admin/exams/edit/[id]/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ExamForm } from '@/components/admin/ExamForm';

export default async function EditExamPage({ params }: { params: { id: string } }) {
  const exam = await prisma.exam.findUnique({ where: { id: params.id } });
  if (!exam) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Edit Exam</h1>
        <p className="text-gray-500 mt-1">Update details for {exam.name}</p>
      </div>
      <ExamForm initialData={exam} id={exam.id} />
    </div>
  );
}
