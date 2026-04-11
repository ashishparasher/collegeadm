import Link from 'next/link';
import { GraduationCap, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const COLLEGE_LINKS = [
  { href: '/colleges/ms-ramaiah-medical-college-admission-2025', label: 'MS Ramaiah Medical College' },
  { href: '/colleges/rv-college-of-engineering-admission-2025', label: 'RV College of Engineering' },
  { href: '/colleges/bms-bangalore-admission-2025', label: 'BMS College of Engineering' },
  { href: '/colleges/jss-medical-college-mbbs-admission-2025', label: 'JSS Medical College' },
  { href: '/colleges/pes-university-bangalore-admission-2025', label: 'PES University' },
];

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/colleges', label: 'All Colleges' },
  { href: '/blog', label: 'Admission Blog' },
  { href: '/compare', label: 'Compare Colleges' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/about-us-2', label: 'About Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white" aria-label="Site footer">
      {/* Top CTA bar */}
      <div className="bg-[#ff6f00] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-comfortaa font-bold text-white text-lg">
            Need help with admissions? Talk to our experts today.
          </p>
          <a
            href="tel:+917707055155"
            className="flex-shrink-0 flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 77070 55155
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-comfortaa font-bold text-xl text-white">CollegeAdm</span>
          </Link>
          <p className="text-navy-200 text-sm leading-relaxed mb-5">
            India's trusted platform for direct admission guidance. We help students secure seats in top medical, engineering, and paramedical colleges.
          </p>
          <div className="space-y-2 text-sm text-navy-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-orange-400 flex-shrink-0" />
              <span>Bangalore, Karnataka, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <a href="mailto:support@collegeadm.org" className="hover:text-orange-400 transition-colors">support@collegeadm.org</a>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors" aria-label="Social link">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-comfortaa font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-navy-300 text-sm hover:text-orange-400 transition-colors hover:translate-x-1 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Colleges */}
        <div>
          <h3 className="font-comfortaa font-bold text-white mb-4">Top Colleges</h3>
          <ul className="space-y-2">
            {COLLEGE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-navy-300 text-sm hover:text-orange-400 transition-colors hover:translate-x-1 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="font-comfortaa font-bold text-white mb-4">Courses We Cover</h3>
          <ul className="space-y-2">
            {[
              { label: 'MBBS Admission', href: '/colleges?course=mbbs' },
              { label: 'BAMS Admission', href: '/colleges?course=bams' },
              { label: 'BPT / MPT', href: '/colleges?course=bpt' },
              { label: 'B.Tech / M.Tech', href: '/colleges?course=engineering' },
              { label: 'MBA / MCA', href: '/colleges?course=management' },
              { label: 'Management Quota', href: '/blog' },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy-300 text-sm hover:text-orange-400 transition-colors hover:translate-x-1 inline-flex items-center gap-1 group">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-navy-400 text-xs">
          <p>© {new Date().getFullYear()} CollegeAdm. All rights reserved.</p>
          <p>Helping students find the right college since 2020.</p>
        </div>
      </div>
    </footer>
  );
}
