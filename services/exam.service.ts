import { prisma } from '@/lib/prisma';

export const EXAM_DATA: Record<string, { date: string; mode: string; frequency: string; level: string; icon: string }> = {
  'neet-ug': { date: 'May 2026', mode: 'Offline (Pen & Paper)', frequency: 'Once a year', level: 'National', icon: '🩺' },
  kcet: { date: 'April 2026', mode: 'Offline', frequency: 'Once a year', level: 'State (Karnataka)', icon: '📝' },
  comedk: { date: 'May 2026', mode: 'Online (CBT)', frequency: 'Once a year', level: 'State (Karnataka)', icon: '💻' },
  cat: { date: 'November 2026', mode: 'Online (CBT)', frequency: 'Once a year', level: 'National', icon: '📊' },
  mat: { date: 'Feb, May, Sep, Dec', mode: 'Online + Offline', frequency: 'Four times a year', level: 'National', icon: '📈' },
  gate: { date: 'February 2027', mode: 'Online (CBT)', frequency: 'Once a year', level: 'National', icon: '⚙️' },
  'karnataka-pgcet': { date: 'July 2026', mode: 'Offline', frequency: 'Once a year', level: 'State (Karnataka)', icon: '🎓' },
  rguhs: { date: 'As per University Schedule', mode: 'Offline', frequency: 'Semester-wise', level: 'University', icon: '🏥' },
};

export async function getAllExams() {
  return prisma.exam.findMany({ include: { colleges: { select: { id: true } } }, orderBy: { name: 'asc' } });
}

export async function getExamBySlug(slug: string) {
  return prisma.exam.findUnique({ where: { slug }, include: { colleges: { include: { category: true } } } });
}

export async function getExamCount() {
  return prisma.exam.count();
}
