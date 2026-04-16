import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, Trash2 } from 'lucide-react';

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, include: { category: true } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-comfortaa font-bold text-2xl text-foreground">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">{posts.length} posts</p>
        </div>
      </div>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead><tr className="bg-muted/50 border-b border-border">
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Title</th>
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
            <th className="px-5 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground max-w-xs truncate">{post.title.split('|')[0].trim()}</td>
                <td className="px-5 py-3.5"><Badge variant="secondary" className="text-[10px]">{post.category?.name || 'Uncategorized'}</Badge></td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-1"><ExternalLink className="w-3 h-3" /> View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
