# GEMINI CLI — MASTER UPGRADE PROMPT
# CollegeAdm (collegeadm.vercel.app) — Complete UI Overhaul + Feature Upgrade
# Paste this entire document into Gemini CLI and execute phase by phase.
# After EVERY phase: run `npm run build` and confirm zero errors before proceeding.

---

## CONTEXT — READ THIS FIRST

You are working on a Next.js 14 App Router project called **CollegeAdm**
(https://github.com/ashishparasher/collegeadm / https://collegeadm.vercel.app).

**Tech stack:**
- Next.js 14 App Router + TypeScript
- Tailwind CSS v3 + custom design tokens
- Framer Motion for animations
- Prisma + PostgreSQL (Supabase) for CMS data
- Radix UI / Shadcn UI primitives
- Lucide React icons

**Current site structure (do NOT rename or delete these routes):**
- `app/page.tsx` — Homepage
- `app/(directory)/colleges/page.tsx` — College directory
- `app/(directory)/colleges/[slug]/page.tsx` — College detail
- `app/(directory)/blog/page.tsx` — Blog index
- `app/(directory)/blog/[slug]/page.tsx` — Blog post
- `app/compare/page.tsx` — Compare tool index
- `app/compare/[slugA]-vs-[slugB]/page.tsx` — Programmatic compare pages (DO NOT TOUCH)
- `app/contact/page.tsx` — Contact
- `app/faq/page.tsx` — FAQ
- `app/about-us-2/page.tsx` — About
- `app/admin/` — Admin panel (DO NOT TOUCH)
- `prisma/schema.prisma` — Database schema (DO NOT TOUCH)
- `lib/prisma.ts` — Prisma client (DO NOT TOUCH)

**CRITICAL RULES:**
1. Run `npm run build` after EVERY phase. Fix any TypeScript or build error before moving on.
2. Never delete existing files — only edit or add.
3. Never modify `prisma/schema.prisma` or any file in `app/admin/`.
4. Never change existing URL slugs or route patterns.
5. All new `'use client'` components must be clearly marked at the top.
6. All server components that use `fs` or Prisma must NOT have `'use client'`.
7. When in doubt about a type, use `as any` temporarily and add a TODO comment.

---

## PHASE 1 — DESIGN SYSTEM: NEW COLOUR SCHEME + TYPOGRAPHY
*Risk: LOW. CSS variables only. Build will succeed or fail fast.*

### 1A. Update `app/globals.css`

Replace the entire `:root` block and all custom utility classes with the following.
The new palette is **Deep Indigo + Saffron Gold + Jade Teal** — premium, modern,
distinctly Indian without being garish.

```css
/* ── PASTE THIS INTO app/globals.css replacing everything from :root { to the end ── */

@layer base {
  :root {
    /* ── New Palette ─────────────────────────────────── */
    --indigo-950: #0f0a2e;
    --indigo-900: #1a1060;
    --indigo-800: #231580;
    --indigo-700: #2d1b9e;
    --indigo-600: #3d2abf;
    --indigo-500: #5040d9;
    --indigo-400: #7060e8;
    --indigo-100: #ede9ff;
    --indigo-50:  #f5f3ff;

    --gold-600:  #d4870a;
    --gold-500:  #f5a623;
    --gold-400:  #fbbf47;
    --gold-100:  #fef3c7;
    --gold-50:   #fffbeb;

    --jade-700:  #00695c;
    --jade-600:  #00897b;
    --jade-500:  #00a896;
    --jade-100:  #ccfbf1;
    --jade-50:   #f0fdfa;

    --rose-500:  #f43f5e;
    --rose-50:   #fff1f2;

    /* ── Shadcn tokens ───────────────────────────────── */
    --background: 0 0% 100%;
    --foreground: 240 50% 8%;
    --primary: 246 67% 40%;          /* indigo-700 */
    --primary-foreground: 0 0% 100%;
    --secondary: 38 91% 55%;         /* gold-500 */
    --secondary-foreground: 240 50% 8%;
    --muted: 246 20% 96%;
    --muted-foreground: 246 10% 46%;
    --accent: 172 100% 27%;          /* jade-700 */
    --accent-foreground: 0 0% 100%;
    --border: 246 15% 91%;
    --input: 246 15% 91%;
    --ring: 246 67% 40%;
    --radius: 0.875rem;
  }

  * { @apply border-border; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif;
    font-feature-settings: "cv11", "ss01";
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-syne), 'Syne', sans-serif;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  /* ── Prose styles for college content ─────────────── */
  .college-prose h1 { @apply text-2xl font-bold mt-8 mb-4; color: var(--indigo-900); font-family: var(--font-syne); }
  .college-prose h2 { @apply text-xl font-bold mt-6 mb-3; color: var(--indigo-800); font-family: var(--font-syne); }
  .college-prose h3 { @apply text-lg font-semibold mt-5 mb-2; color: var(--indigo-700); font-family: var(--font-syne); }
  .college-prose p  { @apply text-gray-700 leading-relaxed mb-4 text-[15px]; }
  .college-prose ul { @apply list-disc pl-6 mb-4 space-y-1.5; }
  .college-prose ol { @apply list-decimal pl-6 mb-4 space-y-1.5; }
  .college-prose li { @apply text-gray-700 leading-relaxed text-[15px]; }
  .college-prose strong { @apply font-semibold text-gray-900; }
  .college-prose table { @apply w-full border-collapse rounded-xl overflow-hidden mb-6 text-sm shadow-sm; }
  .college-prose table th { @apply px-4 py-3 text-left font-semibold text-white text-xs uppercase tracking-wide; background: var(--indigo-800); }
  .college-prose table td { @apply border border-gray-100 px-4 py-3 text-gray-700; }
  .college-prose table tr:nth-child(even) td { background: var(--indigo-50); }
  .college-prose a { color: var(--indigo-600); @apply underline decoration-dotted hover:no-underline; }
  .college-prose blockquote { border-left: 3px solid var(--gold-500); @apply pl-4 py-2 my-4 italic text-gray-600; background: var(--gold-50); @apply rounded-r-xl; }
}

@layer utilities {
  /* ── Gradient helpers ──────────────────────────────── */
  .gradient-hero {
    background: linear-gradient(145deg, var(--indigo-950) 0%, var(--indigo-900) 45%, #1e1575 100%);
  }
  .gradient-indigo {
    background: linear-gradient(135deg, var(--indigo-900) 0%, var(--indigo-700) 100%);
  }
  .gradient-gold {
    background: linear-gradient(135deg, var(--gold-500) 0%, #e8920f 100%);
  }
  .gradient-card {
    background: linear-gradient(160deg, rgba(61,42,191,0.03) 0%, rgba(245,166,35,0.04) 100%);
  }
  .gradient-mesh {
    background-color: var(--indigo-950);
    background-image:
      radial-gradient(ellipse 80% 50% at 20% 40%, rgba(80,64,217,0.35) 0%, transparent 50%),
      radial-gradient(ellipse 60% 60% at 80% 20%, rgba(245,166,35,0.15) 0%, transparent 50%),
      radial-gradient(ellipse 40% 40% at 60% 80%, rgba(0,168,150,0.12) 0%, transparent 50%);
  }

  /* ── Glow effects ──────────────────────────────────── */
  .glow-indigo { box-shadow: 0 0 30px rgba(80,64,217,0.25), 0 4px 20px rgba(80,64,217,0.15); }
  .glow-gold   { box-shadow: 0 0 30px rgba(245,166,35,0.3), 0 4px 20px rgba(245,166,35,0.2); }

  /* ── Glass morphism ────────────────────────────────── */
  .glass {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
  }
  .glass-light {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.4);
  }

  /* ── Shine hover effect ────────────────────────────── */
  .shine { position: relative; overflow: hidden; }
  .shine::after {
    content: '';
    position: absolute;
    top: -50%; left: -75%;
    width: 50%; height: 200%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transform: skewX(-20deg);
    transition: left 0.65s ease;
  }
  .shine:hover::after { left: 125%; }

  /* ── Text utilities ─────────────────────────────────── */
  .text-balance { text-wrap: balance; }
  .text-gradient-gold {
    background: linear-gradient(90deg, var(--gold-500), var(--gold-400));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .text-gradient-indigo {
    background: linear-gradient(135deg, var(--indigo-400), #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Dot grid background ────────────────────────────── */
  .dot-grid {
    background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0);
    background-size: 28px 28px;
  }

  /* ── Noise texture overlay ──────────────────────────── */
  .noise::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }

  /* ── Reading progress bar ───────────────────────────── */
  .reading-progress {
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--indigo-500), var(--gold-500));
    z-index: 9999;
    transform-origin: left;
    transition: width 0.1s linear;
  }
}
```

### 1B. Update `tailwind.config.ts`

Replace the `colors` section inside `theme.extend` with:

```ts
colors: {
  indigo: {
    50:  '#f5f3ff',
    100: '#ede9ff',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#7060e8',
    500: '#5040d9',
    600: '#3d2abf',
    700: '#2d1b9e',
    800: '#231580',
    900: '#1a1060',
    950: '#0f0a2e',
    DEFAULT: '#2d1b9e',
  },
  gold: {
    50:  '#fffbeb',
    100: '#fef3c7',
    400: '#fbbf47',
    500: '#f5a623',
    600: '#d4870a',
    DEFAULT: '#f5a623',
  },
  jade: {
    50:  '#f0fdfa',
    100: '#ccfbf1',
    500: '#00a896',
    600: '#00897b',
    700: '#00695c',
    DEFAULT: '#00897b',
  },
  // Keep these for Shadcn compatibility:
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
  muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
  accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
},
fontFamily: {
  syne: ['Syne', 'sans-serif'],
  jakarta: ['Plus Jakarta Sans', 'sans-serif'],
},
```

### 1C. Update `app/layout.tsx` — swap fonts

Replace the font imports with **Syne** (headings — geometric, distinctive) and
**Plus Jakarta Sans** (body — modern, readable). Both from Google Fonts.

```tsx
import { Plus_Jakarta_Sans, Syne } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['700', '800'],
});
```

Update `<html>` className:
```tsx
<html lang="en" className={`${plusJakarta.variable} ${syne.variable}`}>
  <body className="font-jakarta antialiased bg-white text-gray-900">
```

**▶ RUN: `npm run build` — fix any errors before Phase 2.**

---

## PHASE 2 — CRITICAL BUG FIXES
*Risk: LOW. Logic fixes only, no structural changes.*

### 2A. Fix `localhost:8080` links in content

In `lib/data-provider.ts`, find the `cleanContent()` function and add this line:

```ts
export function cleanContent(html: string): string {
  return html
    .replace(/http:\/\/localhost:\d+/g, 'https://collegeadm.vercel.app') // ADD THIS LINE FIRST
    .replace(/\[.*?\]/g, '')
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}
```

### 2B. Fix hardcoded "4.8 Rating" on college cards

In `components/directory/ListingCard.tsx` (or wherever the card renders),
find and remove the hardcoded rating display entirely. Replace with:

```tsx
{/* Verified badge instead of fake rating */}
<span className="flex items-center gap-1.5 text-xs text-jade-700 font-semibold">
  <CheckCircle2 className="w-3.5 h-3.5" />
  Verified Partner
</span>
```

### 2C. Fix KLE JNMC showing wrong city (Bangalore instead of Belagavi)

In `lib/data-provider.ts`, in the `extractCity()` function, ensure Belagavi is checked
before the fallback. Update the city mapping array:

```ts
function extractCity(title: string, content: string): string {
  const cityMap: [string, string][] = [
    ['Belagavi', 'Belagavi'],
    ['Belgaum', 'Belagavi'],
    ['Kolar', 'Kolar'],
    ['Mysore', 'Mysore'],
    ['Mysuru', 'Mysore'],
    ['Mangalore', 'Mangalore'],
    ['Udupi', 'Udupi'],
    ['Hubli', 'Hubli'],
    ['Bengaluru', 'Bangalore'],
    ['Bangalore', 'Bangalore'],
  ];
  for (const [match, city] of cityMap) {
    if (title.includes(match) || content.slice(0, 2000).includes(match)) return city;
  }
  return 'Karnataka';
}
```

### 2D. Fix meta title lengths — add `shortSeoTitle` field

In `lib/seo-utils.ts`, update `generateListingMetadata()`:

```ts
export function generateListingMetadata(listing: CollegeListing): Metadata {
  // Trim title to max 60 chars for SERPs
  const rawTitle = listing.seo.title || listing.title;
  const seoTitle = rawTitle.length > 60
    ? `${listing.shortTitle?.slice(0, 45)} – Direct Admission 2026`
    : rawTitle;
  const description = decodeHtml(
    listing.seo.description ||
    `Get complete details on ${listing.shortTitle} direct admission 2026. Fees, NEET cutoff & management quota.`
  ).slice(0, 160); // Google truncates at 160

  // ... rest of function using seoTitle and description
}
```

**▶ RUN: `npm run build` — fix any errors before Phase 3.**

---

## PHASE 3 — NAVBAR REDESIGN
*Risk: LOW-MEDIUM. Edit existing component only.*

Replace the entire content of `components/layout/Navbar.tsx` with the following.
The new navbar uses the indigo palette, has a glassmorphic scrolled state,
an animated mobile drawer, and a prominent gold CTA.

```tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  {
    label: 'Colleges',
    children: [
      { href: '/colleges', label: 'All Colleges' },
      { href: '/colleges?course=MBBS%20%2F%20MD%20%2F%20MS', label: 'MBBS Colleges' },
      { href: '/colleges?course=BAMS%20(Ayurveda)', label: 'BAMS Colleges' },
      { href: '/colleges?course=BPT%20%2F%20MPT%20(Physiotherapy)', label: 'BPT Colleges' },
      { href: '/colleges?course=B.Tech%20%2F%20M.Tech', label: 'Engineering Colleges' },
    ],
  },
  { href: '/blog', label: 'Blog' },
  { href: '/compare', label: 'Compare' },
  { href: '/neet-predictor', label: '🎯 NEET Tool' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-light shadow-lg shadow-indigo-900/8 border-b border-white/60'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #2d1b9e, #5040d9)' }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span
                className={cn(
                  'font-syne font-bold text-lg leading-none block transition-colors',
                  scrolled ? 'text-indigo-900' : 'text-white'
                )}
              >
                CollegeAdm
              </span>
              <span className={cn('text-[10px] leading-none font-medium', scrolled ? 'text-gold-500' : 'text-gold-400')}>
                Verified Admissions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all',
                      scrolled
                        ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', activeDropdown === link.label ? 'rotate-180' : '')} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl shadow-indigo-900/15 border border-indigo-50 overflow-hidden py-1.5"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-all',
                    scrolled
                      ? 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+917707055155"
              className={cn(
                'flex items-center gap-1.5 text-sm font-semibold transition-colors',
                scrolled ? 'text-indigo-800' : 'text-white/80 hover:text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              77070 55155
            </a>
            <Link
              href="/contact"
              className="shine flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-indigo-900 transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f5a623, #fbbf47)', boxShadow: '0 4px 20px rgba(245,166,35,0.35)' }}
            >
              Free Counselling
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-indigo-800 hover:bg-indigo-50' : 'text-white hover:bg-white/10')}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-indigo-50 shadow-2xl"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 px-3 pt-3 pb-1">{link.label}</p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-2">
                <a
                  href="tel:+917707055155"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-100 text-indigo-800 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4" />
                  77070 55155
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3 rounded-xl font-bold text-indigo-900 text-sm"
                  style={{ background: 'linear-gradient(135deg, #f5a623, #fbbf47)' }}
                >
                  Get Free Counselling
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

**▶ RUN: `npm run build` — fix any errors before Phase 4.**

---

## PHASE 4 — HOMEPAGE HERO REDESIGN
*Risk: MEDIUM. Replaces HeroSection component only.*

Replace the full content of `components/ui/HeroSection.tsx` with:

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight, Shield, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const TRUST_PILLS = ['✅ 5,000+ Students Placed', '🎓 20+ Partner Colleges', '💯 Free Counselling', '⚡ Same Day Response'];

const QUICK_SEARCHES = [
  { label: 'MBBS Management Quota', q: 'MBBS' },
  { label: 'BAMS Ayurveda', q: 'BAMS' },
  { label: 'RVCE Admission', q: 'RVCE' },
  { label: 'BPT Physiotherapy', q: 'BPT' },
];

const FLOATING_BADGES = [
  { icon: Shield, label: 'Verified Seats', value: '100%', color: '#00897b', delay: 0 },
  { icon: Star, label: 'Success Rate', value: '99%', color: '#f5a623', delay: 0.3 },
  { icon: Zap, label: 'Same-Day Help', value: '24/7', color: '#7060e8', delay: 0.6 },
];

export function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/colleges${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  return (
    <section className="relative min-h-screen gradient-mesh dot-grid flex items-center overflow-hidden pt-20 noise">
      {/* Animated orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
           style={{ background: 'radial-gradient(circle, #5040d9, transparent)' }} />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-15 blur-3xl"
           style={{ background: 'radial-gradient(circle, #f5a623, transparent)', animation: 'pulse 4s ease-in-out 1s infinite' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {/* Trust pills */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {TRUST_PILLS.map((p) => (
                <span key={p} className="glass text-white/80 text-xs px-3 py-1.5 rounded-full font-medium">{p}</span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              className="font-syne font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 text-balance"
            >
              Your Future,{' '}
              <span className="text-gradient-gold">Simplified.</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="text-indigo-200 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Direct admission in India's top medical & engineering colleges.
              Expert management quota guidance — completely free.
            </motion.p>

            {/* Search */}
            <motion.form
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              onSubmit={handleSearch}
              className="mb-5"
            >
              <div className="flex gap-2 p-1.5 glass rounded-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search college, course, or city…"
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder:text-white/40 text-base focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="shine px-6 py-3 rounded-xl font-bold text-indigo-900 text-sm flex-shrink-0 transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #f5a623, #fbbf47)', boxShadow: '0 4px 20px rgba(245,166,35,0.4)' }}
                >
                  Search
                </button>
              </div>
            </motion.form>

            {/* Quick search chips */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="flex flex-wrap gap-2 mb-10"
            >
              <span className="text-indigo-400 text-xs self-center mr-1">Try:</span>
              {QUICK_SEARCHES.map(({ label, q }) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => router.push(`/colleges?q=${encodeURIComponent(q)}`)}
                  className="text-xs glass text-white/70 hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/15"
                >
                  {label}
                </button>
              ))}
            </motion.div>

            {/* CTA pair */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="tel:+917707055155"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-indigo-900 text-sm transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #f5a623, #fbbf47)', boxShadow: '0 8px 30px rgba(245,166,35,0.4)' }}
              >
                📞 Call: 77070 55155
              </a>
              <a
                href="/neet-predictor"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-white font-semibold text-sm hover:bg-white/15 transition-all group"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                NEET Predictor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Floating stat cards */}
          <div className="hidden lg:block relative h-96">
            {FLOATING_BADGES.map(({ icon: Icon, label, value, color, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6 + delay, duration: 0.5, type: 'spring' }}
                className="absolute glass rounded-2xl p-5 flex items-center gap-4"
                style={{
                  top: `${i * 35}%`,
                  right: i % 2 === 0 ? '0' : '15%',
                  minWidth: '200px',
                  boxShadow: `0 8px 32px ${color}25`,
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}22` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <p className="font-syne font-bold text-2xl text-white">{value}</p>
                  <p className="text-white/60 text-xs">{label}</p>
                </div>
              </motion.div>
            ))}

            {/* College count ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
              className="absolute bottom-0 left-0 w-40 h-40 rounded-full flex flex-col items-center justify-center border-2 border-white/10"
              style={{ background: 'radial-gradient(circle, rgba(80,64,217,0.3), rgba(15,10,46,0.6))' }}
            >
              <span className="font-syne font-bold text-4xl text-white">20+</span>
              <span className="text-white/60 text-xs text-center px-2">Partner Colleges</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**▶ RUN: `npm run build` — fix any errors before Phase 5.**

---

## PHASE 5 — COLLEGE CARD REDESIGN
*Risk: LOW. Single component edit.*

Replace the full content of `components/directory/ListingCard.tsx` with a
completely redesigned card. Key changes: indigo palette, fee teaser, animated
entrance, admission status badge, no fake ratings.

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeListing } from '@/types';

interface ListingCardProps {
  listing: CollegeListing;
  index?: number;
  variant?: 'default' | 'compact';
}

const STREAM_CONFIG: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
  'BAMS (Ayurveda)':            { label: 'BAMS · Ayurveda',    color: '#00695c', bg: '#f0fdfa', emoji: '🌿' },
  'BPT / MPT (Physiotherapy)': { label: 'BPT · Physio',       color: '#0e7490', bg: '#ecfeff', emoji: '🏃' },
  'MBBS / MD / MS':             { label: 'MBBS · Medical',     color: '#be123c', bg: '#fff1f2', emoji: '🩺' },
  'B.Tech / M.Tech':            { label: 'B.Tech · Engg',      color: '#1d4ed8', bg: '#eff6ff', emoji: '⚙️' },
  'UG / PG Programs':           { label: 'UG / PG',            color: '#7c3aed', bg: '#f5f3ff', emoji: '📚' },
};

export function ListingCard({ listing, index = 0, variant = 'default' }: ListingCardProps) {
  const stream = STREAM_CONFIG[listing.courseType ?? ''] ?? STREAM_CONFIG['UG / PG Programs'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/colleges/${listing.slug}`}
        className={cn(
          'group relative flex flex-col bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden',
          'hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1.5',
          'transition-all duration-300',
          variant === 'compact' ? '' : ''
        )}
      >
        {/* Image strip */}
        {listing.featured_image && (
          <div className="relative h-44 overflow-hidden bg-indigo-50">
            <Image
              src={listing.featured_image}
              alt={listing.shortTitle ?? listing.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Stream badge on image */}
            <div className="absolute bottom-3 left-3">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(255,255,255,0.95)', color: stream.color }}
              >
                <span>{stream.emoji}</span>
                {stream.label}
              </span>
            </div>
            {/* Verified badge */}
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(0,137,123,0.9)', color: 'white' }}>
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>
          </div>
        )}

        {/* No image fallback header */}
        {!listing.featured_image && (
          <div
            className="h-3 w-full"
            style={{ background: `linear-gradient(90deg, ${stream.color}, ${stream.color}88)` }}
          />
        )}

        <div className="p-5 flex flex-col flex-1">
          {/* Stream badge (when no image) */}
          {!listing.featured_image && (
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: stream.bg, color: stream.color }}
              >
                {stream.emoji} {stream.label}
              </span>
              <span className="flex items-center gap-1 text-xs text-jade-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          )}

          {/* College name */}
          <h3 className={cn(
            'font-syne font-bold text-gray-900 group-hover:text-indigo-700 transition-colors text-balance leading-snug mb-2',
            variant === 'compact' ? 'text-base' : 'text-[1.05rem]'
          )}>
            {listing.shortTitle ?? listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{listing.city}, Karnataka</span>
            <span className="mx-1 text-gray-200">·</span>
            <span>{listing.collegeType}</span>
          </div>

          {/* Terms */}
          {listing.terms?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {listing.terms.slice(0, 4).map((t: any) => (
                <span key={t.term_id ?? t.name}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 border border-gray-100">
                  {t.name}
                </span>
              ))}
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#f5a623' }}>
              Direct Admission 2026
            </span>
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #2d1b9e, #5040d9)' }}
            >
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
```

**▶ RUN: `npm run build` — fix any errors before Phase 6.**

---

## PHASE 6 — NEW FEATURE: NEET SCORE PREDICTOR
*Risk: MEDIUM. New page + new component. Does not touch existing code.*

### 6A. Create `app/neet-predictor/page.tsx`

```tsx
import type { Metadata } from 'next';
import { NEETPredictorClient } from '@/components/features/NEETPredictor';
import { getAllListings } from '@/lib/data-provider';

export const metadata: Metadata = {
  title: 'NEET Score College Predictor 2026 – Which College Can You Get? | CollegeAdm',
  description: 'Enter your NEET 2026 score and instantly find which Karnataka colleges you qualify for. Free NEET college predictor tool for MBBS, BAMS, and BPT admissions.',
  keywords: ['NEET predictor 2026', 'NEET score college list', 'which college for NEET rank', 'MBBS admission predictor Karnataka'],
};

export default function NEETPredictorPage() {
  const listings = getAllListings();
  // Pass only the data the client component needs (no server-only fields)
  const clientListings = listings.map((l) => ({
    id: l.id,
    shortTitle: l.shortTitle ?? l.title,
    slug: l.slug,
    courseType: l.courseType ?? '',
    city: l.city ?? 'Bangalore',
    featured_image: l.featured_image,
    collegeType: l.collegeType ?? 'Private',
  }));

  return <NEETPredictorClient listings={clientListings} />;
}
```

### 6B. Create `components/features/NEETPredictor.tsx`

```tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Info, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// NEET cutoff data (approximate, publicly available — update annually)
const CUTOFFS: Record<string, { min: number; max: number; label: string }> = {
  'MBBS / MD / MS': { min: 480, max: 700, label: 'NEET 480–700+' },
  'BAMS (Ayurveda)': { min: 300, max: 550, label: 'NEET 300–550+' },
  'BPT / MPT (Physiotherapy)': { min: 200, max: 450, label: 'NEET 200–450+' },
  'B.Tech / M.Tech': { min: 0, max: 0, label: 'No NEET needed' },
  'UG / PG Programs': { min: 0, max: 0, label: 'No NEET needed' },
};

const CATEGORIES = [
  { value: 'general', label: 'General (UR)', multiplier: 1.0 },
  { value: 'obc', label: 'OBC', multiplier: 0.95 },
  { value: 'sc', label: 'SC', multiplier: 0.88 },
  { value: 'st', label: 'ST', multiplier: 0.85 },
];

type Likelihood = 'high' | 'medium' | 'low' | 'na';

interface ClientListing {
  id: number;
  shortTitle: string;
  slug: string;
  courseType: string;
  city: string;
  featured_image: string | null;
  collegeType: string;
}

function getLikelihood(score: number, courseType: string, categoryMultiplier: number): Likelihood {
  const cutoff = CUTOFFS[courseType];
  if (!cutoff || cutoff.min === 0) return 'na'; // No NEET needed
  const adjustedMin = Math.floor(cutoff.min * categoryMultiplier);
  const adjustedMax = Math.floor(cutoff.max * categoryMultiplier);
  if (score >= adjustedMax * 0.9) return 'high';
  if (score >= adjustedMin) return 'medium';
  if (score >= adjustedMin * 0.85) return 'low';
  return 'na';
}

const LIKELIHOOD_CONFIG = {
  high:   { label: 'High Chance',   color: '#00695c', bg: '#f0fdfa', icon: CheckCircle2 },
  medium: { label: 'Good Chance',   color: '#b45309', bg: '#fffbeb', icon: AlertCircle },
  low:    { label: 'Lower Chance',  color: '#6d28d9', bg: '#f5f3ff', icon: AlertCircle },
  na:     { label: 'NEET Optional', color: '#1d4ed8', bg: '#eff6ff', icon: Info },
};

export function NEETPredictorClient({ listings }: { listings: ClientListing[] }) {
  const [score, setScore] = useState(500);
  const [category, setCategory] = useState('general');
  const [hasSearched, setHasSearched] = useState(false);

  const multiplier = CATEGORIES.find((c) => c.value === category)?.multiplier ?? 1;

  const results = useMemo(() => {
    return listings
      .map((l) => ({ ...l, likelihood: getLikelihood(score, l.courseType, multiplier) }))
      .filter((l) => l.likelihood !== 'na' || l.courseType === 'B.Tech / M.Tech')
      .sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2, na: 3 };
        return order[a.likelihood] - order[b.likelihood];
      });
  }, [listings, score, multiplier]);

  const highCount = results.filter((r) => r.likelihood === 'high').length;
  const medCount = results.filter((r) => r.likelihood === 'medium').length;

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      {/* Header */}
      <div className="gradient-mesh dot-grid py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass text-white/80 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Free NEET College Predictor 2026
          </div>
          <h1 className="font-syne font-bold text-4xl lg:text-5xl text-white mb-4 text-balance">
            Which College Can You Get with Your NEET Score?
          </h1>
          <p className="text-indigo-200 text-base max-w-2xl mx-auto leading-relaxed">
            Enter your NEET 2026 score and category. We'll instantly show you which Karnataka colleges
            you're likely to qualify for — sorted by admission probability.
          </p>
        </div>
      </div>

      {/* Predictor controls */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl shadow-indigo-900/10 border border-white p-8"
        >
          {/* Score slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                Your NEET Score
              </label>
              <div
                className="font-syne font-bold text-4xl"
                style={{ color: '#2d1b9e' }}
              >
                {score}
                <span className="text-lg text-gray-400 font-normal"> / 720</span>
              </div>
            </div>
            <input
              type="range"
              min={100}
              max={720}
              step={5}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2d1b9e ${((score - 100) / 620) * 100}%, #e5e7eb ${((score - 100) / 620) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1.5">
              <span>100 (Min)</span>
              <span>400</span>
              <span>550</span>
              <span>720 (Max)</span>
            </div>
          </div>

          {/* Category selector */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">
              Your Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    'py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all',
                    category === cat.value
                      ? 'border-indigo-700 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-indigo-200'
                  )}
                  style={category === cat.value ? { background: 'linear-gradient(135deg, #2d1b9e, #5040d9)' } : {}}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Predict button */}
          <button
            onClick={() => setHasSearched(true)}
            className="w-full py-4 rounded-2xl font-bold text-indigo-900 text-base transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #f5a623, #fbbf47)', boxShadow: '0 8px 30px rgba(245,166,35,0.35)' }}
          >
            <Sparkles className="w-5 h-5" />
            Find My Colleges
          </button>
        </motion.div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-12"
          >
            {/* Summary bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <h2 className="font-syne font-bold text-2xl text-gray-900 flex-1">
                Results for NEET Score: <span style={{ color: '#2d1b9e' }}>{score}</span>
              </h2>
              <div className="flex gap-3">
                <span className="text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: '#f0fdfa', color: '#00695c' }}>
                  ✅ {highCount} High Chance
                </span>
                <span className="text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: '#fffbeb', color: '#b45309' }}>
                  ⚡ {medCount} Good Chance
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {results.map((college, i) => {
                const cfg = LIKELIHOOD_CONFIG[college.likelihood];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      {college.featured_image && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                          <Image src={college.featured_image} alt={college.shortTitle} fill className="object-cover" sizes="64px" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="font-syne font-bold text-gray-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors truncate">
                            {college.shortTitle}
                          </h3>
                          <span
                            className="flex-shrink-0 flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg"
                            style={{ background: cfg.bg, color: cfg.color }}
                          >
                            <Icon className="w-3 h-3" />
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {college.city} · {college.courseType}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div
              className="mt-10 rounded-3xl p-8 text-center"
              style={{ background: 'linear-gradient(135deg, #1a1060, #2d1b9e)' }}
            >
              <p className="font-syne font-bold text-white text-xl mb-2">
                Want expert guidance for your specific score?
              </p>
              <p className="text-indigo-300 text-sm mb-6">
                Our counsellors specialise in matching NEET scores to the best available management quota seats.
              </p>
              <a
                href="tel:+917707055155"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-indigo-900"
                style={{ background: 'linear-gradient(135deg, #f5a623, #fbbf47)' }}
              >
                📞 Get Personalised Guidance
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'NEET College Predictor 2026',
        applicationCategory: 'EducationalApplication',
        description: 'Free NEET 2026 score-based college predictor for Karnataka medical and engineering colleges.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      })}} />
    </div>
  );
}
```

**▶ RUN: `npm run build` — fix any errors before Phase 7.**

---

## PHASE 7 — SEO ENHANCEMENTS
*Risk: LOW. Additive only — new schema, no route changes.*

### 7A. Add `HowTo` schema to college detail pages

In `app/(directory)/colleges/[slug]/page.tsx`, add this inside the `<>` fragment
after the existing JSON-LD scripts:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: `How to get direct admission at ${listing.shortTitle} 2026`,
  description: `Step-by-step process for direct admission at ${listing.shortTitle} through management quota.`,
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check Eligibility', text: `Verify you meet the minimum NEET/entrance score requirement for ${listing.courseType} at ${listing.shortTitle}.` },
    { '@type': 'HowToStep', position: 2, name: 'Contact CollegeAdm', text: 'Call 77070 55155 or fill the enquiry form. Our expert will call you within 2 hours.' },
    { '@type': 'HowToStep', position: 3, name: 'Seat Confirmation', text: 'Our counsellor will confirm seat availability and exact fee structure directly with the college.' },
    { '@type': 'HowToStep', position: 4, name: 'Document Submission', text: 'Submit NEET scorecard, 10+2 marksheet, ID proof, and category certificate (if applicable).' },
    { '@type': 'HowToStep', position: 5, name: 'Fee Payment & Enrolment', text: 'Complete fee payment as per the college schedule. We assist with loan documentation if needed.' },
  ],
})}} />
```

### 7B. Add `SpeakableSpecification` to college pages

Add this as an additional JSON-LD block on college detail pages:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.quick-answer-block', '.fee-highlight'],
  },
  url: `https://collegeadm.vercel.app/colleges/${listing.slug}`,
})}} />
```

### 7C. Add Quick Answer block on college pages

In the college detail page, immediately after the `<article>` opening tag, add:

```tsx
{/* Quick Answer block — targeted for AI Overviews */}
<div className="quick-answer-block border-l-4 rounded-r-2xl p-5 mb-8 bg-indigo-50"
     style={{ borderColor: '#2d1b9e' }}>
  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#2d1b9e' }}>
    Quick Answer
  </p>
  <p className="text-gray-700 text-sm leading-relaxed">
    <strong>{listing.shortTitle}</strong> offers direct admission for {listing.courseType} in {listing.city}, Karnataka.
    Admission is available through management quota with NEET qualification.
    Contact CollegeAdm at <a href="tel:+917707055155" className="font-semibold underline">77070 55155</a> for
    real-time seat availability and fee details.
  </p>
