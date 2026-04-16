export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, MapPin, ExternalLink, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';

async function deleteCollege(id: string) {
  'use server';
  await prisma.college.delete({ where: { id } });
  revalidatePath('/admin/colleges');
}

export default async function CollegesAdminPage() {
  const colleges = await prisma.college.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-comfortaa">Manage Colleges</h1>
          <p className="text-muted-foreground mt-1">Add, edit or remove partner institutions.</p>
        </div>
        <Button asChild variant="accent">
          <Link href="/admin/colleges/new"><Plus className="w-4 h-4 mr-2" /> Add College</Link>
        </Button>
      </div>

      <div className="bg-card rounded-4xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">College</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {colleges.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">No colleges yet.</td></tr>
            ) : (
              colleges.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden relative flex-shrink-0">
                        {c.featuredImage ? (
                          <Image src={c.featuredImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')} alt="" fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><Building2 className="w-5 h-5 text-muted-foreground" /></div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm line-clamp-1">{c.name.split('|')[0].trim()}</p>
                        <p className="text-xs text-muted-foreground font-mono">{c.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="w-3 h-3" /> {c.location}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/college/${c.slug}`} target="_blank" className="p-2 text-muted-foreground hover:text-foreground transition-colors"><ExternalLink className="w-4 h-4" /></Link>
                      <Link href={`/admin/colleges/edit/${c.id}`} className="p-2 text-muted-foreground hover:text-blue-500 transition-colors"><Pencil className="w-4 h-4" /></Link>
                      <form action={async () => { 'use server'; await deleteCollege(c.id); }}>
                        <button className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
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
