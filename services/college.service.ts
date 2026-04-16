import { prisma } from '@/lib/prisma';
import { truncateHtml, decodeHtml } from '@/lib/utils';

function format(c: any) {
  return {
    ...c,
    shortTitle: decodeHtml(c.name.split('|')[0].split('-')[0].trim()),
    city: c.location.split(',')[0].trim(),
    excerpt: truncateHtml(c.description, 140),
  };
}

export async function getFeaturedColleges(take = 6) {
  const raw = await prisma.college.findMany({ take, orderBy: { createdAt: 'desc' } });
  return raw.map(format);
}

export async function getAllColleges() {
  const raw = await prisma.college.findMany({ orderBy: { createdAt: 'desc' } });
  return raw.map(format);
}

export async function getCollegeBySlug(slug: string) {
  const c = await prisma.college.findUnique({ where: { slug } });
  if (!c) return null;
  return { ...format(c), content: c.description };
}

export async function getSimilarColleges(city: string, excludeId: string, take = 3) {
  const raw = await prisma.college.findMany({
    where: { id: { not: excludeId }, location: { contains: city.split(',')[0] } },
    take,
  });
  return raw.map(format);
}

export async function getCollegesByCity(cityVariants: string[], take = 10) {
  const raw = await prisma.college.findMany({
    where: { OR: cityVariants.map(v => ({ location: { contains: v, mode: 'insensitive' as const } })) },
    take,
    orderBy: { createdAt: 'desc' },
  });
  return raw.map(format);
}

export async function getCollegeCount() {
  return prisma.college.count();
}

export async function getCollegeWithRelations(slug: string) {
  const c = await prisma.college.findUnique({
    where: { slug },
    include: { courses: true, exams: true, category: true, gallery: true },
  });
  if (!c) return null;
  return { ...format(c), content: c.description, courses: c.courses, exams: c.exams, category: c.category, gallery: c.gallery };
}

export async function getForComparison(slugs: string[]) {
  const raw = await prisma.college.findMany({
    where: { slug: { in: slugs } },
    include: { courses: true, exams: true, category: true },
  });
  return raw.map(c => ({ ...format(c), courses: c.courses, exams: c.exams, category: c.category }));
}

export async function getAllCollegesFiltered(filters?: { course?: string; city?: string; search?: string }) {
  const where: any = {};
  if (filters?.course) {
    where.courses = { some: { slug: filters.course } };
  }
  if (filters?.city) {
    where.location = { contains: filters.city, mode: 'insensitive' };
  }
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { location: { contains: filters.search, mode: 'insensitive' } },
    ];
  }
  const raw = await prisma.college.findMany({ where, orderBy: { createdAt: 'desc' }, include: { courses: true, category: true } });
  return raw.map(c => ({ ...format(c), courses: c.courses, category: c.category }));
}

export async function searchAll(q: string) {
  const [colleges, posts, courses, exams] = await Promise.all([
    prisma.college.findMany({ where: { name: { contains: q, mode: 'insensitive' } }, take: 8, select: { name: true, slug: true, location: true, featuredImage: true } }),
    prisma.post.findMany({ where: { title: { contains: q, mode: 'insensitive' } }, take: 5, select: { title: true, slug: true, featuredImage: true } }),
    prisma.course.findMany({ where: { name: { contains: q, mode: 'insensitive' } }, take: 5, select: { name: true, slug: true } }),
    prisma.exam.findMany({ where: { name: { contains: q, mode: 'insensitive' } }, take: 5, select: { name: true, slug: true } }),
  ]);
  return { colleges, posts, courses, exams };
}

export async function getCollegesByCategory() {
  const categories = await prisma.category.findMany({ include: { colleges: { select: { id: true, name: true, slug: true, location: true, ranking: true, featuredImage: true } } } });
  return categories.map(cat => ({ ...cat, colleges: cat.colleges.map(format) }));
}
