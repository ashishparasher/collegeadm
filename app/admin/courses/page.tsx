// app/admin/courses/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Pencil, Trash2, GraduationCap } from 'lucide-react';
import { deleteCourse } from './actions';

export default async function CoursesAdminPage() {
  const courses = await prisma.course.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { colleges: true } } }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Manage Courses</h1>
          <p className="text-gray-500 mt-1">Define the streams and programs offered by colleges</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-semibold rounded-xl hover:bg-navy-800 transition-all shadow-lg shadow-navy-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Colleges</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  No courses found. Click "Add Course" to get started.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <p className="font-bold text-gray-900">{course.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{course.slug}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{course._count.colleges}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/courses/edit/${course.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deleteCourse(course.id);
                      }}>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
