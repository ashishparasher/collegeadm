import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

const MAX_WIDTH = 1200;
const QUALITY = 80;

async function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      await walkDir(filePath, callback);
    } else {
      await callback(filePath);
    }
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const fileName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  const outputFilePath = path.join(dirName, `${fileName}.webp`);

  console.log(`Optimizing: ${filePath}`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH);
    }

    await pipeline
      .webp({ quality: QUALITY })
      .toFile(outputFilePath);

    const oldSize = fs.statSync(filePath).size;
    const newSize = fs.statSync(outputFilePath).size;

    console.log(`  Done: ${newSize / 1024} KB (was ${oldSize / 1024} KB)`);

    // If the new file is created successfully, we can potentially remove the old one,
    // but for now, let's keep it and just update the code to use .webp.
    // Actually, to fully optimize and reduce payload, we should replace them.
    // I'll keep both for now to avoid breaking anything until I update the code.
  } catch (err) {
    console.error(`  Error optimizing ${filePath}: ${err.message}`);
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory not found');
    return;
  }
  await walkDir(IMAGES_DIR, optimizeImage);
  
  // Also check public/uploads if it exists
  const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
  if (fs.existsSync(UPLOADS_DIR)) {
    await walkDir(UPLOADS_DIR, optimizeImage);
  }
}

main();
