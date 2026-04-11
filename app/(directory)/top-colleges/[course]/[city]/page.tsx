// app/(directory)/top-colleges/[course]/[city]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { Award, ChevronRight, MapPin, GraduationCap } from 'lucide-react';

interface Props {
  params: { course: string; city: string };
}

export async function generateStaticParams() {
  const colleges = await prisma.college.findMany({ 
    include: { courses: true }
  });
  
  const params: { course: string; city: string }[] = [];
  
  colleges.forEach(college => {
    const city = college.location.split(',')[0].trim().toLowerCase();
    college.courses.forEach(course => {
      params.push({ course: course.slug, city });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await prisma.course.findUnique({ where: { slug: params.course } });
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  
  if (!course) return { title: 'Top Colleges' };

  return {
    title: `Top ${course.name} Colleges in ${cityName} - Direct Admission 2026`,
    description: `Ranked list of best ${course.name} colleges in ${cityName}. Check fees, cutoffs, and secure your direct admission seat today.`,
  };
}

export default async function TopCollegesPage({ params }: Props) {
  const course = await prisma.course.findUnique({
    where: { slug: params.course },
  });
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);

  if (!course) notFound();

  const dbListings = await prisma.college.findMany({
    where: {
      location: { contains: params.city },
      courses: { some: { slug: params.course } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const listings = dbListings.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: course.name,
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner'
  }));

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-navy-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/courses/${params.course}`} className="hover:text-white transition-colors">{course.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">Top Colleges in {cityName}</span>
          </nav>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Premium Selection</p>
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3 text-balance">
            Top {course.name} Colleges in {cityName}
          </h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Comparing the best {course.name} institutions in {cityName}. Secure your management quota seat with expert guidance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
            <GraduationCap className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No colleges found matching criteria</h3>
            <p className="text-gray-500">Try exploring other cities or courses for better options.</p>
          </div>
        )}
      </div>
    </div>
  );
}
