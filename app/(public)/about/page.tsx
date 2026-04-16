import type { Metadata } from 'next';
import { Code, Heart, Target, Users, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us – Our Mission & Story',
  description: "Learn about CollegeAdm — India's trusted platform helping students secure direct admission to top colleges since 2020.",
  alternates: { canonical: `${SITE.url}/about` },
};

const values = [
  { icon: ShieldCheck, title: 'Transparency', desc: 'No hidden fees, no false promises. Everything in writing.', color: 'from-emerald-500 to-teal-500' },
  { icon: Heart, title: 'Student First', desc: "Every recommendation is based on what's best for the student.", color: 'from-rose-500 to-pink-500' },
  { icon: Target, title: 'Results Driven', desc: '99% success rate — because we only partner with verified colleges.', color: 'from-amber-500 to-orange-500' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold mb-5">
            <GraduationCap className="w-3 h-3" /> About CollegeAdm
          </div>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            Helping Students Reach Their <span className="text-gradient bg-gradient-to-r from-accent to-rose-400">Dream Colleges</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Founded in 2020, CollegeAdm has been India's trusted platform for direct admission guidance, helping over 5,000 students secure seats in top medical, engineering, and management institutions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((v, i) => (
            <div key={i} className="bg-card rounded-3xl border border-border p-7 hover:shadow-card-hover transition-all duration-300">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5 shadow-lg`}>
                <v.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-[2rem] border border-border p-10 lg:p-14 text-center">
          <h2 className="font-comfortaa font-bold text-2xl text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Our expert counsellors are here to guide you through every step of the admission process.</p>
          <Button asChild variant="accent" size="lg" className="rounded-full group">
            <Link href="/contact">Start Your Journey <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
