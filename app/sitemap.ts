import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE = 'https://collegeadm.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const colleges = await prisma.college.findMany({ select: { slug: true, updatedAt: true } });
  const posts = await prisma.post.findMany({ select: { slug: true, updatedAt: true } });
  const courses = await prisma.course.findMany({ select: { slug: true } });
  const exams = await prisma.exam.findMany({ select: { slug: true } });

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/colleges`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/courses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/exams`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/rankings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/scholarships`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const collegePages: MetadataRoute.Sitemap = colleges.map((c) => ({
    url: `${BASE}/college/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const coursePages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${BASE}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const examPages: MetadataRoute.Sitemap = exams.map((e) => ({
    url: `${BASE}/exams/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cities = ['bangalore', 'mysore', 'mangalore', 'hubli', 'belgaum'];
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE}/colleges/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...collegePages, ...postPages, ...coursePages, ...examPages, ...cityPages];
}
