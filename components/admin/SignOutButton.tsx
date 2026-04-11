// components/admin/SignOutButton.tsx
'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 transition-colors text-sm font-medium text-navy-200 hover:text-red-400 group"
    >
      <LogOut className="w-5 h-5 text-navy-400 group-hover:text-red-400 transition-colors" />
      Sign Out
    </button>
  );
}
