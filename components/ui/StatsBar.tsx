'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap, 
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate, truncate, stripHtml } from '@/lib/utils';

// ─── StatsBar ───────────────────────────────────────────────────────────────
export function StatsBar() {
  const stats = [
    { label: 'Guided Students', value: '5,000+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Partner Colleges', value: '20+', icon: Building2, color: 'text-orange-700', bg: 'bg-orange-50' },
    { label: 'Success Rate', value: '99%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Trust Factor', value: '100%', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] shadow-xl shadow-navy-900/5 border border-gray-100 flex flex-col items-center text-center group hover:scale-[1.03] transition-all"
          >
            <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12', stat.bg)}>
              <stat.icon className={cn('w-6 h-6', stat.color)} />
            </div>
            <p className="font-comfortaa font-bold text-2xl text-gray-900 mb-1">{stat.value}</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── CategoryGrid ────────────────────────────────────────────────────────────
export function CategoryGrid({ byCategory }: { byCategory?: any }) {
  const categories = [
    { name: 'MBBS / MD', icon: GraduationCap, color: 'from-red-500 to-rose-600', count: '12 Colleges' },
    { name: 'BAMS Ayurveda', icon: Award, color: 'from-emerald-500 to-teal-600', count: '8 Colleges' },
    { name: 'BPT Physio', icon: Zap, color: 'from-amber-500 to-orange-600', count: '6 Colleges' },
    { name: 'B.Tech / Engg', icon: Globe, color: 'from-blue-500 to-indigo-600', count: '15 Colleges' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 font-comfortaa mb-4">Browse by Course</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Find the best institutions offering your desired programs with management quota support.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-48 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg shadow-navy-900/5"
            >
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100', cat.color)} />
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <cat.icon className="w-10 h-10 opacity-20 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-comfortaa font-bold text-xl mb-1">{cat.name}</p>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{cat.count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BlogCard ─────────────────────────────────────────────────────────────────
export function BlogCard({ post, index = 0 }: { post: any; index?: number }) {
  const excerpt = post.metaDescription || truncate(stripHtml(post.content), 120);
  const imageSrc = post.featuredImage?.replace(/\.(jpg|jpeg|png)$/i, '.webp') || '/images/blog-placeholder.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image 
            src={imageSrc} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="glass px-3 py-1.5 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider">
              Admission Guide
            </span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-orange-500" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" />6 min read</span>
          </div>

          <h3 className="font-comfortaa font-bold text-navy-800 text-lg leading-snug mb-4 group-hover:text-orange-600 transition-colors">
            {post.seo?.title?.replace(/\|.*$/, '').trim() || post.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">{excerpt}</p>

          <div className="mt-auto flex items-center gap-2 text-navy-700 text-xs font-bold uppercase tracking-widest group-hover:text-orange-600 transition-colors">
            Read Full Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
