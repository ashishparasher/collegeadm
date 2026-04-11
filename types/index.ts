// types/index.ts

export interface SEOData {
  focus_keyword: string;
  title: string;
  description: string;
}

export interface Term {
  term_id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface CollegeListing {
  id: number;
  title: string;
  slug: string;
  type: 'listivo_listing';
  content: string;
  excerpt: string;
  date: string;
  seo: SEOData;
  featured_image: string | null;
  terms: Term[];
  // Derived
  courseType?: string;   // from terms: BAMS | BPT | Medical Colleges | Engineering Colleges
  collegeType?: string;  // Private | Government
  city?: string;
  shortTitle?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  type: 'post';
  content: string;
  excerpt: string;
  date: string;
  seo: SEOData;
  featured_image: string | null;
  terms: Term[];
}

export interface MenuItem {
  title: string;
  url: string;
  menu_item_parent: string;
  ID: number;
}

export interface SiteInfo {
  name: string;
  description: string;
  url: string;
}

export interface DesignTokens {
  colors: { primary: string; secondary: string; accent: string };
  fonts: { heading: string; body: string };
}

export interface MigrationBundle {
  site_info: SiteInfo;
  content: (CollegeListing | BlogPost | Record<string, unknown>)[];
  taxonomies: unknown[];
  menus: Record<string, MenuItem[]>;
  media: unknown[];
  design: DesignTokens;
}
