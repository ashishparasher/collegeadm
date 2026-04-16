import Link from 'next/link';
import { ArrowUpRight, Newspaper } from 'lucide-react';

interface Props {
  posts: { slug: string; title: string }[];
}

export function NewsTicker({ posts }: Props) {
  if (posts.length === 0) return null;

  const items = [...posts, ...posts]; // Double for seamless loop

  return (
    <section className="border-y border-border bg-card py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
              <Newspaper className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Updates</span>
          </div>
          <div className="overflow-hidden flex-1 relative">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {items.map((post, i) => (
                <Link
                  key={`${post.slug}-${i}`}
                  href={`/blog/${post.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  {post.title.split('|')[0].trim()}
                  <ArrowUpRight className="w-3 h-3 text-accent" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
