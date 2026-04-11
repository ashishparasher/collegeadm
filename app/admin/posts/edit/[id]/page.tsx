// app/admin/posts/edit/[id]/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { PostForm } from '@/components/admin/PostForm';

interface Props {
  params: { id: string };
}

export default async function EditPostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Edit Post</h1>
        <p className="text-gray-500 mt-1">Update details for "{post.title}"</p>
      </div>

      <PostForm initialData={post} id={post.id} />
    </div>
  );
}
