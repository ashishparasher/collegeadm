export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import Link from 'next/link';
import { getAllLeads } from '@/services/lead.service';
import { formatDate } from '@/lib/utils';
import { Mail, Phone, Calendar, Building2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function LeadsAdminPage() {
  const leads = await getAllLeads();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-comfortaa">Student Enquiries</h1>
          <p className="text-muted-foreground mt-1">Manage and track admission leads.</p>
        </div>
        <Button asChild variant="outline">
          <a href="/api/export/leads" download><Download className="w-4 h-4 mr-2" /> Export CSV</a>
        </Button>
      </div>

      <div className="bg-card rounded-4xl border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Interested In</th>
              <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No leads yet.</td></tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground">{lead.name}</p>
                    {lead.message && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 italic">"{lead.message}"</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {lead.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {lead.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                      <Building2 className="w-3.5 h-3.5" />
                      {(lead as any).college?.name?.split('|')[0]?.trim() || lead.collegeInterest || 'General Enquiry'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" /> {formatDate(lead.createdAt.toISOString())}
                    </span>
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
