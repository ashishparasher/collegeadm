import type { Metadata } from 'next';
import { Inter, Comfortaa } from 'next/font/google';
import './globals.css';
import { rootMetadata } from '@/lib/seo-utils';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

const WhatsAppButton = dynamic(() => import('@/components/ui/WhatsAppButton').then(mod => mod.WhatsAppButton), { ssr: false });
const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA').then(mod => mod.FloatingCTA), { ssr: false });

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
          <FloatingCTA />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
