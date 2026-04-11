// app/(directory)/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { generatePostMetadata, blogBreadcrumbSchema, blogArticleSchema } from '@/lib/seo-utils';
import { extractHeadings, formatDate } from '@/lib/utils';
import { ContentRenderer } from '@/components/directory/ContentRenderer';
import { BlogSidebar } from '@/components/directory/BlogSidebar';
import { BlogCard } from '@/components/ui/StatsBar';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Post Not Found' };
  // Mock SEO fields for existing utility
  const seoPost = { ...post, date: post.createdAt.toISOString(), seo: { title: post.metaTitle || post.title, description: post.metaDescription || post.content.slice(0, 160), focus_keyword: '' } };
  return generatePostMetadata(seoPost as any);
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = await prisma.post.findMany({
    where: { id: { not: post.id } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const displayTitle = post.metaTitle || post.title;

  return (
    <>
      <div className="min-h-screen bg-gray-50/30 pt-20">
        {/* Header */}
        <div className="gradient-navy py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-navy-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/70 truncate max-w-xs">{displayTitle}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full font-semibold">
                Admission Guide
              </span>
              <span className="flex items-center gap-1.5 text-navy-300 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.createdAt.toISOString())}
              </span>
            </div>

            <h1 className="font-comfortaa font-bold text-2xl sm:text-3xl lg:text-4xl text-white text-balance leading-tight max-w-4xl">
              {displayTitle}
            </h1>

            {post.metaDescription && (
              <p className="text-navy-200 text-base mt-4 max-w-3xl leading-relaxed">
                {post.metaDescription}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 min-w-0">
              <ContentRenderer html={post.content} />

              {/* Author/trust block */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 text-navy-700 font-bold font-comfortaa text-lg">
                  CA
                </div>
                <div>
                  <p className="font-semibold text-navy-800 text-sm">CollegeAdm Editorial Team</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Our admission experts review every guide for accuracy. Last updated {formatDate(post.createdAt.toISOString())}.
                  </p>
                </div>
              </div>
            </article>

            <BlogSidebar headings={headings} />
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-comfortaa font-bold text-2xl text-navy-800 mb-8">More Admission Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p: any, i) => (
                  <BlogCard 
                    key={p.id} 
                    post={{
                      ...p, 
                      date: p.createdAt.toISOString(),
                      seo: {
                        title: p.metaTitle || p.title,
                        description: p.metaDescription || ''
                      }
                    }} 
                    index={i} 
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
