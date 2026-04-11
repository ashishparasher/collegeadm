// app/admin/media/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { ImageIcon, Trash2, ExternalLink, HardDrive } from 'lucide-react';

export default async function MediaAdminPage() {
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  let files: string[] = [];

  try {
    const allFiles = await fs.readdir(uploadDir);
    files = allFiles.filter(f => !f.startsWith('.'));
  } catch (e) {
    // Directory might not exist yet
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-comfortaa">Media Library</h1>
          <p className="text-gray-500 mt-1">Manage your uploaded images and assets</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
          <HardDrive className="w-4 h-4" />
          <span className="text-xs font-bold">{files.length} Files Uploaded</span>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No media found</h3>
          <p className="text-gray-500 text-sm mt-1">Images uploaded via colleges or posts will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {files.map((file) => (
            <div key={file} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <Image 
                  src={`/uploads/${file}`} 
                  alt={file}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a 
                    href={`/uploads/${file}`} 
                    target="_blank" 
                    aria-label={`View ${file} in new tab`}
                    className="p-2 bg-white rounded-lg text-navy hover:text-orange-500 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-mono text-gray-400 truncate" title={file}>
                  {file}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
