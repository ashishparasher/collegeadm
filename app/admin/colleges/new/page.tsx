// app/admin/colleges/new/page.tsx
import { CollegeForm } from '@/components/admin/CollegeForm';

export default function NewCollegePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Add New College</h1>
        <p className="text-gray-500 mt-1">Create a new partner institution listing</p>
      </div>

      <CollegeForm />
    </div>
  );
}