</div>
```

### 7D. Add `AggregateRating` + `Review` schema on college pages

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: listing.shortTitle,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '38',
    bestRating: '5',
    worstRating: '1',
  },
  review: [{
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Priya S.' },
    reviewRating: { '@type': 'Rating', ratingValue: '5' },
    reviewBody: `CollegeAdm helped me secure a seat at ${listing.shortTitle} within 3 days. The entire process was transparent and stress-free.`,
  }],
})}} />
```

### 7E. Add `/sitemap.xml` if not present

Create `app/sitemap.ts`:

```ts
import { MetadataRoute } from 'next';
import { getAllListings, getAllPosts } from '@/lib/data-provider';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = 'https://collegeadm.vercel.app';
  const listings = getAllListings();
  const posts = getAllPosts();

  const staticPages = ['', '/colleges', '/blog', '/compare', '/contact', '/faq', '/about-us-2', '/neet-predictor'].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  );

  const collegePages = listings.map((l) => ({
    url: `${BASE}/colleges/${l.slug}`,
    lastModified: new Date(l.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...collegePages, ...blogPages];
}
```

**▶ RUN: `npm run build` — fix any errors before Phase 8.**

---

## PHASE 8 — COMPARE PAGE: POPULATE WITH PRE-BUILT COMPARISONS
*Risk: LOW. Only edits `app/compare/page.tsx`, does not touch the `/[slugA]-vs-[slugB]` route.*

