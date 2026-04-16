import Link from 'next/link';
import { Home, ArrowLeft, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="text-center max-w-md relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-accent" />
        </div>
        <p className="text-7xl font-bold font-comfortaa text-gradient bg-gradient-to-r from-accent to-rose-400 mb-4 inline-block">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3 font-comfortaa">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild variant="accent" className="rounded-full">
            <Link href="/"><Home className="w-4 h-4 mr-2" /> Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/colleges"><ArrowLeft className="w-4 h-4 mr-2" /> Browse Colleges</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
