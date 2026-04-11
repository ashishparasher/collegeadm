'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const COURSES = ['MBBS', 'BAMS (Ayurveda)', 'BPT / MPT', 'B.Tech / M.Tech', 'MBA / MCA', 'Other'];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-comfortaa font-bold text-navy-800 text-2xl mb-3">We got your message!</h3>
        <p className="text-gray-500 leading-relaxed">
          Our counsellor will call you within 24 hours. You can also reach us directly at{' '}
          <a href="tel:+917707055155" className="text-orange-500 font-semibold">+91 77070 55155</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
      <h2 className="font-comfortaa font-bold text-navy-800 text-xl mb-6">Send an Enquiry</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', colSpan: 1 },
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765…', colSpan: 1 },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
              <input
                type={type}
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-navy-400/30 focus:border-navy-300 transition-all placeholder:text-gray-400 bg-gray-50"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-navy-400/30 focus:border-navy-300 transition-all placeholder:text-gray-400 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Course Interested In</label>
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-navy-400/30 focus:border-navy-300 transition-all bg-gray-50"
          >
            <option value="">Select a course…</option>
            {COURSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message (optional)</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your situation…"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-navy-400/30 focus:border-navy-300 transition-all placeholder:text-gray-400 bg-gray-50 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.phone}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base text-white transition-all duration-200',
            loading || !form.name || !form.phone
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-500/30 hover:scale-[1.02]'
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Sending…
            </span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Enquiry
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to be contacted by our counselling team.
        </p>
      </div>
    </div>
  );
}