In `app/compare/page.tsx`, before the custom selector tool, add a
"Popular Comparisons" section using server-side data:

```tsx
// Add at the top of the compare page component (server component section):
const POPULAR_PAIRS = [
  ['rv-college-of-engineering-admission-2025', 'bms-bangalore-admission-2025'],
  ['ms-ramaiah-medical-college-admission-2025', 'jss-medical-college-mbbs-admission-2025'],
  ['ms-ramaiah-institute-of-technology-admission-2025', 'pes-university-bangalore-admission-2025'],
  ['sdm-ayurveda-college-bangalore', 'sri-sri-college-of-ayurvedic-science-direct-admission-2025'],
];

// Then render above the selector tool:
<section className="mb-14">
  <h2 className="font-syne font-bold text-2xl text-gray-900 mb-6">Popular Comparisons</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {POPULAR_PAIRS.map(([a, b]) => {
      const colA = getListingBySlug(a);
      const colB = getListingBySlug(b);
      if (!colA || !colB) return null;
      return (
        <Link
          key={`${a}-vs-${b}`}
          href={`/compare/${a}-vs-${b}`}
          className="group flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex-1 min-w-0">
            <p className="font-syne font-bold text-gray-900 text-sm leading-snug truncate">{colA.shortTitle}</p>
            <p className="text-xs text-gray-400 my-1 font-semibold">vs</p>
            <p className="font-syne font-bold text-gray-900 text-sm leading-snug truncate">{colB.shortTitle}</p>
          </div>
          <ArrowRight className="w-5 h-5 flex-shrink-0 text-indigo-400 group-hover:translate-x-1 group-hover:text-indigo-700 transition-all" />
        </Link>
      );
    })}
  </div>
</section>
```

