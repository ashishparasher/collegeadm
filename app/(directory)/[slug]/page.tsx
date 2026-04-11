// app/(directory)/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { generateCitySEOTemplate } from '@/lib/templates';
import { getCityVariants } from '@/lib/utils';
import { SeoLandingPage } from '@/components/seo/SeoLandingPage';
import { ProgrammaticPage } from '@/components/seo/ProgrammaticPage';
import { cities, courses, modifiers, courseSlugToName, modifierToTitle } from '@/lib/seoKeywords';

interface Props {
  params: { slug: string };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // 1. colleges-in-[city] (Legacy/Standard)
  cities.forEach(city => {
    params.push({ slug: `colleges-in-${city}` });
  });

  // 2. [modifier]-[course]-colleges-in-[city]
  modifiers.forEach(modifier => {
    courses.slice(0, 5).forEach(course => {
      cities.slice(0, 5).forEach(city => {
        params.push({ slug: `${modifier}-${course}-colleges-in-${city}` });
      });
    });
  });

  // 3. direct-admission- pattern (specific modifier)
  courses.slice(0, 5).forEach(course => {
    cities.slice(0, 5).forEach(city => {
      params.push({ slug: `direct-admission-${course}-colleges-${city}` });
    });
  });

  return params;
}

function parseSlug(slug: string) {
  // Pattern 1: [modifier]-[course]-colleges-in-[city]
  for (const mod of modifiers) {
    if (slug.startsWith(`${mod}-`)) {
      const remainder = slug.replace(`${mod}-`, '');
      for (const course of courses) {
        if (remainder.startsWith(`${course}-colleges-in-`)) {
          const city = remainder.replace(`${course}-colleges-in-`, '');
          return { modifier: mod, course, city, type: 'full' };
        }
      }
    }
  }

  // Pattern 2: direct-admission-[course]-colleges-[city]
  if (slug.startsWith('direct-admission-')) {
    const remainder = slug.replace('direct-admission-', '');
    for (const course of courses) {
      if (remainder.startsWith(`${course}-colleges-`)) {
        const city = remainder.replace(`${course}-colleges-`, '');
        return { modifier: 'direct-admission', course, city, type: 'direct' };
      }
    }
  }

  // Pattern 3: colleges-in-[city]
  if (slug.startsWith('colleges-in-')) {
    const city = slug.replace('colleges-in-', '');
    return { modifier: '', course: '', city, type: 'city' };
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseSlug(params.slug);
  if (!parsed) return {};
  
  const cityName = parsed.city.charAt(0).toUpperCase() + parsed.city.slice(1);
  const courseName = courseSlugToName[parsed.course] || parsed.course.toUpperCase() || 'Top';
  const modTitle = modifierToTitle[parsed.modifier] || (parsed.modifier ? parsed.modifier.charAt(0).toUpperCase() + parsed.modifier.slice(1) : 'Best');
  
  const title = parsed.type === 'city' 
    ? `Top Colleges in ${cityName} 2026 | Admission Guide`
    : `${modTitle} ${courseName} Colleges in ${cityName} 2026`;

  return {
    title: `${title} | Admission Guide`,
    description: `Explore the best colleges in ${cityName} with updated fees, rankings and admission details. Secure your seat today.`,
    alternates: {
      canonical: `https://collegeadm.org/${params.slug}`,
    }
  };
}

export default async function DynamicSeoPage({ params }: Props) {
  const parsed = parseSlug(params.slug);
  if (!parsed) notFound();

  const cityName = parsed.city.charAt(0).toUpperCase() + parsed.city.slice(1);
  const courseName = courseSlugToName[parsed.course] || parsed.course.toUpperCase() || 'Admission 2026';
  const modifierTitle = modifierToTitle[parsed.modifier] || (parsed.modifier ? parsed.modifier.charAt(0).toUpperCase() + parsed.modifier.slice(1) : 'Best');
  const cityVariants = getCityVariants(parsed.city);
  
  // Database Query
  let dbListings = await prisma.college.findMany({
    where: {
      AND: [
        {
          OR: cityVariants.map(variant => ({
            location: { contains: variant, mode: 'insensitive' }
          }))
        },
        parsed.course ? {
          OR: [
            { description: { contains: parsed.course, mode: 'insensitive' } },
            { name: { contains: parsed.course, mode: 'insensitive' } }
          ]
        } : {}
      ]
    },
    include: { courses: true },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  let isFallback = false;
  if (dbListings.length === 0) {
    isFallback = true;
    dbListings = await prisma.college.findMany({
      where: parsed.course ? {
        OR: [
          { description: { contains: parsed.course, mode: 'insensitive' } },
          { name: { contains: parsed.course, mode: 'insensitive' } }
        ]
      } : {},
      take: 6,
      include: { courses: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  const listings = dbListings.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: courseName,
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner'
  }));

  const template = generateCitySEOTemplate(parsed.city, listings, courseName);

  // Return the new ProgrammaticPage component for all cases for consistency
  return (
    <ProgrammaticPage
      city={parsed.city}
      course={parsed.course}
      modifier={parsed.modifier}
      cityName={cityName}
      courseName={courseName}
      modifierTitle={modifierTitle}
      listings={listings}
      isFallback={isFallback}
    />
  );
}
