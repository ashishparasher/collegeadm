// app/admin/exams/new/page.tsx
import { ExamForm } from '@/components/admin/ExamForm';

export default function NewExamPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Add New Exam</h1>
        <p className="text-gray-500 mt-1">Create a new entrance examination entry</p>
      </div>
      <ExamForm />
    </div>
  );
}
