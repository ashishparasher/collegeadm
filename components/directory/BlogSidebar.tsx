'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { List, Phone } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface BlogSidebarProps {
  headings: Heading[];
  relatedSlug?: string;
}

export function BlogSidebar({ headings, relatedSlug }: BlogSidebarProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="sticky top-24 space-y-5">
      {/* TOC */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-4 h-4 text-navy-600" />
          <h3 className="font-comfortaa font-bold text-navy-800 text-sm">On This Page</h3>
        </div>
        <nav>
          <ul className="space-y-1">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block text-xs py-1 px-2 rounded-md transition-all duration-200 leading-snug
                    ${h.level === 2 ? 'pl-2' : 'pl-5 text-gray-400'}
                    ${activeId === h.id
                      ? 'bg-navy-50 text-navy-700 font-semibold border-l-2 border-navy-600'
                      : 'text-gray-500 hover:text-navy-600 hover:bg-gray-50'
                    }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* CTA card */}
      <div className="rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 p-5 text-white">
        <p className="font-comfortaa font-bold text-base mb-2 leading-snug">
          Need Admission Help?
        </p>
        <p className="text-navy-200 text-xs leading-relaxed mb-4">
          Our counsellors are available 9 AM – 7 PM. Free guidance, no obligations.
        </p>
        <a
          href="tel:+917707055155"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl w-full justify-center"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        {relatedSlug && (
          <Link
            href={`/colleges/${relatedSlug}`}
            className="mt-2 flex items-center justify-center w-full py-2 rounded-xl border border-white/20 text-white/80 text-xs hover:bg-white/10 transition-colors"
          >
            View College Profile →
          </Link>
        )}
      </div>
    </aside>
  );
}
