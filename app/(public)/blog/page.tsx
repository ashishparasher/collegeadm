import type { Metadata } from 'next';
import { getAllPosts } from '@/services/post.service';
import { BlogCard } from '@/components/cards/blog-card';

export const metadata: Metadata = {
  title: 'Admission Blog – Guides & Insights',
  description: 'Expert admission guides for MBBS, BAMS, BPT, and Engineering. NEET cutoffs, fee structures, management quota.',
  alternates: { canonical: 'https://collegeadm.org/blog' },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-muted/50 py-16 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Knowledge Hub</p>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Admission Guides & Insights
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {posts.length} expert-written guides to help you navigate college admissions.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post: any, i) => <BlogCard key={post.id} post={post} index={i} />)}
        </div>
      </div>
    </div>
  );
}
