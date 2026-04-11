// app/admin/colleges/edit/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CollegeForm } from '@/components/admin/CollegeForm';

interface Props {
  params: { id: string };
}

export default async function EditCollegePage({ params }: Props) {
  const college = await prisma.college.findUnique({
    where: { id: params.id },
  });

  if (!college) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Edit College</h1>
        <p className="text-gray-500 mt-1">Update details for {college.name}</p>
      </div>

      <CollegeForm initialData={college} id={college.id} />
    </div>
  );
}
