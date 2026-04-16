import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how CollegeAdm collects, uses, and protects your personal information.',
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-muted/50 py-14 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-comfortaa font-bold text-4xl text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <article className="bg-card rounded-3xl border border-border p-8 lg:p-12 prose">
          <h2>1. Information We Collect</h2>
          <p>When you use CollegeAdm, we may collect: your name, email address, phone number, and details about colleges you're interested in. This information is collected when you submit an enquiry form on our website.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information to: provide admission counselling, connect you with partner colleges, send relevant updates about admission openings, and improve our services.</p>
          
          <h2>3. Information Sharing</h2>
          <p>We may share your information with partner colleges you've expressed interest in. We do not sell or rent your personal information to third parties for marketing purposes.</p>
          
          <h2>4. Data Security</h2>
          <p>We use industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          
          <h2>5. Cookies</h2>
          <p>Our website uses cookies to improve user experience and analyze traffic. You can control cookie settings through your browser preferences.</p>
          
          <h2>6. Contact Us</h2>
          <p>For any privacy-related queries, contact us at <a href="mailto:support@collegeadm.org">support@collegeadm.org</a>.</p>
        </article>
      </div>
    </div>
  );
}
