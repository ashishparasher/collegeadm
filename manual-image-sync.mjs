import fs from 'fs';
import path from 'path';

const bundlePath = 'public/data/migration_bundle.json';
const bundleData = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
const wpUploadsDir = '/home/tuf/my-website/wp-content/uploads';
const publicImagesDir = 'public/images';

const collegesDir = path.join(publicImagesDir, 'colleges');
if (!fs.existsSync(collegesDir)) fs.mkdirSync(collegesDir, { recursive: true });

// Known mapping for missing colleges based on our manual search
const MANUAL_MAP = {
  'sri-sri-college-of-ayurvedic-science-direct-admission-2025': 'Sri-Sri-College-of-Ayurvedic-Science-Research-Hospital-Bangalore.jpg',
  'top-medical-colleges-in-india-sushrutha-bams-admission-2025': 'Sushrutha-Campus-scaled-1.jpg',
  'sdm-ayurveda-college-bangalore': 'SDM-Ayurvedic-College.jpeg',
  'kle-jnmc-mbbs-admission-2025': 'jnmc_belagavi.jpg',
  'ms-ramaiah-medical-college-admission-2025': 'ms-ramaiah-medical-college-1.jpg',
  'dayananda-sagar-college-of-engineering-admission-2025': 'Dayananda_Sagar_College_of_Engineering71.jpg',
  'pes-university-bangalore-admission-2025': 'pes-university.jpg',
  'rv-college-of-engineering-admission-2025': 'RV.jpg',
  'msrit-admission-2025': 'msrit-1024x500.jpg', // we might need to check this one
  'ms-ramaiah-institute-of-technology-admission-2025': 'highcompress-msrit-1024x500-1.jpg',
  'bms-bangalore-admission-2025': 'unnamed.webp', // BMS CE often unnamed in imports
  'amc-bangalore-admission-2025': 'AMC-College.jpeg',
  'vydehi-institute-of-medical-sciences-mbbs-admission-2025': 'Vydehi-Institute-of-Medical-Sciences-1.webp',
  'vydehi-institute-of-physiotherapy-admission': 'vydehi-institute-of-medical-sciences-and-research-centre-whitefield-bangalore-private-hospitals-p1a0clcf3q.png',
  'sduaher-kolar-mbbs-admission-2025': 'DEV-RAJ-Medical.webp',
  'jss-medical-college-mbbs-admission-2025': 'J.S.S.-Medical-College-8-compress.webp',
  'ms-ramaiah-medical-college-physiotherapy-admission-2025': 'MS-Ramaiah-Medical-College-Physiotherapy-Admission-2025.webp',
  'dayananda-sagar-college-of-physiotherapy-bangalore': 'Dayananda_Sagar_College_of_Physio.png',
  'hillside-ayurvedic-medical-college-bangalore-direct-admission-2025': 'Hill-Side-Ayurvedic-college.jpg',
  'sri-kalabyraveshwara-ayurveda-college-bangalore-direct-admission-2025': 'Ayurveda.png'
};

function findFile(fileName) {
  const possiblePaths = [
    path.join(wpUploadsDir, '2025/06', fileName),
    path.join(wpUploadsDir, '2026/06', fileName),
    path.join(wpUploadsDir, fileName),
    path.join(wpUploadsDir, 'college-images', fileName)
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.statSync(p).size > 1000) {
      return p;
    }
  }
  return null;
}

bundleData.content.forEach((item) => {
  if (item.type === 'listivo_listing') {
    const fileName = MANUAL_MAP[item.slug];
    if (fileName) {
      const srcPath = findFile(fileName);
      if (srcPath) {
        fs.copyFileSync(srcPath, path.join(collegesDir, fileName));
        item.featured_image = `/images/colleges/${fileName}`;
        console.log(`Matched ${item.slug} -> ${fileName} (Size: ${fs.statSync(srcPath).size})`);
      } else {
        console.log(`File not found for ${item.slug}: ${fileName}`);
        // Fallback to placeholder if not found
        item.featured_image = '/images/placeholder-college.jpg';
      }
    } else {
       // Check if already has a valid one
       if (item.featured_image && item.featured_image.startsWith('/images/colleges/')) {
         const currentFile = path.join(publicImagesDir, 'colleges', path.basename(item.featured_image));
         if (!fs.existsSync(currentFile) || fs.statSync(currentFile).size < 1000) {
            item.featured_image = '/images/placeholder-college.jpg';
         }
       } else {
         item.featured_image = '/images/placeholder-college.jpg';
       }
    }
  }
});

fs.writeFileSync(bundlePath, JSON.stringify(bundleData, null, 2));
console.log('Manual image mapping and validation completed.');
