import fs from 'fs';
import path from 'path';

const bundlePath = 'public/data/migration_bundle.json';
const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
const publicImagesDir = 'public/images';

// Ensure directories exist
const collegesDir = path.join(publicImagesDir, 'colleges');
const blogDir = path.join(publicImagesDir, 'blog');
if (!fs.existsSync(collegesDir)) fs.mkdirSync(collegesDir, { recursive: true });
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

// Move files from blog/ back to their respective places if needed, 
// but easier to just check where they are in the bundle.

bundleData.content.forEach((item) => {
  const isCollege = item.type === 'listivo_listing';
  const targetSubDir = isCollege ? 'colleges' : 'blog';
  
  if (item.featured_image) {
    const fileName = path.basename(item.featured_image);
    const oldPath = path.join(publicImagesDir, 'blog', fileName);
    const newPath = path.join(publicImagesDir, targetSubDir, fileName);
    
    if (fs.existsSync(oldPath)) {
      if (oldPath !== newPath) {
        fs.renameSync(oldPath, newPath);
      }
      item.featured_image = `/images/${targetSubDir}/${fileName}`;
    }
  }

  // Content image replacement
  if (item.content) {
    item.content = item.content.replace(/\/images\/blog\/([^"'>\s]+)/gi, (match, fileName) => {
       const oldPath = path.join(publicImagesDir, 'blog', fileName);
       const newPath = path.join(publicImagesDir, targetSubDir, fileName);
       if (fs.existsSync(oldPath) && oldPath !== newPath) {
         // This might be tricky if an image is used in both, but usually it's fine
         // We'll copy instead of rename for content images if we aren't sure
         fs.copyFileSync(oldPath, newPath);
       }
       return `/images/${targetSubDir}/${fileName}`;
    });
  }
});

fs.writeFileSync(bundlePath, JSON.stringify(bundleData, null, 2));
console.log('Images reorganized and bundle updated.');
