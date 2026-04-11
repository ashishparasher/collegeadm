// app/admin/posts/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Calendar, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { deletePost } from './actions';

export default async function PostsAdminPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Blog Posts</h1>
          <p className="text-gray-500 mt-1">Write and manage admission guides</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white font-semibold rounded-xl hover:bg-navy-800 transition-all shadow-lg shadow-navy-500/20"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Post Title</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
                  No posts found. Start by creating an admission guide.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {post.featuredImage ? (
                          <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            <Calendar className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                        <p className="text-xs text-gray-400 font-mono">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{formatDate(post.createdAt.toISOString())}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-navy transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <form action={async () => {
                        'use server';
                        await deletePost(post.id);
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
