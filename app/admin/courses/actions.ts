// app/admin/courses/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CourseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
});

export async function createCourse(data: z.infer<typeof CourseSchema>) {
  const course = await prisma.course.create({ data });
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  return course;
}

export async function updateCourse(id: string, data: z.infer<typeof CourseSchema>) {
  const course = await prisma.course.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/courses');
  revalidatePath(`/courses/${course.slug}`);
  return course;
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
}
