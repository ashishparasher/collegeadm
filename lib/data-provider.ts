// lib/data-provider.ts
import path from 'path';
import fs from 'fs';
import type { CollegeListing, BlogPost, MenuItem, MigrationBundle } from '@/types';

// ─── Load bundle once at build-time ─────────────────────────────────────────
function loadBundle(): MigrationBundle {
  const filePath = path.join(process.cwd(), 'public', 'data', 'migration_bundle.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as MigrationBundle;
}

// ─── Derive short college name from verbose WP title ─────────────────────────
function extractShortTitle(title: string): string {
  // Strip "Direct Admission 2026 | ..." and similar suffixes
  let short = title
    .replace(/\s*Direct Admission\s*\d+.*$/i, '')
    .replace(/\s*–\s*.*$/i, '')
    .replace(/\s*\(.*?\)/g, '')
    .replace(/,\s*(Bangalore|Mysore|Kolar|Belagavi).*$/i, '')
    .replace(/\s*\|\s*.*$/, '')
    .replace(/&amp;/g, '&')
    .trim();
  return short || title.split('|')[0].trim();
}

// ─── Extract city from content / title ────────────────────────────────────────
function extractCity(title: string, content: string): string {
  const cities = [
    'Bangalore', 'Bengaluru', 'Mysore', 'Belagavi', 'Kolar',
    'Mangalore', 'Hubli', 'Dharwad', 'Udupi',
  ];
  for (const city of cities) {
    if (title.includes(city) || content.includes(city)) {
      return city === 'Bengaluru' ? 'Bangalore' : city;
    }
  }
  return 'Karnataka';
}

// ─── Map taxonomy terms to course / college type ─────────────────────────────
const COURSE_LABEL: Record<string, string> = {
  bams: 'BAMS (Ayurveda)',
  bpt: 'BPT / MPT (Physiotherapy)',
  'medical colleges': 'MBBS / MD / MS',
  'engineering colleges': 'B.Tech / M.Tech',
};

function deriveCourseType(terms: CollegeListing['terms']): string {
  for (const t of terms) {
    const key = t.name.toLowerCase();
    if (COURSE_LABEL[key]) return COURSE_LABEL[key];
  }
  return 'UG / PG Programs';
}

function deriveCollegeType(terms: CollegeListing['terms']): string {
  for (const t of terms) {
    if (t.name === 'Private') return 'Private';
    if (t.name === 'Government') return 'Government';
  }
  return 'Private';
}

// ─── Strip WordPress Elementor shortcodes / noise ────────────────────────────
export function cleanContent(html: string): string {
  return html
    .replace(/\[.*?\]/g, '')          // shortcodes
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getAllColleges(): CollegeListing[] {
  const bundle = loadBundle();
  return bundle.content
    .filter((c: any) => c.type === 'listivo_listing')
    .map((raw: any): CollegeListing => ({
      ...raw,
      content: cleanContent(raw.content ?? ''),
      shortTitle: extractShortTitle(raw.title),
      city: extractCity(raw.title, raw.content ?? ''),
      courseType: deriveCourseType(raw.terms ?? []),
      collegeType: deriveCollegeType(raw.terms ?? []),
    }));
}

export function getCollegeBySlug(slug: string): CollegeListing | undefined {
  return getAllColleges().find((l) => l.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  const bundle = loadBundle();
  return bundle.content
    .filter((c: any) => c.type === 'post')
    .map((raw: any): BlogPost => ({
      ...raw,
      content: cleanContent(raw.content ?? ''),
    }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getMenuItems(menuSlug: 'main-menu' | 'footer-menu-1' | 'footer-menu-2'): MenuItem[] {
  const bundle = loadBundle();
  const items = bundle.menus[menuSlug] ?? [];
  return (items as any[]).map((item) => ({
    ID: item.ID,
    title: item.title,
    url: item.url,
    menu_item_parent: item.menu_item_parent,
  }));
}

export function getSiteInfo() {
  return loadBundle().site_info;
}

// ─── Grouping helpers ─────────────────────────────────────────────────────────

export function getListingsByCourse(): Record<string, CollegeListing[]> {
  const listings = getAllColleges();
  return listings.reduce<Record<string, CollegeListing[]>>((acc, l) => {
    const key = l.courseType ?? 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(l);
    return acc;
  }, {});
}

export function getFeaturedListings(count = 6): CollegeListing[] {
  return getAllColleges().slice(0, count);
}

export function getRelatedPost(listingSlug: string): BlogPost | undefined {
  const posts = getAllPosts();
  // Try to find a matching blog post by slug pattern
  const listingKey = listingSlug.replace(/-direct-admission-\d+.*$/, '').replace(/-admission-\d+.*$/, '');
  return posts.find((p) => p.slug.includes(listingKey.split('-')[0]) || p.slug.includes(listingKey));
}