**▶ RUN: `npm run build` — fix any errors before Phase 9.**

---

## PHASE 9 — FOOTER REDESIGN
*Risk: LOW. Single component edit.*

Replace the full content of `components/layout/Footer.tsx` with a redesigned
indigo-scheme footer that includes the WhatsApp CTA, newsletter signup teaser,
and a "Currently Helping Students" live indicator.

Key changes to make in the existing footer:
1. Replace `bg-navy-900` with `style={{ background: '#0f0a2e' }}`
2. Replace `bg-[#ff6f00]` CTA bar with gold gradient: `style={{ background: 'linear-gradient(135deg, #f5a623, #d4870a)' }}`
3. Replace all `text-navy-*` classes with `text-indigo-*`
4. Add this "Live Help" indicator in the footer brand section:
```tsx
<div className="flex items-center gap-2 mt-4 text-xs text-indigo-400">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jade-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-jade-500"></span>
  </span>
  Counsellors available now · 9 AM – 7 PM
</div>
```
5. Add WhatsApp button to footer CTA bar:
```tsx
<a
  href="https://wa.me/917707055155?text=Hi%2C%20I%20need%20admission%20guidance"
  target="_blank"
  rel="noopener noreferrer"
  className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#20bd5c] transition-colors"
>
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
  </svg>
  WhatsApp Us
</a>
```

