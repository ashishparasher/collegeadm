import { prisma } from '@/lib/prisma';

export async function createLead(data: {
  name: string;
  email: string;
  phone: string;
  message?: string;
  collegeInterest?: string;
  collegeId?: string;
}) {
  return prisma.lead.create({ data });
}

export async function getAllLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { college: true },
  });
}

export async function getLeadCount() {
  return prisma.lead.count();
}

export async function getLeadsCsv() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { college: true },
  });

  const header = 'Name,Email,Phone,College Interest,Message,Date\n';
  const rows = leads.map(l =>
    `"${l.name}","${l.email}","${l.phone}","${l.college?.name || l.collegeInterest || ''}","${l.message || ''}","${l.createdAt.toISOString()}"`
  ).join('\n');

  return header + rows;
}
