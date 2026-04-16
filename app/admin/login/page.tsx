'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) { setError('Invalid credentials'); setLoading(false); }
    else { router.push('/admin'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-comfortaa font-bold text-2xl text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage the platform.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-4xl border border-border p-8 space-y-4 shadow-card">
          <div><Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          {error && <p className="text-destructive text-xs font-bold text-center">{error}</p>}
          <Button type="submit" variant="accent" size="lg" disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
