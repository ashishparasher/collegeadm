import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/services/post.service';
import { extractHeadings, formatDate, cleanSlug } from '@/lib/utils';
import { ContentRenderer } from '@/components/shared/content-renderer';
import { BlogCard } from '@/components/cards/blog-card';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/constants';

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  const slugs = new Set<string>();
  posts.forEach(p => { slugs.add(p.slug); slugs.add(cleanSlug(p.slug)); });
  return Array.from(slugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.seo.title,
    description: post.seo.description || `Read our guide on ${post.title}.`,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `${SITE.url}/blog/${post.slug}`,
      type: 'article',
      ...(post.featuredImage ? { images: [{ url: post.featuredImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.id, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.seo.title, item: `${SITE.url}/blog/${post.slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seo.title,
    description: post.seo.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-background pt-20">
        <div className="bg-muted/50 py-14 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 font-bold uppercase tracking-widest">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground truncate max-w-xs">{post.seo.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="accent">Admission Guide</Badge>
              <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <Calendar className="w-3 h-3" /> {formatDate(post.date)}
              </span>
            </div>
            <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-foreground leading-tight max-w-4xl">
              {post.seo.title}
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <article className="bg-card rounded-5xl shadow-card border border-border p-8 lg:p-12">
            <ContentRenderer html={post.content} />
            <div className="mt-10 pt-8 border-t border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold font-comfortaa text-xl">CA</div>
              <div>
                <p className="font-bold text-foreground">CollegeAdm Editorial Team</p>
                <p className="text-muted-foreground text-xs">Last updated {formatDate(post.date)}.</p>
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-comfortaa font-bold text-2xl text-foreground mb-8">More Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p: any, i) => <BlogCard key={p.id} post={p} index={i} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
