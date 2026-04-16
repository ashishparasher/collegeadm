'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Headphones, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: ShieldCheck, title: 'Verified Seats', desc: 'Direct tie-ups with officially recognized institutions.', color: 'from-emerald-500 to-teal-500' },
  { icon: Headphones, title: '24/7 Counselling', desc: 'Free expert guidance throughout the admission process.', color: 'from-blue-500 to-indigo-500' },
  { icon: FileCheck, title: 'Full Transparency', desc: 'No hidden costs. Everything documented in writing.', color: 'from-amber-500 to-orange-500' },
];

export function TrustSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold mb-6">
              <CheckCircle2 className="w-3 h-3" /> Why Students Trust Us
            </div>
            <h2 className="text-3xl lg:text-[2.75rem] text-foreground mb-6 leading-[1.15]">
              Expert Guidance for your{' '}
              <span className="text-gradient bg-gradient-to-r from-accent via-rose-400 to-indigo-500">Dream Career</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
              Securing a seat in a top college shouldn't be a gamble. Our experienced consultants provide transparent end-to-end support.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{f.title}</p>
                    <p className="text-muted-foreground text-sm mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button asChild variant="accent" size="lg" className="rounded-full group shadow-lg shadow-accent/20">
              <Link href="/contact">
                Schedule Free Call <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Decorative card stack */}
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-[2.5rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0"><CheckCircle2 className="w-6 h-6 text-emerald-600" /></div>
                    <div><p className="font-bold text-sm text-foreground">Admission Confirmed</p><p className="text-xs text-muted-foreground">MS Ramaiah Medical College</p></div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4 animate-slide-in" style={{ animationDelay: '0.5s' }}>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><FileCheck className="w-6 h-6 text-blue-600" /></div>
                    <div><p className="font-bold text-sm text-foreground">Documents Verified</p><p className="text-xs text-muted-foreground">All eligibility criteria met</p></div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4 animate-slide-in" style={{ animationDelay: '0.8s' }}>
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"><Headphones className="w-6 h-6 text-amber-600" /></div>
                    <div><p className="font-bold text-sm text-foreground">Counselling Complete</p><p className="text-xs text-muted-foreground">Expert guidance provided</p></div>
                  </div>
                </div>
              </div>
              
              {/* Floating success badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-elevated border border-border animate-float-slow z-10">
                <p className="text-3xl font-bold font-comfortaa text-foreground mb-0.5">99%</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Success Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
