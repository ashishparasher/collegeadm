// app/admin/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Building2, FileText, Users, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const [collegeCount, postCount, leadCount] = await Promise.all([
    prisma.college.count(),
    prisma.post.count(),
    prisma.lead.count(),
  ]);

  const stats = [
    { label: 'Total Colleges', value: collegeCount, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Posts', value: postCount, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Leads', value: leadCount, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Conversion Rate', value: '12%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Leads</h2>
            <button className="text-sm font-semibold text-navy hover:text-orange-500 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {leadCount === 0 ? (
              <div className="p-12 text-center text-gray-400">No leads captured yet.</div>
            ) : (
              // Placeholder for leads
              <div className="p-6 text-center text-gray-400">Loading leads...</div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/colleges/new" className="p-4 rounded-2xl border border-gray-100 hover:border-navy hover:bg-navy/5 transition-all text-left group">
              <Building2 className="w-6 h-6 text-navy mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-900 text-sm">Add College</p>
            </Link>
            <Link href="/admin/posts/new" className="p-4 rounded-2xl border border-gray-100 hover:border-navy hover:bg-navy/5 transition-all text-left group">
              <FileText className="w-6 h-6 text-navy mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-gray-900 text-sm">New Post</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
