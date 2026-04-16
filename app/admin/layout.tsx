import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Building2, FileText, Users, GraduationCap, Image as ImageIcon, LogOut } from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/colleges', label: 'Colleges', icon: Building2 },
  { href: '/admin/courses', label: 'Courses', icon: GraduationCap },
  { href: '/admin/exams', label: 'Exams', icon: FileText },
  { href: '/admin/posts', label: 'Blog Posts', icon: FileText },
  { href: '/admin/leads', label: 'Leads', icon: Users },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 flex">
      <aside className="w-60 bg-card border-r border-border flex flex-col fixed inset-y-0 z-50">
        <div className="p-5 flex items-center gap-2.5 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center shadow-lg shadow-accent/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-comfortaa font-bold text-sm text-foreground block leading-none">CollegeAdm</span>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground mt-0.5 block">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <p className="px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 mt-2">Navigation</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-muted transition-all text-sm font-semibold text-muted-foreground hover:text-foreground group">
              <item.icon className="w-4 h-4 group-hover:text-accent transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <Link href="/" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <LogOut className="w-4 h-4" /> Back to Site
          </Link>
        </div>
      </aside>

      <main className="ml-60 flex-1">
        <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40 flex items-center px-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">System Online</span>
          </div>
        </header>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
