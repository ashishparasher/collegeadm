// components/admin/CourseForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createCourse, updateCourse } from '@/app/admin/courses/actions';
import { Save, Loader2 } from 'lucide-react';

const CourseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
});

type CourseFormData = z.infer<typeof CourseSchema>;

export function CourseForm({ initialData, id }: { initialData?: any; id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(CourseSchema),
    defaultValues: initialData || { name: '', slug: '' },
  });

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    try {
      if (id) await updateCourse(id, data);
      else await createCourse(data);
      router.push('/admin/courses');
      router.refresh();
    } catch (error) {
      alert('Error saving course');
    } finally {
      setLoading(false);
    }
  };

  const name = watch('name');
  const generateSlug = () => {
    if (name) setValue('slug', name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Course Name</label>
          <input
            {...register('name')}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all"
            placeholder="e.g. B.Tech Computer Science"
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
            placeholder="e.g. btech-cs"
          />
          {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-3 text-gray-500 font-semibold hover:text-gray-700">Cancel</button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white font-bold rounded-xl shadow-lg hover:bg-navy-800 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {id ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
}
