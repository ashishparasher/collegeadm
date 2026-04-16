import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import { LeadForm } from '@/components/forms/lead-form';
import { SITE } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us – Get Free Admission Counselling',
  description: 'Reach out to CollegeAdm for free admission guidance. MBBS, BAMS, B.Tech counselling available.',
  alternates: { canonical: `${SITE.url}/contact` },
};

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: `+91 ${SITE.phoneDisplay}`, href: `tel:${SITE.phone}`, color: 'from-emerald-500 to-teal-500' },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, color: 'from-blue-500 to-indigo-500' },
  { icon: MapPin, label: 'Location', value: SITE.address, href: '#', color: 'from-amber-500 to-orange-500' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat, 9AM – 7PM IST', href: '#', color: 'from-purple-500 to-pink-500' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-5">
            <Send className="w-3 h-3" /> Get In Touch
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Have questions? Our experts will guide you through the entire process — completely free.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <h2 className="font-comfortaa font-bold text-xl text-foreground mb-6">Send an Enquiry</h2>
            <div className="bg-card rounded-3xl border border-border p-7 surface-raised">
              <LeadForm />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-comfortaa font-bold text-xl text-foreground">Direct Contact</h2>
            {contactInfo.map((item) => (
              <a key={item.label} href={item.href} className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border hover:shadow-card-hover transition-all group">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  <p className="font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
