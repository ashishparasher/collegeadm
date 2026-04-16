import { getFeaturedColleges } from '@/services/college.service';
import { getRecentPosts } from '@/services/post.service';
import { Hero } from '@/components/sections/hero';
import { StatsBar } from '@/components/sections/stats-bar';
import { FeaturedColleges } from '@/components/sections/featured-colleges';
import { CourseExplorer } from '@/components/sections/course-explorer';
import { UpcomingExams } from '@/components/sections/upcoming-exams';
import { CityExplorer } from '@/components/sections/city-explorer';
import { TrustSection } from '@/components/sections/trust-section';
import { CtaBanner } from '@/components/sections/cta-banner';
import { NewsTicker } from '@/components/sections/news-ticker';
import { BlogCard } from '@/components/cards/blog-card';
import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(() => import('@/components/shared/whatsapp-button').then(m => m.WhatsAppButton), { ssr: false });
const FloatingCta = dynamic(() => import('@/components/shared/floating-cta').then(m => m.FloatingCta), { ssr: false });

export default async function HomePage() {
  const [colleges, posts] = await Promise.all([
    getFeaturedColleges(6),
    getRecentPosts(6),
  ]);

  const tickerPosts = posts.slice(0, 5).map((p: any) => ({ slug: p.slug, title: p.seo?.title || p.title || '' }));

  return (
    <>
      <Hero />
      <NewsTicker posts={tickerPosts} />
      <StatsBar />
      <FeaturedColleges colleges={colleges} />
      <CourseExplorer />
      <UpcomingExams />
      <TrustSection />
      <CityExplorer />

      {/* Blog Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-xs font-bold mb-5">
              📚 Latest Insights
            </div>
            <h2 className="font-comfortaa font-bold text-3xl lg:text-[2.75rem] text-foreground leading-tight">
              Admission Guides & Tips
            </h2>
            <p className="text-muted-foreground mt-3 text-base max-w-md mx-auto">Expert articles to help you navigate college admissions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post: any, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <WhatsAppButton />
      <FloatingCta />
    </>
  );
}
