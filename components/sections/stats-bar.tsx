'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Partner Colleges', value: '20+', icon: Building2, gradient: 'from-blue-500 to-indigo-500' },
  { label: 'Students Guided', value: '5K+', icon: Users, gradient: 'from-emerald-500 to-teal-500' },
  { label: 'Success Rate', value: '99%', icon: Award, gradient: 'from-amber-500 to-orange-500' },
  { label: 'Years Active', value: '6+', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' },
];

export function StatsBar() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-card rounded-3xl border border-border p-6 lg:p-7 overflow-hidden hover:border-border/50 transition-all duration-500 hover:shadow-card-hover contain-layout">
                {/* Gradient accent top line */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${stat.gradient} rounded-full opacity-40 group-hover:opacity-100 transition-opacity`} />
                
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-3xl font-bold font-comfortaa text-foreground mb-1">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
