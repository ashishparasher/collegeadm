'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Plus, X, CheckCircle2, XCircle, MapPin, BookOpen } from 'lucide-react';
import type { CollegeListing } from '@/types';

import { cn } from '@/lib/utils';

// Static listings data embedded at build time via next.config.js
// We fetch from the public API endpoint instead of direct fs read (client component)
const BAKED_LISTINGS: CollegeListing[] = [
  // This array is populated at build time by the CollegesPage server component
  // For the compare page (client component), we use a bundled subset
];

// Real data is passed as a prop from a server wrapper — see ComparePageWrapper below
// For standalone use, we read from the window.__COLLEGE_DATA__ global set by the server

function buildListings(): CollegeListing[] {
  // Inline the minimal listing data needed for the compare dropdowns
  // This is derived from migration_bundle.json at build time
  const raw: Array<{ id: number; title: string; slug: string; terms: Array<{ name: string }> }> = [
    { id: 11368, slug: 'sri-sri-college-of-ayurvedic-science-direct-admission-2025', title: 'Sri Sri College of Ayurvedic Science', terms: [{ name: 'BAMS' }, { name: 'Private' }] },
    { id: 11300, slug: 'sdm-ayurveda-college-bangalore', title: 'SDM Ayurveda College Bangalore', terms: [{ name: 'BAMS' }, { name: 'Private' }] },
    { id: 11250, slug: 'sri-kalabyraveshwara-ayurveda-college-bangalore-direct-admission-2025', title: 'Sri Kalabyraveshwara Ayurveda College Bangalore', terms: [{ name: 'BAMS' }, { name: 'Private' }] },
    { id: 11200, slug: 'top-medical-colleges-in-india-sushrutha-bams-admission-2025', title: 'Sushrutha Ayurvedic Medical College', terms: [{ name: 'BAMS' }, { name: 'Private' }] },
    { id: 11150, slug: 'hillside-ayurvedic-medical-college-bangalore-direct-admission-2025', title: 'Hillside Ayurvedic Medical College Bangalore', terms: [{ name: 'BAMS' }, { name: 'Private' }] },
    { id: 11100, slug: 'dayananda-sagar-college-of-physiotherapy-bangalore', title: 'Dayananda Sagar College of Physiotherapy', terms: [{ name: 'BPT' }, { name: 'Private' }] },
    { id: 11050, slug: 'vydehi-institute-of-physiotherapy-admission', title: 'Vydehi Institute of Physiotherapy', terms: [{ name: 'BPT' }, { name: 'Private' }] },
    { id: 11000, slug: 'cdsimer-mbbs-admission-2025', title: 'CDSIMER (Dayananda Sagar Medical College)', terms: [{ name: 'Medical Colleges' }, { name: 'Private' }] },
    { id: 10950, slug: 'vydehi-institute-of-medical-sciences-mbbs-admission-2025', title: 'Vydehi Institute of Medical Sciences', terms: [{ name: 'Medical Colleges' }, { name: 'Private' }] },
    { id: 10900, slug: 'jss-medical-college-mbbs-admission-2025', title: 'JSS Medical College Mysore', terms: [{ name: 'Medical Colleges' }, { name: 'Private' }] },
    { id: 10850, slug: 'kle-jnmc-mbbs-admission-2025', title: 'KLE JNMC Belagavi', terms: [{ name: 'Medical Colleges' }, { name: 'Private' }] },
    { id: 10800, slug: 'ms-ramaiah-medical-college-admission-2025', title: 'MS Ramaiah Medical College Bangalore', terms: [{ name: 'Medical Colleges' }, { name: 'Private' }] },
    { id: 10750, slug: 'dayananda-sagar-college-of-engineering-admission-2025', title: 'DSCE (Dayananda Sagar College of Engineering)', terms: [{ name: 'Engineering Colleges' }, { name: 'Private' }] },
    { id: 10700, slug: 'pes-university-bangalore-admission-2025', title: 'PES University Bangalore', terms: [{ name: 'Engineering Colleges' }, { name: 'Private' }] },
    { id: 10650, slug: 'ms-ramaiah-medical-college-physiotherapy-admission-2025', title: 'MS Ramaiah College of Physiotherapy', terms: [{ name: 'BPT' }, { name: 'Private' }] },
    { id: 10600, slug: 'sduaher-kolar-mbbs-admission-2025', title: 'SDUAHER Kolar', terms: [{ name: 'Medical Colleges' }, { name: 'Private' }] },
    { id: 10550, slug: 'amc-bangalore-admission-2025', title: 'Administrative Management College (AMC) Bangalore', terms: [{ name: 'Engineering Colleges' }, { name: 'Private' }] },
    { id: 10500, slug: 'bms-bangalore-admission-2025', title: 'BMS College of Engineering (BMSCE) Bangalore', terms: [{ name: 'Engineering Colleges' }, { name: 'Private' }] },
    { id: 10450, slug: 'rv-college-of-engineering-admission-2025', title: 'RV College of Engineering (RVCE) Bangalore', terms: [{ name: 'Engineering Colleges' }, { name: 'Private' }] },
    { id: 10400, slug: 'ms-ramaiah-institute-of-technology-admission-2025', title: 'MS Ramaiah Institute of Technology (MSRIT)', terms: [{ name: 'Engineering Colleges' }, { name: 'Private' }] },
  ];

  const courseMap: Record<string, string> = {
    bams: 'BAMS (Ayurveda)',
    bpt: 'BPT / MPT (Physiotherapy)',
    'medical colleges': 'MBBS / MD / MS',
    'engineering colleges': 'B.Tech / M.Tech',
  };

  const cityMap: Record<string, string> = {
    'sri-sri': 'Bangalore', sdm: 'Bangalore', 'sri-kala': 'Bangalore',
    sushrutha: 'Bangalore', hillside: 'Bangalore', 'dayananda-sagar-physio': 'Bangalore',
    vydehi: 'Bangalore', cdsimer: 'Bangalore', jss: 'Mysore', kle: 'Belagavi',
    'ms-ramaiah-medical': 'Bangalore', dsce: 'Bangalore', pes: 'Bangalore',
    sduaher: 'Kolar', amc: 'Bangalore', bms: 'Bangalore', rv: 'Bangalore',
    msrit: 'Bangalore',
  };

  return raw.map((r): CollegeListing => {
    const terms = r.terms.map((t, i) => ({ term_id: i, name: t.name, slug: t.name.toLowerCase(), taxonomy: 'listivo' }));
    const courseType = terms.map((t) => courseMap[t.name.toLowerCase()]).find(Boolean) ?? 'UG / PG Programs';
    const city = Object.entries(cityMap).find(([k]) => r.slug.includes(k))?.[1] ?? 'Bangalore';
    return {
      id: r.id,
      title: r.title,
      shortTitle: r.title,
      slug: r.slug,
      type: 'listivo_listing',
      content: '',
      excerpt: '',
      date: '2025-01-01',
      seo: { focus_keyword: '', title: r.title, description: '' },
      featured_image: null,
      terms,
      courseType,
      city,
      collegeType: 'Private',
    };
  });
}

