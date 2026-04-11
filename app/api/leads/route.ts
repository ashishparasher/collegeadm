// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const LeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone is required'),
  message: z.string().optional(),
  collegeInterest: z.string().optional(),
  collegeId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data,
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Lead error:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}

export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { college: true },
  });
  return NextResponse.json(leads);
}
