// app/api/colleges/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const college = await prisma.college.findUnique({
      where: { slug },
      include: { gallery: true },
    });
    if (!college) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(college);
  }

  const colleges = await prisma.college.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(colleges);
}

export async function POST(req: NextRequest) {
  // Simple check for auth token or similar if needed for external, 
  // but for now we'll keep it open as a standard API as requested
  const body = await req.json();
  const college = await prisma.college.create({ data: body });
  return NextResponse.json(college);
}
