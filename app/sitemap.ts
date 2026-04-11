export const dynamic = "force-dynamic"

// app/sitemap.ts
import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://collegeadm.org';

  const [colleges, posts, courses, exams] = await Promise.all([
    prisma.college.findMany({ 
      select: { 
        slug: true, 
        updatedAt: true, 
        location: true,
        courses: { select: { slug: true } }
      }
    }),
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

  // Programmatic SEO URLs: Colleges in [City]
  const cities = Array.from(new Set(colleges.map(c => c.location.split(',')[0].trim().toLowerCase())));
  const cityUrls = cities.map(city => ({
    url: `${baseUrl}/colleges-in-${city}`,
    lastModified: new Date(),
  }));

  // Programmatic SEO URLs: Top [Course] Colleges in [City]
  const topCollegesUrls: any[] = [];
  const processedPairs = new Set();

  colleges.forEach(college => {
    const city = college.location.split(',')[0].trim().toLowerCase();
    college.courses.forEach(course => {
      const pair = `${course.slug}-${city}`;
      if (!processedPairs.has(pair)) {
        processedPairs.add(pair);
        topCollegesUrls.push({
          url: `${baseUrl}/top-colleges/${course.slug}/${city}`,
          lastModified: new Date(),
        });
      }
    });
  });

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

  return [
    ...staticUrls, 
    ...collegeUrls, 
    ...postUrls, 
    ...courseUrls, 
    ...examUrls, 
    ...cityUrls,
    ...topCollegesUrls
  ];
}
