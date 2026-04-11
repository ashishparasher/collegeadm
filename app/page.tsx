// app/page.tsx
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { ListingCard } from '@/components/directory/ListingCard';
import { HeroSection } from '@/components/ui/HeroSection';
import { BlogCarousel } from '@/components/home/BlogCarousel';
import { BlogCard, StatsBar, CategoryGrid } from '@/components/ui/StatsBar';

export default async function HomePage() {
  const [featuredRaw, posts] = await Promise.all([
    prisma.college.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const featured = featuredRaw.map(l => ({
    ...l,
    shortTitle: l.name.split('|')[0].split('-')[0].trim(),
    city: l.location.split(',')[0].trim(),
    courseType: 'Direct Admission',
    featured_image: l.featuredImage,
    excerpt: l.description.replace(/<[^>]+>/g, ' ').slice(0, 140) + '...',
    collegeType: 'Partner'
  }));

  return (
    <>
      <HeroSection />
      
      {/* Blog Slider */}
      <section className="bg-white pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogCarousel posts={posts} />
        </div>
      </section>

      <StatsBar />

      {/* Featured Colleges */}
      <section className="py-32 bg-[#fcfdfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                 </div>
                 <span className="text-orange-600 font-bold text-[11px] uppercase tracking-[0.2em]">Our Selection</span>
              </div>
              <h2 className="font-comfortaa font-bold text-3xl lg:text-5xl text-navy-800 leading-tight">
                Featured Partner Institutions
              </h2>
              <p className="text-gray-500 mt-4 text-lg">Handpicked colleges offering secured management quota seats for the 2026 academic session.</p>
            </div>
            <Link
              href="/colleges"
              className="px-8 py-4 rounded-2xl bg-white border border-gray-100 text-navy-700 font-bold text-sm hover:shadow-xl hover:shadow-navy-900/5 transition-all flex items-center gap-3 group"
            >
              Browse Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {featured.map((listing: any, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />

      {/* Why Us / Trust Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-50 text-navy-700 text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Trusted by 5,000+ Students
              </div>
              <h2 className="font-comfortaa font-bold text-4xl lg:text-6xl text-navy-800 mb-8 leading-[1.1]">
                Expert Guidance for your <span className="text-orange-500">Dream Career.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
                Securing a seat in a top college shouldn't be a gamble. Our experienced consultants provide transparent end-to-end support for management quota admissions.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Verified Seats', desc: 'Direct tie-ups with officially recognized partner colleges.' },
                  { title: 'Fee Negotiation', desc: 'We help you get the best possible scholarship & fee structure.' },
                  { title: 'Full Transparency', desc: 'No hidden charges or false promises. Everything in writing.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800 text-base mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-12 inline-flex items-center gap-3 px-10 py-5 rounded-[1.5rem] bg-navy text-white font-bold shadow-2xl shadow-navy-500/30 hover:bg-navy-800 transition-all group"
              >
                Schedule Free Call <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="relative">
               <div className="aspect-square rounded-[3rem] bg-gray-100 overflow-hidden shadow-2xl rotate-3 relative z-10">
                  <img src="/images/colleges/SDM-Ayurvedic-College.jpeg" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="Counselling" />
               </div>
               <div className="absolute -bottom-10 -left-10 w-64 p-8 rounded-[2rem] bg-orange-500 text-white shadow-2xl z-20 -rotate-3 animate-float">
                  <p className="text-4xl font-bold font-comfortaa mb-1">99%</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Success Rate in Admissions</p>
               </div>
               <div className="absolute top-1/2 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-32 bg-[#fcfdfe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.3em] block mb-4">Insights</span>
            <h2 className="font-comfortaa font-bold text-3xl lg:text-5xl text-navy-800">
              Admission Guides & Tips
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {posts.map((post: any, i) => (
              <BlogCard 
                key={post.id} 
                post={{
                  ...post, 
                  date: post.createdAt.toISOString(),
                  seo: {
                    title: post.metaTitle || post.title,
                    description: post.metaDescription || ''
                  }
                }} 
                index={i} 
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/blog" className="inline-flex items-center gap-2 text-navy font-bold hover:text-orange-600 transition-colors uppercase tracking-widest text-xs">
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modern CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-navy rounded-[3rem] p-12 lg:p-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-comfortaa font-bold text-3xl lg:text-6xl text-white mb-8 leading-tight">
              Ready to secure your future?
            </h2>
            <p className="text-navy-100/70 text-lg lg:text-xl mb-12">
              Our experts are ready to guide you through the entire management quota process. Get started with a free counselling session.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+917707055155"
                className="px-8 py-4 rounded-xl bg-orange-500 text-white font-bold text-lg shadow-2xl shadow-orange-500/30 hover:bg-orange-400 transition-all hover:scale-105"
                >
                📞 Call: +91 77070 55155
                </a>              <Link
                href="/contact"
                className="px-10 py-5 rounded-2xl bg-white/10 text-white font-bold text-lg border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all"
              >
                Send Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