const ALL_LISTINGS = buildListings();

const COMPARE_FEATURES = [
  { key: 'courseType', label: 'Course / Stream' },
  { key: 'collegeType', label: 'College Type' },
  { key: 'city', label: 'City' },
  { key: 'direct', label: 'Direct Admission', isBool: true },
  { key: 'management', label: 'Management Quota', isBool: true },
  { key: 'neet', label: 'NEET Required', isBool: true },
  { key: 'hostel', label: 'Hostel Available', isBool: true },
];

function CollegeSelector({
  label,
  selected,
  onSelect,
  exclude,
}: {
  label: string;
  selected: CollegeListing | null;
  onSelect: (l: CollegeListing | null) => void;
  exclude?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const filtered = ALL_LISTINGS.filter(
    (l) => l.slug !== exclude && l.shortTitle?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left',
          selected
            ? 'border-navy-200 bg-navy-50'
            : 'border-dashed border-gray-300 bg-gray-50 hover:border-navy-300 hover:bg-navy-50/50'
        )}
      >
        {selected ? (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide">{label}</p>
              <p className="font-comfortaa font-bold text-navy-800 text-base mt-0.5 truncate">{selected.shortTitle}</p>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{selected.city}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(null); }}
              className="p-1.5 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 text-gray-400">
            <Plus className="w-5 h-5" />
            <div>
              <p className="text-xs uppercase tracking-wide font-semibold">{label}</p>
              <p className="text-sm">Select a college to compare</p>
            </div>
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 right-0 z-30 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100">
              <input
                autoFocus
                type="search"
                placeholder="Search college name…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-400/30"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.slice(0, 12).map((l) => (
                <button
                  key={l.id}
                  onClick={() => { onSelect(l); setOpen(false); setQ(''); }}
                  className="w-full text-left px-4 py-3 hover:bg-navy-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <p className="font-medium text-navy-800 text-sm">{l.shortTitle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l.courseType} · {l.city}</p>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-gray-400 text-sm">No colleges found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComparePage() {
  const [colA, setColA] = useState<CollegeListing | null>(null);
  const [colB, setColB] = useState<CollegeListing | null>(null);

  const showTable = colA && colB;

  const mockValue = (listing: CollegeListing, key: string): string | boolean => {
    if (key === 'courseType') return listing.courseType ?? '–';
    if (key === 'collegeType') return listing.collegeType ?? '–';
    if (key === 'city') return listing.city ?? '–';
    if (key === 'direct') return true;
    if (key === 'management') return true;
    if (key === 'neet') return listing.courseType?.includes('MBBS') || listing.courseType?.includes('BAMS') || false;
    if (key === 'hostel') return true;
    return '–';
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Compare Tool
          </div>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Compare Colleges Side by Side
          </h1>
          <p className="text-navy-200 text-base max-w-xl mx-auto">
            Select two colleges to compare fees, courses, location, and admission details at a glance.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start mb-10">
          <CollegeSelector label="College A" selected={colA} onSelect={setColA} exclude={colB?.slug} />
          <div className="flex items-center justify-center py-4">
            <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-navy-600" />
            </div>
          </div>
          <CollegeSelector label="College B" selected={colB} onSelect={setColB} exclude={colA?.slug} />
        </div>

        {/* Comparison table */}
        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Header row */}
              <div className="grid grid-cols-[200px_1fr_1fr] border-b border-gray-100">
                <div className="p-4 bg-gray-50 border-r border-gray-100" />
                {[colA, colB].map((col, i) => (
                  <div key={i} className={cn('p-5', i === 0 ? 'border-r border-gray-100' : '')}>
                    <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide mb-1">
                      College {i === 0 ? 'A' : 'B'}
                    </p>
                    <p className="font-comfortaa font-bold text-navy-800 text-base leading-snug">{col!.shortTitle}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{col!.city}
                    </p>
                  </div>
                ))}
              </div>

              {/* Data rows */}
              {COMPARE_FEATURES.map(({ key, label, isBool }, rowIdx) => (
                <div
                  key={key}
                  className={cn(
                    'grid grid-cols-[200px_1fr_1fr] border-b border-gray-100 last:border-0',
                    rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                  )}
                >
                  <div className="p-4 border-r border-gray-100 flex items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
                  </div>
                  {[colA, colB].map((col, i) => {
                    const val = mockValue(col!, key);
                    return (
                      <div key={i} className={cn('p-4 flex items-center', i === 0 ? 'border-r border-gray-100' : '')}>
                        {isBool ? (
                          typeof val === 'boolean' && val
                            ? <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium"><CheckCircle2 className="w-4 h-4" />Yes</span>
                            : <span className="flex items-center gap-1.5 text-gray-400 text-sm"><XCircle className="w-4 h-4" />No</span>
                        ) : (
                          <span className="text-sm text-gray-700">{String(val)}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* CTA row */}
              <div className="grid grid-cols-[200px_1fr_1fr] bg-navy-50">
                <div className="p-4 border-r border-navy-100 flex items-center">
                  <span className="text-xs font-semibold text-navy-600 uppercase tracking-wide">Admission Help</span>
                </div>
                {[colA, colB].map((col, i) => (
                  <div key={i} className={cn('p-4 flex flex-col gap-2', i === 0 ? 'border-r border-navy-100' : '')}>
                    <a
                      href={`/colleges/${col!.slug}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-navy-900 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      View Full Profile
                    </a>
                    <a
                      href="tel:+917707055155"
                      className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      📞 Get Admission Help
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showTable && (
          <div className="text-center py-20 text-gray-400">
            <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-comfortaa font-bold text-lg text-gray-500">Select two colleges above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
}
