# CollegeAdm - Programmatic SEO Admission Portal

A high-performance Next.js 14 admission portal designed for high-scale student lead capture and automated SEO page generation.

## 🚀 Key Features

*   **Programmatic SEO:** Automatically generates thousands of pages for city-specific colleges, course comparisons, and top-ranked institutions.
*   **Dynamic CMS:** Manage Colleges, Courses, Exams, and Blog Posts through a secure Admin Panel.
*   **Lead Capture:** Integrated enquiry forms across all landing pages with database storage.
*   **Advanced UI:** Premium aesthetics with Framer Motion animations, Embla Carousel blog sliders, and WhatsApp integration.
*   **SEO Optimized:** Dynamic metadata, JSON-LD Schema markup, and automated Sitemap generation.

## 📁 Project Structure

*   `/app`: Next.js App Router routes including programmatic SEO segments.
*   `/components`: Reusable UI primitives and CMS forms.
*   `/lib`: Data providers, Prisma client, and SEO utilities.
*   `/prisma`: Database schema and migration scripts.
*   `/public`: Static assets including uploaded media.

## 🛠️ Management Guide

### How to Add Colleges
1. Log in to the Admin Panel (`/admin/login`).
2. Go to **Colleges** → **Add College**.
3. Enter name, slug, location, and description. 
4. *Tip:* Use the "Auto-generate" button for slugs.

### How to Add Blog Posts
1. Go to **Blog Posts** → **New Post**.
2. Use the **TipTap Rich Text Editor** to format your content.
3. Set Featured Image and SEO Meta tags for better ranking.

### How to Manage Leads
1. Go to **Leads** in the Admin Panel.
2. View student names, contact details, and their interested college.
3. Use the **Export CSV** button to download data for CRM integration.

## ☁️ Deployment (Vercel)

1. Connect your GitHub repository to **Vercel**.
2. Add the following Environment Variables:
    * `DATABASE_URL`: Your PostgreSQL connection string (Supabase recommended).
    * `NEXTAUTH_SECRET`: Random string for session security.
    * `NEXTAUTH_URL`: Your production URL (e.g., `https://collegeadm.org`).
3. Deploy! Vercel will automatically run `npm run build` and generate your static pages.

---
*Created by CollegeAdm Team*
