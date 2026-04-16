// types/index.ts

export interface CollegeListing {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string | null;
  description: string;
  fees: string | null;
  cutoff: string | null;
  ranking: string | null;
  featuredImage: string | null;
  website: string | null;
  createdAt: Date;
  // Derived
  shortTitle: string;
  city: string;
  excerpt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  date: string;
  seo: { title: string; description: string };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  collegeInterest: string | null;
  collegeId: string | null;
  createdAt: Date;
}
