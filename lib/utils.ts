import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format ISO date to readable string */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Clean a slug — strip year suffixes, trailing hyphens */
export function cleanSlug(slug: string): string {
  return slug
    .replace(/-202[4-9]/g, '')
    .replace(/-+$/g, '')
    .toLowerCase()
    .trim();
}

/** Extract h2/h3 headings from HTML for TOC */
export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const regex = /<h([23])[^>]*>([^<]+)<\/h\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

/** Strip HTML tags and truncate */
export function truncateHtml(html: string | undefined | null, maxLen: number = 140): string {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
}

/** Decode HTML entities */
export function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/** Get city name variants for fuzzy matching */
export function getCityVariants(city: string): string[] {
  const map: Record<string, string[]> = {
    bangalore: ['Bangalore', 'Bengaluru', 'bangalore', 'bengaluru'],
    mysore: ['Mysore', 'Mysuru', 'mysore', 'mysuru'],
    mangalore: ['Mangalore', 'Mangaluru', 'mangalore', 'mangaluru'],
    belgaum: ['Belgaum', 'Belagavi', 'belgaum', 'belagavi'],
    hubli: ['Hubli', 'Hubballi', 'hubli', 'hubballi'],
    kolar: ['Kolar', 'kolar'],
  };
  const key = city.toLowerCase();
  return map[key] || [city.charAt(0).toUpperCase() + city.slice(1), city];
}
