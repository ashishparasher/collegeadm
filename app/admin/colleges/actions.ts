// app/admin/colleges/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CollegeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  fees: z.string().optional(),
  cutoff: z.string().optional(),
  ranking: z.string().optional(),
  featuredImage: z.string().optional(),
});

export async function createCollege(data: z.infer<typeof CollegeSchema>) {
  const college = await prisma.college.create({
    data,
  });
  revalidatePath('/admin/colleges');
  revalidatePath('/colleges');
  return college;
}

export async function updateCollege(id: string, data: z.infer<typeof CollegeSchema>) {
  const college = await prisma.college.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/colleges');
  revalidatePath(`/colleges/${college.slug}`);
  revalidatePath('/colleges');
  return college;
}

export async function deleteCollege(id: string) {
  await prisma.college.delete({
    where: { id },
  });
  revalidatePath('/admin/colleges');
  revalidatePath('/colleges');
}
