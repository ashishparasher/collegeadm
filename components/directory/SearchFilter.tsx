'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListingCard } from './ListingCard';
import { cn } from '@/lib/utils';
import type { CollegeListing } from '@/types';

interface SearchFilterProps {
  listings: CollegeListing[];
  initialCourse?: string;
}

const COURSE_FILTERS = [
  { label: 'All Colleges', value: '' },
  { label: 'MBBS / Medical', value: 'MBBS / MD / MS' },
  { label: 'BAMS / Ayurveda', value: 'BAMS (Ayurveda)' },
  { label: 'BPT / Physio', value: 'BPT / MPT (Physiotherapy)' },
  { label: 'Engineering', value: 'B.Tech / M.Tech' },
];

const CITY_FILTERS = ['All Cities', 'Bangalore', 'Mysore', 'Belagavi', 'Kolar'];

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'A → Z', value: 'az' },
  { label: 'Z → A', value: 'za' },
  { label: 'Newest', value: 'newest' },
];

export function SearchFilter({ listings, initialCourse = '' }: SearchFilterProps) {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState(initialCourse);
  const [city, setCity] = useState('All Cities');
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { setCourse(initialCourse); }, [initialCourse]);

  const filtered = useMemo(() => {
    let items = [...listings];

    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.shortTitle?.toLowerCase().includes(q) ||
          l.city?.toLowerCase().includes(q) ||
          l.terms.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    if (course) {
      items = items.filter((l) => l.courseType === course);
    }

    if (city && city !== 'All Cities') {
      items = items.filter((l) => l.city === city);
    }

    if (sort === 'az') items.sort((a, b) => (a.shortTitle ?? a.title).localeCompare(b.shortTitle ?? b.title));
    if (sort === 'za') items.sort((a, b) => (b.shortTitle ?? b.title).localeCompare(a.shortTitle ?? a.title));
    if (sort === 'newest') items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return items;
  }, [listings, query, course, city, sort]);

  const hasActiveFilters = query || course || city !== 'All Cities' || sort !== 'default';

  const resetFilters = () => {
    setQuery('');
    setCourse('');
    setCity('All Cities');
    setSort('default');
  };

  return (
    <div>
      {/* Search bar */}
      <div className="bg-white rounded-2xl shadow-lg shadow-navy-900/8 border border-gray-100 p-4 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search colleges, courses, cities…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-400 transition-all bg-gray-50 placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all',
              showFilters
                ? 'bg-navy-700 text-white border-navy-700'
                : 'border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-700 bg-gray-50'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-100 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* City */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City</label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy-500/30 bg-white"
                    >
                      {CITY_FILTERS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Sort */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Sort by</label>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy-500/30 bg-white"
                    >
                      {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Reset */}
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                    className="w-full py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Course filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {COURSE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setCourse(f.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
              course === f.value
                ? 'bg-navy-700 text-white border-navy-700 shadow-md shadow-navy-500/20'
                : 'border-gray-200 text-gray-600 hover:border-navy-300 hover:text-navy-700 bg-white'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-navy-700">{filtered.length}</span> college{filtered.length !== 1 ? 's' : ''}
          {course && <span> in <span className="text-orange-500 font-medium">{course}</span></span>}
        </p>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
            <X className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-comfortaa font-bold text-gray-700 text-lg mb-2">No colleges found</h3>
          <p className="text-gray-400 text-sm mb-5">Try adjusting your filters or search query.</p>
          <button onClick={resetFilters} className="px-5 py-2.5 rounded-xl bg-navy-700 text-white text-sm font-medium hover:bg-navy-800 transition-colors">
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
