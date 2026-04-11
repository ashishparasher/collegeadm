import fs from 'fs';
import path from 'path';

const bundlePath = 'public/data/migration_bundle.json';
const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
const wpUploadsDir = '/home/tuf/my-website/wp-content/uploads';
const publicImagesDir = 'public/images';

bundleData.content.forEach((item) => {
  const isCollege = item.type === 'listivo_listing';
  const targetSubDir = isCollege ? 'colleges' : 'blog';
  const targetDir = path.join(publicImagesDir, targetSubDir);
  
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // 1. Fix featured_image
  if (item.featured_image) {
    const fileName = path.basename(item.featured_image);
    // Find where this file might be in WP uploads
    // We'll do a recursive search or check 2025/06 and 2026/06 since those seemed common
    const possiblePaths = [
      path.join(wpUploadsDir, '2025/06', fileName),
      path.join(wpUploadsDir, '2026/06', fileName),
      path.join(wpUploadsDir, 'college-images', fileName),
      path.join(wpUploadsDir, fileName)
    ];

    let found = false;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        fs.copyFileSync(p, path.join(targetDir, fileName));
        found = true;
        break;
      }
    }
    
    // If still not found, try a broader search if it's important, 
    // but let's at least ensure the bundle path is correct
    item.featured_image = `/images/${targetSubDir}/${fileName}`;
  }

  // 2. Fix content images
  if (item.content) {
     // Match both localhost and relative wp-content paths
     const imgRegex = /(?:http:\/\/localhost:8080\/wp-content\/uploads\/|wp-content\/uploads\/)([^"'>\s]+)/gi;
     item.content = item.content.replace(imgRegex, (match, relPath) => {
        const fileName = path.basename(relPath);
        const srcPath = path.join(wpUploadsDir, relPath);
        
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, path.join(targetDir, fileName));
        }
        return `/images/${targetSubDir}/${fileName}`;
     });
     
     // Also catch any already broken /images/blog/ paths for colleges
     if (isCollege) {
        item.content = item.content.replace(/\/images\/blog\/([^"'>\s]+)/gi, (match, fileName) => {
           const oldPath = path.join(publicImagesDir, 'blog', fileName);
           const newPath = path.join(publicImagesDir, 'colleges', fileName);
           if (fs.existsSync(oldPath)) {
             fs.copyFileSync(oldPath, newPath);
           }
           return `/images/colleges/${fileName}`;
        });
     }
  }
});

fs.writeFileSync(bundlePath, JSON.stringify(bundleData, null, 2));
console.log('Images sync completed.');
