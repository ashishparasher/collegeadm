import fs from 'fs';
import path from 'path';

const bundlePath = 'public/data/migration_bundle.json';
const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
const wpUploadsDir = '/home/tuf/my-website/wp-content/uploads';
const publicImagesDir = 'public/images';

const collegesDir = path.join(publicImagesDir, 'colleges');
if (!fs.existsSync(collegesDir)) fs.mkdirSync(collegesDir, { recursive: true });

// Helper to find best matching image in WordPress
function findBestImage(listingSlug) {
  // 1. Try college-images folder first (they seem to have the best names)
  const collegeImagesDir = path.join(wpUploadsDir, 'college-images');
  if (fs.existsSync(collegeImagesDir)) {
    const files = fs.readdirSync(collegeImagesDir);
    const slugBase = listingSlug.split('-admission')[0].split('-direct')[0];
    
    // Exact match
    let match = files.find(f => f.startsWith(slugBase));
    if (match) return path.join(collegeImagesDir, match);

    // Partial match
    const keywords = slugBase.split('-').filter(k => k.length > 3);
    match = files.find(f => keywords.every(k => f.toLowerCase().includes(k)));
    if (match) return path.join(collegeImagesDir, match);
  }

  // 2. Fallback to common directories
  const commonDirs = [
    path.join(wpUploadsDir, '2025/06'),
    path.join(wpUploadsDir, '2026/06'),
    wpUploadsDir
  ];

  for (const dir of commonDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    const slugBase = listingSlug.split('-admission')[0].split('-direct')[0];
    const keywords = slugBase.split('-').filter(k => k.length > 3);
    
    const match = files.find(f => keywords.every(k => f.toLowerCase().includes(k)) && !f.includes('-100x100') && !f.includes('-150x150'));
    if (match) return path.join(dir, match);
  }

  return null;
}

bundleData.content.forEach((item) => {
  if (item.type === 'listivo_listing') {
    const bestImage = findBestImage(item.slug);
    if (bestImage) {
      const fileName = path.basename(bestImage);
      fs.copyFileSync(bestImage, path.join(collegesDir, fileName));
      item.featured_image = `/images/colleges/${fileName}`;
      console.log(`Matched ${item.slug} -> ${fileName}`);
    } else {
      console.log(`No match found for ${item.slug}`);
    }
  }
});

fs.writeFileSync(bundlePath, JSON.stringify(bundleData, null, 2));
console.log('Fuzzy image matching completed.');
