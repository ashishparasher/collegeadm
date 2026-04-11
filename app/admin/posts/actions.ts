// app/admin/posts/actions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export async function createPost(data: z.infer<typeof PostSchema>) {
  const post = await prisma.post.create({
    data,
  });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  return post;
}

export async function updatePost(id: string, data: z.infer<typeof PostSchema>) {
  const post = await prisma.post.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/posts');
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath('/blog');
  return post;
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: { id },
  });
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
}
