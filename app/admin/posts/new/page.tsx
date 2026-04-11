// app/admin/posts/new/page.tsx
import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">New Blog Post</h1>
        <p className="text-gray-500 mt-1">Create a new admission guide or news article</p>
      </div>

      <PostForm />
    </div>
  );
}
