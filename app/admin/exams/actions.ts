// app/admin/exams/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ExamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
});

export async function createExam(data: z.infer<typeof ExamSchema>) {
  const exam = await prisma.exam.create({ data });
  revalidatePath('/admin/exams');
  revalidatePath('/exams');
  return exam;
}

export async function updateExam(id: string, data: z.infer<typeof ExamSchema>) {
  const exam = await prisma.exam.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/exams');
  revalidatePath(`/exams/${exam.slug}`);
  return exam;
}

export async function deleteExam(id: string) {
  await prisma.exam.delete({ where: { id } });
  revalidatePath('/admin/exams');
  revalidatePath('/exams');
}
