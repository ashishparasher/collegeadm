'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import parse, { DOMNode, Element, attributesToProps } from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

export function ContentRenderer({ html, className = '' }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('h1, h2, h3, h4').forEach((h) => {
      if (!h.id) {
        h.id = h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ?? '';
      }
    });
    ref.current.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
      if (!a.href.includes(window.location.hostname)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    });
  }, [html]);

  const clean = DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen'] });

  const options = {
    replace: (node: DOMNode) => {
      if (node instanceof Element && node.tagName === 'img') {
        const props = attributesToProps(node.attribs);
        let src = props.src as string;
        if (src?.startsWith('http')) return undefined;
        src = src?.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        return (
          <div className="relative w-full aspect-video my-6 overflow-hidden rounded-2xl bg-muted">
            <Image src={src} alt={(props.alt as string) || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
          </div>
        );
      }
    },
  };

  return (
    <div ref={ref} className={`prose ${className}`}>
      {parse(clean, options)}
    </div>
  );
}
