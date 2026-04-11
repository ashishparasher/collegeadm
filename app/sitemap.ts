export const dynamic = "force-dynamic"

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { cities, courses, modifiers } from '@/lib/seoKeywords';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://collegeadm.org';

  // 1. Static & Data Driven Pages
  const [dbColleges, posts] = await Promise.all([
    prisma.college.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.post.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = ['', '/colleges', '/blog', '/compare', '/contact', '/faq', '/scholarships']
    .map(route => ({ url: `${baseUrl}${route}`, lastModified: new Date() }));

  const collegePages = dbColleges.map(c => ({
    url: `${baseUrl}/colleges/${c.slug}`,
    lastModified: c.updatedAt,
  }));

  const blogPages = posts.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  // 2. Programmatic SEO Routes: [modifier]-[course]-colleges-in-[city]
  const pSeoPages: any[] = [];
  // For sitemap, we include a high-value subset to avoid exceeding limits
  modifiers.forEach(modifier => {
    courses.forEach(course => {
      cities.slice(0, 8).forEach(city => {
        pSeoPages.push({
          url: `${baseUrl}/${modifier}-${course}-colleges-in-${city}`,
          lastModified: new Date(),
        });
      });
    });
  });

  // 3. Comparisons
  const comparisonPages: any[] = [];
  for (let i = 0; i < Math.min(dbColleges.length, 15); i++) {
    for (let j = i + 1; j < Math.min(dbColleges.length, 16); j++) {
      comparisonPages.push({
        url: `${baseUrl}/compare/${dbColleges[i].slug}-vs-${dbColleges[j].slug}`,
        lastModified: new Date(),
      });
    }
  }

  // 4. City catch-all legacy
  const cityPages = cities.map(city => ({
    url: `${baseUrl}/colleges-in-${city}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...collegePages,
    ...blogPages,
    ...pSeoPages,
    ...comparisonPages,
    ...cityPages
  ];
}
