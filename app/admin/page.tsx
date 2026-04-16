export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import Link from 'next/link';
import { Building2, FileText, Users, TrendingUp, PlusCircle } from 'lucide-react';
import { getCollegeCount } from '@/services/college.service';
import { getPostCount } from '@/services/post.service';
import { getLeadCount } from '@/services/lead.service';

export default async function AdminDashboard() {
  const [collegeCount, postCount, leadCount] = await Promise.all([
    getCollegeCount(),
    getPostCount(),
    getLeadCount(),
  ]);

  const stats = [
    { label: 'Colleges', value: collegeCount, icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Posts', value: postCount, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Leads', value: leadCount, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Conversion', value: '12%', icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-comfortaa">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's today's snapshot.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card p-6 rounded-4xl border border-border flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground font-comfortaa">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-4xl border border-border p-6">
          <h2 className="font-comfortaa font-bold text-foreground mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/colleges/new" className="p-5 rounded-2xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-left group">
              <Building2 className="w-6 h-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-foreground text-sm">Add College</p>
            </Link>
            <Link href="/admin/posts/new" className="p-5 rounded-2xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-left group">
              <FileText className="w-6 h-6 text-accent mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-bold text-foreground text-sm">New Post</p>
            </Link>
          </div>
        </div>
        <div className="bg-card rounded-4xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-comfortaa font-bold text-foreground">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm font-bold text-accent">View All</Link>
          </div>
          <div className="p-8 text-center text-muted-foreground">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">{leadCount === 0 ? 'No leads captured yet.' : `${leadCount} leads captured.`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
