'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import parse, { DOMNode, Element, attributesToProps } from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';

interface ContentRendererProps {
  html: string;
  className?: string;
}

export function ContentRenderer({ html, className = '' }: ContentRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Add IDs to all headings that don't have one (for TOC scroll-spy)
    const headings = ref.current.querySelectorAll('h1, h2, h3, h4');
    headings.forEach((h) => {
      if (!h.id) {
        h.id = h.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') ?? '';
      }
    });
    // Open external links in new tab
    const links = ref.current.querySelectorAll<HTMLAnchorElement>('a[href]');
    links.forEach((a) => {
      if (!a.href.includes(window.location.hostname)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
    });
  }, [html]);

  const cleanHtml = DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] });

  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.tagName === 'img') {
        const props = attributesToProps(domNode.attribs);
        let src = props.src as string;
        
        // Handle external or unknown image domains if not configured in next.config.js
        const isExternal = src.startsWith('http');
        if (isExternal) return undefined; // Let normal img handle external if needed, or handle differently.

        return (
          <div className="relative w-full h-auto my-6 aspect-video overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={src}
              alt={(props.alt as string) || 'Content image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            />
          </div>
        );
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`college-prose ${className}`}
    >
      {parse(cleanHtml, options)}
    </div>
  );
}
