import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us – Free Admission Counselling | CollegeAdm',
  description: 'Get free admission counselling for MBBS, BAMS, BPT, and Engineering colleges in Karnataka. Call us or send a message.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-2">Free Counselling</p>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">Contact Us</h1>
          <p className="text-navy-200 text-base max-w-xl">
            Our admission experts are ready to guide you through the process. Reach out today — no obligations, completely free.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div>
            <h2 className="font-comfortaa font-bold text-2xl text-navy-800 mb-6">Get in Touch</h2>
            <div className="space-y-5 mb-10">
              {[
                { icon: Phone, label: 'Phone', value: '+91 77070 55155', href: 'tel:+917707055155' },
                { icon: Mail, label: 'Email', value: 'support@collegeadm.org', href: 'mailto:support@collegeadm.org' },
                { icon: MapPin, label: 'Office', value: 'Bangalore, Karnataka, India', href: '#' },
                { icon: Clock, label: 'Hours', value: 'Mon – Sat: 9 AM to 7 PM', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0 group-hover:bg-navy-100 transition-colors">
                    <Icon className="w-5 h-5 text-navy-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                    <p className="text-gray-800 font-medium mt-0.5">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-navy-50 rounded-2xl p-6 border border-navy-100">
              <h3 className="font-comfortaa font-bold text-navy-800 text-lg mb-3">Why consult us?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {[
                  "We know every college's management quota process inside out",
                  'We negotiate fees on your behalf — save lakhs',
                  'Trusted by 5,000+ students and families',
                  'No advance payment required for counselling',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
