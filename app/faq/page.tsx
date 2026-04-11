import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

export const metadata: Metadata = {
  title: 'FAQ – Admission Process & Management Quota | CollegeAdm',
  description: 'Frequently asked questions about direct college admission, management quota seats, NEET eligibility, and fee payment for Karnataka colleges.',
};

const FAQS = [
  {
    q: 'What is management quota admission?',
    a: 'Management quota refers to a specific percentage of seats (typically 15–25%) in private colleges that are filled by the college management directly, without going through the government counselling (KEA/MCC). These seats are available to eligible students who may not have cleared government cutoffs but meet the minimum eligibility criteria.',
  },
  {
    q: 'What is the minimum NEET score for MBBS management quota?',
    a: 'For MBBS management quota in Karnataka, the minimum NEET score requirement is the qualifying cutoff (50th percentile for general category, 40th for SC/ST/OBC). This is typically around 400–420 marks for general category. However, each college may have its own internal cutoff above this minimum.',
  },
  {
    q: 'How does CollegeAdm help with admissions?',
    a: 'We provide end-to-end admission guidance including: college shortlisting based on your NEET/CET score and budget, direct contact with college admission offices, documentation support, fee negotiation, hostel arrangement, and enrollment assistance — completely free of charge for initial counselling.',
  },
  {
    q: 'Are there management quota seats for BAMS (Ayurveda)?',
    a: 'Yes. Most private Ayurveda colleges in Karnataka offer management quota seats for BAMS. The fee for these seats is typically higher than government quota but still significantly lower than MBBS management fees. NEET qualification is mandatory.',
  },
  {
    q: 'What documents are needed for admission?',
    a: 'Standard documents include: NEET scorecard, Class 10 & 12 marksheets and certificates, Transfer Certificate (TC), Migration Certificate, Aadhar card, caste/category certificate (if applicable), passport-size photographs, and a medical fitness certificate. Some colleges may request additional documents.',
  },
  {
    q: 'Can I get a seat without clearing NEET for engineering or management courses?',
    a: 'For engineering (B.Tech) programs, NEET is not required. Admission is through COMEDK UGET, Karnataka CET (KCET), or JEE Main scores. For MBA/BBA/BCA programs, no entrance exam is typically mandatory for management quota seats at many private institutions.',
  },
  {
    q: 'How long does the admission process take?',
    a: 'The timeline varies. Government counselling rounds (KEA/MCC) typically run from July to October. Management quota admissions can be secured much faster — sometimes within 5–10 working days of contacting a college — but seats fill up quickly, so early enquiry is strongly recommended.',
  },
  {
    q: 'Is there a fee for your counselling service?',
    a: 'Initial counselling, college shortlisting, and guidance are completely free. We are compensated by our partner colleges once a student successfully enrols. You pay nothing extra compared to approaching the college directly — and you benefit from our negotiating experience.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="gradient-navy py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-300 text-sm font-semibold uppercase tracking-widest mb-2">Help Centre</p>
          <h1 className="font-comfortaa font-bold text-3xl lg:text-5xl text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-navy-200 text-base max-w-xl">
            Everything you need to know about direct college admissions, management quota, and our services.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <FAQAccordion faqs={FAQS} />

        <div className="mt-12 text-center bg-navy-50 rounded-2xl p-8 border border-navy-100">
          <h2 className="font-comfortaa font-bold text-navy-800 text-xl mb-3">Still have questions?</h2>
          <p className="text-gray-500 text-sm mb-5">Our counsellors are available Monday to Saturday, 9 AM to 7 PM.</p>
          <a
            href="tel:+917707055155"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition-all"
          >
            📞 Call +91 77070 55155
          </a>
        </div>
      </div>
    </div>
  );
}
