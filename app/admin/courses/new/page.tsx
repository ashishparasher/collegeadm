// app/admin/courses/new/page.tsx
import { CourseForm } from '@/components/admin/CourseForm';

export default function NewCoursePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Add New Course</h1>
        <p className="text-gray-500 mt-1">Create a new stream or program category</p>
      </div>
      <CourseForm />
    </div>
  );
}
