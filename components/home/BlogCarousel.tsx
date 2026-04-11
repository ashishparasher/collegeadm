// components/home/BlogCarousel.tsx
'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogCarouselProps {
  posts: any[];
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-[2.5rem]" ref={emblaRef}>
        <div className="flex">
          {posts.map((post) => (
            <div key={post.id} className="flex-[0_0_100%] min-w-0 relative h-[400px] sm:h-[500px]">
              <img
                src={post.featuredImage || '/images/blog-placeholder.jpg'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-8 sm:p-12 text-white">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.createdAt.toISOString())}</span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white/80">Admission Guide</span>
                  </div>
                  
                  <h3 className="font-comfortaa font-bold text-2xl sm:text-4xl lg:text-5xl mb-6 leading-tight text-balance">
                    {post.title}
                  </h3>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/30 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 group/btn"
                  >
                    Read Article <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 active:scale-90"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 active:scale-90"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 right-12 flex gap-2">
        {posts.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/20" />
        ))}
      </div>
    </div>
  );
}
