// components/admin/PostForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createPost, updatePost } from '@/app/admin/posts/actions';
import { Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';

const PostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type PostFormData = z.infer<typeof PostSchema>;

interface PostFormProps {
  initialData?: any;
  id?: string;
}

export function PostForm({ initialData, id }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      ImageExtension,
    ],
    content: initialData?.content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && initialData?.content && !editor.isFocused) {
      editor.commands.setContent(initialData.content);
    }
  }, [editor, initialData?.content]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      content: '',
      featuredImage: '',
      metaTitle: '',
      metaDescription: '',
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setLoading(true);
    try {
      if (id) {
        await updatePost(id, data);
      } else {
        await createPost(data);
      }
      router.push('/admin/posts');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error saving post');
    } finally {
      setLoading(false);
    }
  };

  const title = watch('title');
  const generateSlug = () => {
    if (title) {
      setValue('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Post Title</label>
              <input
                {...register('title')}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all text-lg font-bold"
                placeholder="Enter a catchy title..."
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex justify-between">
                Slug
                <button type="button" onClick={generateSlug} className="text-xs text-navy hover:text-orange-500 font-bold">Auto-generate</button>
              </label>
              <input
                {...register('slug')}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all font-mono text-sm"
                placeholder="post-url-slug"
              />
              {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Content</label>
              <div className="border border-gray-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-navy transition-all">
                {/* Basic Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 text-xs font-bold ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                  >B</button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 text-xs italic ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                  >I</button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 text-xs font-bold ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                  >H2</button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 text-xs ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                  >List</button>
                </div>
                <EditorContent editor={editor} className="p-4 min-h-[400px] prose prose-sm max-w-none focus:outline-none" />
              </div>
              <input type="hidden" {...register('content')} />
              {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">Publish Details</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Featured Image</label>
              <div className="aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 overflow-hidden relative group">
                {watch('featuredImage') ? (
                  <img src={watch('featuredImage')} className="w-full h-full object-cover" alt="" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs">No image selected</span>
                  </>
                )}
                <button type="button" className="absolute inset-0 bg-navy/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold">
                  Change Image
                </button>
              </div>
              <input
                {...register('featuredImage')}
                className="w-full mt-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none"
                placeholder="Image URL..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {id ? 'Update Post' : 'Publish Post'}
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">SEO Settings</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Meta Title</label>
              <input
                {...register('metaTitle')}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
                placeholder="SEO Title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Meta Description</label>
              <textarea
                {...register('metaDescription')}
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none resize-none"
                placeholder="Brief summary for search engines..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
