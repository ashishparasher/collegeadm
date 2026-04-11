// app/admin/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Building2, FileText, Users, Image as ImageIcon, GraduationCap, Award, BookOpen, ScrollText } from 'lucide-react';
import { SignOutButton } from '@/components/admin/SignOutButton';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/colleges', label: 'Colleges', icon: Building2 },
    { href: '/admin/courses', label: 'Courses', icon: GraduationCap },
    { href: '/admin/exams', label: 'Exams', icon: BookOpen },
    { href: '/admin/scholarships', label: 'Scholarships', icon: Award },
    { href: '/admin/posts', label: 'Blog Posts', icon: FileText },
    { href: '/admin/leads', label: 'Leads', icon: Users },
    { href: '/admin/media', label: 'Media', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col fixed inset-y-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-comfortaa font-bold text-xl tracking-tight">Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium text-navy-100 hover:text-white group"
            >
              <item.icon className="w-5 h-5 text-navy-300 group-hover:text-orange-400 transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
