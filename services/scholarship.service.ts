import { prisma } from '@/lib/prisma';

export async function getAllScholarships() {
  return prisma.scholarship.findMany({ orderBy: { name: 'asc' } });
}
