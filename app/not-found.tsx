import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-8">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-comfortaa font-bold text-7xl text-white mb-4">404</h1>
        <h2 className="font-comfortaa font-bold text-2xl text-white mb-4">Page not found</h2>
        <p className="text-navy-200 text-base mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It may have been moved or the URL might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-400 transition-all shadow-lg"
          >
            Go Home
          </Link>
          <Link
            href="/colleges"
            className="px-7 py-3.5 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all"
          >
            Browse Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}
