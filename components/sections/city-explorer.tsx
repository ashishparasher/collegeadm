'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Bangalore', slug: 'bangalore', count: '10+', emoji: '🏙️' },
  { name: 'Mysore', slug: 'mysore', count: '3+', emoji: '🏛️' },
  { name: 'Mangalore', slug: 'mangalore', count: '5+', emoji: '🌊' },
  { name: 'Hubli', slug: 'hubli', count: '2+', emoji: '🏗️' },
  { name: 'Belgaum', slug: 'belgaum', count: '3+', emoji: '⛰️' },
  { name: 'Davangere', slug: 'davangere', count: '2+', emoji: '🌾' },
];

export function CityExplorer() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold mb-5">
            <MapPin className="w-3 h-3" /> Explore by City
          </div>
          <h2 className="font-comfortaa font-bold text-3xl lg:text-[2.75rem] text-foreground leading-tight">Top College Cities in Karnataka</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/colleges/${city.slug}`} className="block group">
                <div className="bg-card rounded-2xl border border-border p-5 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-2">{city.emoji}</div>
                  <p className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">{city.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-semibold">{city.count} colleges</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
