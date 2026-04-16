import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ – Frequently Asked Questions',
  description: 'Answers to common questions about direct admission, management quota, fee structures, and more.',
  alternates: { canonical: `${SITE.url}/faq` },
};

const faqs = [
  { q: 'What is direct admission?', a: 'Direct admission means securing a college seat without going through the standard counselling round, typically via management quota seats. Our experts negotiate the best fees and ensure a transparent process.' },
  { q: 'What courses do you help with?', a: 'We provide guidance for MBBS, BAMS, BPT, B.Tech, MBA, BCA, Nursing, and various other professional courses across Karnataka.' },
  { q: 'Is there any fee for your counselling?', a: 'No, our initial counselling and guidance is completely free. We earn from our partner college network, not from students.' },
  { q: 'How long does the admission process take?', a: 'Typically 7-14 working days from enquiry to seat confirmation, depending on the college and course availability.' },
  { q: 'Do I need NEET/CET scores for direct admission?', a: 'For medical courses (MBBS, BAMS), a valid NEET score is mandatory. For engineering and management courses, eligibility criteria vary by college.' },
  { q: 'Are the colleges verified?', a: 'Yes. We only partner with colleges that are recognized by UGC, AICTE, or respective governing bodies. Every listing on our platform is verified.' },
  { q: 'Can I visit the college before confirming?', a: "Absolutely! We encourage campus visits and can even arrange a guided tour with our representative at partner institutions." },
  { q: "What if I'm not satisfied after admission?", a: 'We maintain a transparent process. All terms are documented in writing before any commitment is made. We also assist with any post-admission queries.' },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-muted/50 py-16 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Help Centre</p>
          <h1 className="font-comfortaa font-bold text-4xl lg:text-5xl text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">Everything you need to know about our admission guidance services.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-card rounded-2xl border border-border overflow-hidden transition-all hover:shadow-card">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-foreground">
              <span className="pr-4">{faq.q}</span>
              <span className="text-accent text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            <div className="px-6 pb-6 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border">
              <p className="pt-4">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
