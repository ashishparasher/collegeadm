// components/ui/LeadForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const LeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone is required'),
  message: z.string().optional(),
  collegeInterest: z.string().optional(),
  collegeId: z.string().optional(),
});

type LeadFormData = z.infer<typeof LeadSchema>;

export function LeadForm({ collegeId, collegeName }: { collegeId?: string; collegeName?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      collegeId,
      collegeInterest: collegeName,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true);
    console.log('Submitting lead data:', data);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          collegeInterest: data.collegeInterest,
          collegeId: data.collegeId || undefined,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log('Lead submitted successfully:', result);
        setSubmitted(true);
        reset();
      } else {
        const errorData = await res.json();
        console.error('Lead submission failed:', errorData);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 mb-2 font-comfortaa">Enquiry Received!</h3>
        <p className="text-emerald-700 text-sm">
          Our admission expert will call you back within 24 hours to guide you through the process.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-bold text-emerald-600 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <input
            {...register('name')}
            placeholder="Your Full Name"
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all text-sm"
          />
          {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              {...register('email')}
              placeholder="Email Address"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all text-sm"
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register('phone')}
              placeholder="Phone Number"
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all text-sm"
            />
            {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.phone.message}</p>}
          </div>
        </div>

        <textarea
          {...register('message')}
          placeholder="I'm interested in management quota seats..."
          rows={3}
          className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Get Admission Help
          </>
        )}
      </button>
      <p className="text-[10px] text-gray-400 text-center px-4">
        By clicking, you agree to be contacted by our admission experts.
      </p>
    </form>
  );
}
