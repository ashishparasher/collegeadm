// prisma/import-data.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const bundlePath = path.join(process.cwd(), 'public/data/migration_bundle.json');
  if (!fs.existsSync(bundlePath)) {
    console.error('Migration bundle not found!');
    return;
  }

  const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
  
  console.log('Starting import...');

  for (const item of bundle.content) {
    if (item.type === 'listivo_listing') {
      // Import College
      await prisma.college.upsert({
        where: { slug: item.slug },
        update: {},
        create: {
          name: item.title,
          slug: item.slug,
          location: item.city || 'Bangalore, Karnataka',
          description: item.content || '',
          featuredImage: item.featured_image || null,
          fees: 'Contact for Fees',
          ranking: item.collegeType || 'Partner College',
        },
      });
      console.log(`Imported College: ${item.title}`);
    } else if (item.type === 'post') {
      // Import Post
      await prisma.post.upsert({
        where: { slug: item.slug },
        update: {},
        create: {
          title: item.title,
          slug: item.slug,
          content: item.content || '',
          featuredImage: item.featured_image || null,
          metaTitle: item.seo?.title || item.title,
          metaDescription: item.seo?.description || '',
          createdAt: new Date(item.date),
        },
      });
      console.log(`Imported Post: ${item.title}`);
    }
  }

  console.log('Import completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
