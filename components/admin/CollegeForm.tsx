// components/admin/CollegeForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createCollege, updateCollege } from '@/app/admin/colleges/actions';
import { Save, Loader2, Image as ImageIcon } from 'lucide-react';

const CollegeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  fees: z.string().optional(),
  cutoff: z.string().optional(),
  ranking: z.string().optional(),
  featuredImage: z.string().optional(),
});

type CollegeFormData = z.infer<typeof CollegeSchema>;

interface CollegeFormProps {
  initialData?: any;
  id?: string;
}

export function CollegeForm({ initialData, id }: CollegeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CollegeFormData>({
    resolver: zodResolver(CollegeSchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      location: '',
      description: '',
      fees: '',
      cutoff: '',
      ranking: '',
      featuredImage: '',
    },
  });

  const onSubmit = async (data: CollegeFormData) => {
    setLoading(true);
    try {
      if (id) {
        await updateCollege(id, data);
      } else {
        await createCollege(data);
      }
      router.push('/admin/colleges');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error saving college');
    } finally {
      setLoading(false);
    }
  };

  const name = watch('name');
  const generateSlug = () => {
    if (name) {
      setValue('slug', name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">College Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
              placeholder="e.g. MS Ramaiah Medical College"
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex justify-between">
              Slug
              <button type="button" onClick={generateSlug} className="text-xs text-navy hover:text-orange-500 font-bold">Auto-generate</button>
            </label>
            <input
              {...register('slug')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
              placeholder="e.g. ms-ramaiah-medical-college"
            />
            {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Location</label>
            <input
              {...register('location')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
              placeholder="e.g. Bangalore, Karnataka"
            />
            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Fees (Optional)</label>
            <input
              {...register('fees')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
              placeholder="e.g. 15 Lakhs Total"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Cutoff (Optional)</label>
            <input
              {...register('cutoff')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
              placeholder="e.g. 450+ NEET Score"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Ranking (Optional)</label>
            <input
              {...register('ranking')}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
              placeholder="e.g. #5 in Karnataka"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Featured Image URL</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                {...register('featuredImage')}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
                placeholder="/images/colleges/my-college.jpg"
              />
            </div>
            <button
              type="button"
              className="px-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <ImageIcon className="w-5 h-5" />
              Upload
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all resize-none"
            placeholder="Detailed description of the college..."
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {id ? 'Update College' : 'Create College'}
        </button>
      </div>
    </form>
  );
}
