import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Users, Award, TrendingUp, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us – CollegeAdm | Trusted Admission Experts Since 2020',
  description: 'Learn about CollegeAdm — India\'s trusted education consultancy helping students secure direct admission in top medical, engineering, and paramedical colleges.',
};

const TEAM = [
  { name: 'Rajesh Kumar', role: 'Founder & Chief Counsellor', exp: '12 years in education consulting' },
  { name: 'Priya Sharma', role: 'Medical Admissions Head', exp: 'Ex-MBBS admissions coordinator, RGUHS' },
  { name: 'Suresh Nair', role: 'Engineering Division Lead', exp: '8 years, COMEDK & CET expert' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-2">Our Story</p>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">About CollegeAdm</h1>
          <p className="text-navy-200 text-base max-w-2xl">
            Helping Karnataka students navigate the complex world of college admissions since 2020.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mission */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-comfortaa font-bold text-3xl text-navy-800 mb-5">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              CollegeAdm was founded with a single mission: to make quality higher education accessible to every deserving student in India, regardless of their NEET rank or financial background.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              We specialise in management quota and direct admission seats at top private colleges in Karnataka — covering MBBS, BAMS, BPT, and B.Tech programs. Our team has deep relationships with admission offices at 20+ partner colleges.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our counselling is completely free for students. We believe the right guidance shouldn't cost a fortune.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, value: '5,000+', label: 'Students Guided', color: 'text-navy-600', bg: 'bg-navy-50' },
              { icon: Award, value: '20+', label: 'Partner Colleges', color: 'text-orange-500', bg: 'bg-orange-50' },
              { icon: TrendingUp, value: '98%', label: 'Success Rate', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: CheckCircle2, value: '6+', label: 'Years Experience', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map(({ icon: Icon, value, label, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl p-6 text-center border border-gray-100`}>
                <Icon className={`w-7 h-7 ${color} mx-auto mb-3`} />
                <p className={`font-comfortaa font-bold text-2xl ${color} mb-1`}>{value}</p>
                <p className="text-gray-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="font-comfortaa font-bold text-3xl text-navy-800 mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, exp }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-4 text-navy-700 font-bold font-comfortaa text-2xl">
                  {name[0]}
                </div>
                <h3 className="font-comfortaa font-bold text-navy-800 text-lg">{name}</h3>
                <p className="text-orange-500 text-sm font-semibold mt-1">{role}</p>
                <p className="text-gray-400 text-xs mt-2">{exp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-navy-700 to-navy-900 rounded-3xl p-10 text-center text-white">
          <h2 className="font-comfortaa font-bold text-3xl mb-4">Ready to start your journey?</h2>
          <p className="text-navy-200 mb-8 text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of students who found their dream college through CollegeAdm. Our experts are just a call away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917707055155"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 font-bold text-white hover:bg-orange-400 transition-all shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Call Now: +91 77070 55155
            </a>
            <Link
              href="/colleges"
              className="px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              Browse Colleges
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
