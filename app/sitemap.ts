export const dynamic = "force-dynamic"

// app/sitemap.ts
import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://collegeadm.org';

  const [colleges, posts, courses, exams] = await Promise.all([
    prisma.college.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.post.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.course.findMany({ select: { slug: true } }),
    prisma.exam.findMany({ select: { slug: true } }),
  ]);

  const collegeUrls = colleges.map((c) => ({
    url: `${baseUrl}/colleges/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  const postUrls = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  const courseUrls = courses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date(),
  }));

  const examUrls = exams.map((e) => ({
    url: `${baseUrl}/exams/${e.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    '',
    '/colleges',
    '/blog',
    '/compare',
    '/contact',
    '/faq',
    '/scholarships',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...collegeUrls, ...postUrls, ...courseUrls, ...examUrls];
}