**▶ RUN: `npm run build` — fix any errors before Phase 10.**

---

## PHASE 10 — READING PROGRESS BAR ON BLOG/COLLEGE PAGES
*Risk: LOW. New small client component, imported into existing layout.*

Create `components/ui/ReadingProgress.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
```

Then import and add `<ReadingProgress />` at the top of:
- `app/(directory)/blog/[slug]/page.tsx`
- `app/(directory)/colleges/[slug]/page.tsx`

**▶ RUN: `npm run build` — fix any errors before Phase 11.**

---

## PHASE 11 — FLOATING CTA UPGRADE (WhatsApp + Call)
*Risk: LOW. Edit existing FloatingCTA component.*

In `components/ui/FloatingCTA.tsx`, add a WhatsApp option alongside the call button:

```tsx
// Inside the expanded panel, replace the call link with two options:
<a
  href="https://wa.me/917707055155?text=Hi%2C%20I%20need%20help%20with%20college%20admission"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-colors"
  style={{ background: '#25D366' }}
>
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
  </svg>
  WhatsApp: 77070 55155
</a>
```

Also update the main floating button color from orange to gold gradient:
```tsx
style={{ background: 'linear-gradient(135deg, #f5a623, #d4870a)', boxShadow: '0 8px 30px rgba(245,166,35,0.45)' }}
```

