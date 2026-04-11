import fs from 'fs';
import path from 'path';

const bundlePath = 'public/data/migration_bundle.json';
const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
const wpUploadsDir = '/home/tuf/my-website/wp-content/uploads';
const publicImagesDir = 'public/images';

bundleData.content.forEach((item) => {
  let isCollege = item.type === 'listivo_listing';
  let targetDirName = isCollege ? 'colleges' : 'blog';
  
  // Extract the first image as featured image
  const imgMatch = item.content?.match(/<img[^>]+src=['"]([^'"]+)['"]/i);
  if (imgMatch) {
    let src = imgMatch[1];
    let decodedSrc = decodeURIComponent(src); // e.g. /wp-content/uploads/2025/06/AMC-College.jpeg
    
    // Find file locally
    let srcPath = decodedSrc.replace('/wp-content/uploads', wpUploadsDir);
    if (!srcPath.startsWith(wpUploadsDir)) {
      srcPath = path.join(wpUploadsDir, srcPath.split('/uploads/').pop() || '');
    }

    let fileName = path.basename(srcPath);
    let destPath = path.join(publicImagesDir, targetDirName, fileName);
    
    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(path.join(publicImagesDir, targetDirName))) {
         fs.mkdirSync(path.join(publicImagesDir, targetDirName), {recursive: true});
      }
      fs.copyFileSync(srcPath, destPath);
    }
    
    item.featured_image = `/images/${targetDirName}/${fileName}`;
  }

  // Rewrite all image tags in content
  item.content = item.content?.replace(/<img[^>]+src=['"]([^'"]+)['"]/gi, (match, src) => {
    let decodedSrc = decodeURIComponent(src);
    let srcPath = decodedSrc.replace('/wp-content/uploads', wpUploadsDir);
    let fileName = path.basename(srcPath);
    let destPath = path.join(publicImagesDir, targetDirName, fileName);
    
    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(path.join(publicImagesDir, targetDirName))) {
         fs.mkdirSync(path.join(publicImagesDir, targetDirName), {recursive: true});
      }
      fs.copyFileSync(srcPath, destPath);
      return match.replace(src, `/images/${targetDirName}/${fileName}`);
    }
    return match;
  });

  // Task 2: Rewrite broken links
  item.content = item.content?.replace(/href=['"]([^'"]+)['"]/gi, (match, href) => {
    let decodedHref = decodeURIComponent(href);
    if (decodedHref.includes('/college/') || decodedHref.includes('collegeadm.org/')) {
        let slugMatch = decodedHref.match(/collegeadm\.org\/([^\/]+)/) || decodedHref.match(/\/college\/([^\/]+)/);
        if (slugMatch) {
            let slug = slugMatch[1].replace('-admission-2026', '').replace(/-?admission-2026/, '');
            // Let's just point to /colleges/slug
            return match.replace(href, `/colleges/${slug}`);
        }
    }
    if (decodedHref.includes('/?p=') || decodedHref.includes('/blog/')) {
        let pMatch = decodedHref.match(/\/\?p=(\d+)/) || decodedHref.match(/\/blog\/([^\/]+)/);
        if (pMatch) {
            let idOrSlug = pMatch[1];
            return match.replace(href, `/blog/${idOrSlug}`);
        }
    }
    return match;
  });
});

fs.writeFileSync(bundlePath, JSON.stringify(bundleData, null, 2));
console.log('Migration data processed, links rewritten, images copied and mapped.');
