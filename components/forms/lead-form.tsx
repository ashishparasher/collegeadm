'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  message: z.string().optional(),
  collegeInterest: z.string().optional(),
  collegeId: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function LeadForm({ collegeId, collegeName }: { collegeId?: string; collegeName?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { collegeId, collegeInterest: collegeName },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitted(true); reset(); }
      else { alert('Something went wrong.'); }
    } catch { alert('Error submitting form.'); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-4xl p-8 text-center animate-fade-in">
        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-emerald-900 mb-2 font-comfortaa">Enquiry Received!</h3>
        <p className="text-emerald-700 text-sm">Our admission expert will call you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="mt-5 text-sm font-bold text-emerald-600 hover:underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Input {...register('name')} placeholder="Your Full Name" />
        {errors.name && <p className="text-[10px] text-destructive mt-1 ml-1">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Input {...register('email')} placeholder="Email" />
          {errors.email && <p className="text-[10px] text-destructive mt-1 ml-1">{errors.email.message}</p>}
        </div>
        <div>
          <Input {...register('phone')} placeholder="Phone" />
          {errors.phone && <p className="text-[10px] text-destructive mt-1 ml-1">{errors.phone.message}</p>}
        </div>
      </div>
      <textarea
        {...register('message')}
        placeholder="I'm interested in admission…"
        rows={3}
        className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all resize-none"
      />
      <Button type="submit" variant="accent" size="lg" disabled={loading} className="w-full rounded-xl">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Get Admission Help</>}
      </Button>
      <p className="text-[10px] text-muted-foreground text-center">By clicking, you agree to be contacted by our experts.</p>
    </form>
  );
}
