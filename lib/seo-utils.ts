// lib/seo-utils.ts
import type { Metadata } from 'next';
import type { CollegeListing, BlogPost } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://collegeadm.org';

function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

// ─── Root metadata ────────────────────────────────────────────────────────────
export const rootMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'CollegeAdm – Direct Admission In India\'s Top Colleges',
    template: '%s | CollegeAdm',
  },
  description:
    'Find direct admission guidance for MBBS, BAMS, BPT, B.Tech and more at top colleges in Bangalore & Karnataka. Expert counselling, management quota support.',
  keywords: ['direct admission', 'college admission india', 'management quota', 'MBBS admission', 'BAMS admission', 'engineering colleges bangalore'],
  openGraph: {
    type: 'website',
    siteName: 'CollegeAdm',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

// ─── Listing page metadata ────────────────────────────────────────────────────
export function generateListingMetadata(listing: CollegeListing): Metadata {
  const title = decodeHtml(listing.seo.title || listing.title);
  const description = decodeHtml(listing.seo.description || `Get complete details on ${listing.shortTitle} direct admission 2026.`);
  const url = `${BASE_URL}/colleges/${listing.slug}`;

  return {
    title,
    description,
    keywords: listing.seo.focus_keyword?.split(',').map((k) => k.trim()),
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      ...(listing.featured_image ? { images: [{ url: listing.featured_image }] } : {}),
    },
    alternates: { canonical: url },
  };
}

// ─── Blog post metadata ───────────────────────────────────────────────────────
export function generatePostMetadata(post: BlogPost): Metadata {
  const title = decodeHtml(post.seo.title || post.title);
  const description = decodeHtml(post.seo.description || `Read our guide on ${post.title}.`);
  const url = `${BASE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.seo.focus_keyword?.split(',').map((k) => k.trim()),
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      ...(post.featured_image ? { images: [{ url: post.featured_image }] } : {}),
    },
    alternates: { canonical: url },
  };
}

// ─── JSON-LD Schema helpers ────────────────────────────────────────────────────
export function listingBreadcrumbSchema(listing: CollegeListing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Colleges', item: `${BASE_URL}/colleges` },
      { '@type': 'ListItem', position: 3, name: listing.shortTitle, item: `${BASE_URL}/colleges/${listing.slug}` },
    ],
  };
}

export function blogBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };
}

export function collegeOrganizationSchema(listing: CollegeListing) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: listing.shortTitle,
    description: listing.seo.description,
    url: `${BASE_URL}/colleges/${listing.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.city,
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
  };
}

export function blogArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'CollegeAdm' },
    publisher: {
      '@type': 'Organization',
      name: 'CollegeAdm',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
  };
}
