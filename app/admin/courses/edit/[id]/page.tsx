// app/admin/courses/edit/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CourseForm } from '@/components/admin/CourseForm';

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Edit Course</h1>
        <p className="text-gray-500 mt-1">Update details for {course.name}</p>
      </div>
      <CourseForm initialData={course} id={course.id} />
    </div>
  );
}
