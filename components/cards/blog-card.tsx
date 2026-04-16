'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const imageSrc = post.featuredImage?.replace(/\.(jpg|jpeg|png)$/i, '.webp') || '/images/placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="contain-layout"
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <article className="bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1">
          <div className="relative h-48 bg-muted overflow-hidden">
            <Image src={imageSrc} alt={post.seo.title} fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Calendar className="w-3 h-3 text-accent" /> {formatDate(post.date)}
            </div>
            <h3 className="font-comfortaa font-bold text-[15px] text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-3">
              {post.seo.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-accent uppercase tracking-widest">Read More</span>
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
