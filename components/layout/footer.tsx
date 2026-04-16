import Link from 'next/link';
import { GraduationCap, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { SITE, NAV_LINKS, FOOTER_COLLEGE_LINKS, FOOTER_COURSE_LINKS, FOOTER_QUICK_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-foreground text-white relative overflow-hidden" aria-label="Site footer">
      {/* Gradient blobs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px]" />

      {/* Top CTA */}
      <div className="relative border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-comfortaa font-bold text-white text-lg">Need admission help?</p>
            <p className="text-white/40 text-sm">Talk to our expert counsellors — for free.</p>
          </div>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            <Phone className="w-4 h-4" />
            +91 {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Link grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-comfortaa font-bold text-lg">{SITE.name}</span>
          </Link>
          <p className="text-white/35 text-sm leading-relaxed mb-6">
            India's trusted platform for direct admission guidance. Helping students since 2020.
          </p>
          <div className="space-y-2 text-sm text-white/30">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" /><span>{SITE.address}</span></div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">{SITE.email}</a></div>
          </div>
          <div className="flex gap-2.5 mt-6">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-all" aria-label="Social">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-5 text-white/60 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5">
            {[...NAV_LINKS, ...FOOTER_QUICK_LINKS].map((link) => (
              <li key={link.href}><Link href={link.href} className="text-white/30 text-sm hover:text-white transition-colors inline-flex items-center gap-1 group">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-5 text-white/60 uppercase tracking-wider">Top Colleges</h3>
          <ul className="space-y-2.5">
            {FOOTER_COLLEGE_LINKS.map((link) => (
              <li key={link.href}><Link href={link.href} className="text-white/30 text-sm hover:text-white transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-5 text-white/60 uppercase tracking-wider">Courses</h3>
          <ul className="space-y-2.5">
            {FOOTER_COURSE_LINKS.map((item) => (
              <li key={item.href}><Link href={item.href} className="text-white/30 text-sm hover:text-white transition-colors">{item.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/20 text-xs">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Helping students find the right college since 2020.</p>
        </div>
      </div>
    </footer>
  );
}