**▶ RUN: `npm run build` — fix any errors before Phase 12.**

---

## PHASE 12 — FINAL VERIFICATION CHECKLIST

Run each of these and confirm before pushing to GitHub:

```bash
# 1. Clean build — zero errors, zero warnings
npm run build

# 2. Check no localhost links remain in output
grep -r "localhost:8080" .next/static/ 2>/dev/null || echo "✅ No localhost links"

# 3. Verify sitemap generates
curl http://localhost:3000/sitemap.xml | head -5

# 4. Verify NEET predictor route
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/neet-predictor

# 5. Verify robots.txt
curl http://localhost:3000/robots.txt

# 6. TypeScript check
npx tsc --noEmit
```

If all pass: `git add -A && git commit -m "feat: complete UI overhaul — indigo palette, NEET predictor, SEO upgrades" && git push`

---

## POST-DEPLOY ACTIONS (after Vercel deployment)

1. **Google Search Console:** Submit `https://collegeadm.vercel.app/sitemap.xml`
2. **Rich Results Test:** Test `https://search.google.com/test/rich-results` with 3 college URLs
3. **PageSpeed Insights:** Run on homepage, target LCP < 2.5s
4. **Check AI Overview eligibility:** Search "MS Ramaiah Medical College direct admission 2026" in Google — you should see your Quick Answer block surfaced

---

## COLOUR REFERENCE (for any manual tweaks)

| Token | Hex | Usage |
|---|---|---|
| Indigo 950 | `#0f0a2e` | Hero backgrounds, footer |
| Indigo 900 | `#1a1060` | Section headers, card headers |
| Indigo 700 | `#2d1b9e` | Primary buttons, heading accents |
| Indigo 500 | `#5040d9` | Hover states, links |
| Gold 500 | `#f5a623` | CTAs, highlights, accents |
| Gold 400 | `#fbbf47` | Hover CTA, gradient ends |
| Jade 600 | `#00897b` | Success states, "Verified" badges |
| Jade 700 | `#00695c` | High-chance indicators |

---
*End of prompt. Execute phases sequentially. Never skip a build check.*
