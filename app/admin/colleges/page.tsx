// app/admin/colleges/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, MapPin, ExternalLink, Building2 } from 'lucide-react';
import { deleteCollege } from './actions';

export default async function CollegesAdminPage() {
  const colleges = await prisma.college.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Manage Colleges</h1>
          <p className="text-gray-500 mt-1">Add, edit or remove partner institutions</p>
        </div>
        <Link
          href="/admin/colleges/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-semibold rounded-xl hover:bg-navy-800 transition-all shadow-lg shadow-navy-500/20"
        >
          <Plus className="w-5 h-5" />
          Add College
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">College Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Leads</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {colleges.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  No colleges found. Click "Add College" to create your first listing.
                </td>
              </tr>
            ) : (
              colleges.map((college) => (
                <tr key={college.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                        {college.featuredImage ? (
                          <Image 
                            src={college.featuredImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')} 
                            alt="" 
                            fill
                            className="object-cover" 
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Building2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{college.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{college.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {college.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">0</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/colleges/${college.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-navy transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/colleges/edit/${college.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      {/* Delete is a bit more complex, we'll use a client component for it later or simple form */}
                      <form action={async () => {
                        'use server';
                        await deleteCollege(college.id);
                      }}>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
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
