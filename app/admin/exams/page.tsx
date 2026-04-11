// app/admin/exams/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { deleteExam } from './actions';

export default async function ExamsAdminPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { colleges: true } } }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Entrance Exams</h1>
          <p className="text-gray-500 mt-1">Manage information about NEET, CET, COMEDK and others</p>
        </div>
        <Link
          href="/admin/exams/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-semibold rounded-xl hover:bg-navy-800 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Exam
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Exam Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Colleges</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {exams.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  No exams found. Click "Add Exam" to get started.
                </td>
              </tr>
            ) : (
              exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <p className="font-bold text-gray-900">{exam.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-mono">{exam.slug}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{exam._count.colleges}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/exams/edit/${exam.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deleteExam(exam.id);
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
