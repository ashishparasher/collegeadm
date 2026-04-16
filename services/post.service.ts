import { prisma } from '@/lib/prisma';

function format(p: any) {
  return {
    ...p,
    date: p.createdAt.toISOString(),
    seo: {
      title: p.metaTitle || p.title,
      description: p.metaDescription || '',
    },
  };
}

export async function getRecentPosts(take = 6) {
  const raw = await prisma.post.findMany({ take, orderBy: { createdAt: 'desc' } });
  return raw.map(format);
}

export async function getAllPosts() {
  const raw = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return raw.map(format);
}

export async function getPostBySlug(slug: string) {
  const p = await prisma.post.findUnique({ where: { slug } });
  if (!p) return null;
  return format(p);
}

export async function getRelatedPosts(excludeId: string, take = 3) {
  const raw = await prisma.post.findMany({
    where: { id: { not: excludeId } },
    take,
    orderBy: { createdAt: 'desc' },
  });
  return raw.map(format);
}

export async function getAllPostSlugs() {
  return prisma.post.findMany({ select: { slug: true } });
}

export async function getPostCount() {
  return prisma.post.count();
}
