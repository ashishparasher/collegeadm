import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CollegeAdm',
  description: 'CollegeAdm privacy policy — how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 pt-20">
      <div className="gradient-navy py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-comfortaa font-bold text-3xl lg:text-4xl text-white mb-2">Privacy Policy</h1>
          <p className="text-navy-200 text-sm">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 lg:p-12 college-prose space-y-8">
          {[
            {
              heading: '1. Information We Collect',
              body: 'We collect information you provide directly — such as your name, phone number, email address, and course preferences when you submit an enquiry. We also collect usage data automatically, including IP address, browser type, and pages visited, to improve our services.',
            },
            {
              heading: '2. How We Use Your Information',
              body: 'We use the information to: respond to your admission enquiries and connect you with partner colleges; send relevant updates about admission deadlines, seat availability, and fee details; improve our website and services; comply with legal obligations. We do not sell your personal data to third parties.',
            },
            {
              heading: '3. Data Sharing',
              body: 'We share your contact details only with the specific partner colleges you express interest in, so they can reach out regarding admission. All partner colleges are required to maintain data confidentiality.',
            },
            {
              heading: '4. Cookies',
              body: 'We use cookies to understand how visitors use our website. You can disable cookies in your browser settings, though some features may not function correctly.',
            },
            {
              heading: '5. Data Retention',
              body: 'We retain your enquiry data for up to 24 months. You may request deletion at any time by emailing support@collegeadm.org.',
            },
            {
              heading: '6. Your Rights',
              body: 'You have the right to access, correct, or delete your personal data. Contact us at support@collegeadm.org to exercise these rights. We will respond within 30 days.',
            },
            {
              heading: '7. Security',
              body: 'We implement industry-standard security measures including HTTPS encryption, secure servers, and access controls to protect your data.',
            },
            {
              heading: '8. Contact',
              body: 'For privacy-related questions, write to: support@collegeadm.org or call +91 77070 55155.',
            },
          ].map(({ heading, body }) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
