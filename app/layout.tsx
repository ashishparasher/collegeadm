import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';
import { Inter, Comfortaa } from 'next/font/google';
import './globals.css';
import { rootMetadata } from '@/lib/seo-utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/ui/FloatingCTA';

import { SessionProvider } from '@/components/providers/SessionProvider';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  display: 'swap',
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${comfortaa.variable}`}>
      <body className="font-inter antialiased bg-white text-gray-900">
        <SessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <WhatsAppButton />
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
