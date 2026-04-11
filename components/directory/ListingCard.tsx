'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, BookOpen, ArrowRight, Star, Building2, ShieldCheck, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: any;
  index?: number;
  variant?: 'default' | 'compact';
}

export function ListingCard({ listing, index = 0, variant = 'default' }: ListingCardProps) {
  const imageSrc = listing.featured_image || '/images/placeholder-college.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        href={`/colleges/${listing.slug}`}
        className={cn(
          'group relative flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-sm',
          'hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-2',
          'transition-all duration-500 overflow-hidden h-full'
        )}
      >
        {/* Featured Image */}
        <div className="relative w-full h-56 sm:h-64 bg-gray-100 overflow-hidden">
          <Image
            src={imageSrc}
            alt={listing.shortTitle || listing.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
            <span className="glass px-3 py-1.5 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider shadow-xl">
              {listing.collegeType || 'Partner'}
            </span>
            {listing.ranking && (
              <span className="bg-orange-500 px-3 py-1.5 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider shadow-xl">
                {listing.ranking}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
             <div className="glass p-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
             </div>
             <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Verified Admission</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="font-comfortaa font-bold text-xl text-navy-800 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                {listing.shortTitle || listing.name}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center flex-shrink-0 group-hover:bg-navy-700 group-hover:rotate-12 transition-all duration-500">
              <GraduationCap className="w-6 h-6 text-navy-700 group-hover:text-white" />
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              {listing.city || listing.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              4.8 Rating
            </span>
          </div>

          {/* Short description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
            {listing.excerpt || `Join ${listing.shortTitle} through direct admission. Expert guidance for management quota seats and fee structure for 2026.`}
          </p>

          {/* CTA */}
          <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
            <span className="text-[11px] font-bold text-orange-500 uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors">
              Explore Campus
            </span>
            <div className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:translate-x-2 transition-all duration-500">
              <ArrowRight className="w-5 h-5 text-navy-700 group-hover:text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
