import type { Metadata, Viewport } from 'next';
import { Inter, Comfortaa } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#ff6b00',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://collegeadm.org'),
  title: {
    default: "CollegeAdm – Direct Admission In India's Top Colleges",
    template: '%s | CollegeAdm',
  },
  description:
    "Find direct admission guidance for MBBS, BAMS, BPT, B.Tech and more at top colleges in Bangalore & Karnataka. Expert counselling, management quota support.",
  keywords: ['direct admission', 'college admission india', 'management quota', 'MBBS admission', 'BAMS admission', 'engineering colleges bangalore'],
  openGraph: {
    type: 'website',
    siteName: 'CollegeAdm',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
  other: {
    'google': 'notranslate',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${comfortaa.variable}`} suppressHydrationWarning>
      <head>
        {/* PageSpeed: Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* PageSpeed: DNS prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-inter antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
