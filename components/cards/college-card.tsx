'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowUpRight, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { CollegeListing } from '@/types';

export function CollegeCard({ college, index = 0 }: { college: CollegeListing; index?: number }) {
  const imageSrc = college.featuredImage?.replace(/\.(jpg|jpeg|png)$/i, '.webp') || '/images/placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="h-full contain-layout"
    >
      <Link href={`/college/${college.slug}`} className="block h-full group">
        <article className="h-full flex flex-col bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:border-border/50 hover:-translate-y-1">
          {/* Image */}
          <div className="relative w-full aspect-card bg-muted overflow-hidden">
            <Image
              src={imageSrc}
              alt={college.shortTitle}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <Badge className="bg-white/90 text-foreground border-none text-[10px] font-bold backdrop-blur-sm gap-1 shadow-sm">
                <MapPin className="w-3 h-3 text-accent" /> {college.city}
              </Badge>
              {college.ranking && (
                <Badge className="bg-accent/90 text-white border-none text-[10px] font-bold backdrop-blur-sm shadow-sm">
                  {college.ranking}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5">
            <h3 className="font-comfortaa font-bold text-[15px] text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug mb-3">
              {college.shortTitle}
            </h3>

            <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-2 mb-5 flex-1">
              {college.excerpt}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <span className="text-[11px] font-bold text-accent uppercase tracking-widest">
                View Details
              </span>
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
