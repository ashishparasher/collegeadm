const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function shorten(slug) {
  // 1. Evergreen - remove years
  let newSlug = slug.replace(/-202[567]/g, '');

  // 2. Shorten words
  newSlug = newSlug
    .replace(/-admission/g, '')
    .replace(/-bangalore/g, '')
    .replace(/-karnataka/g, '')
    .replace(/-fees/g, '')
    .replace(/-cutoff/g, '')
    .replace(/-direct/g, '')
    .replace(/-seats/g, '')
    .replace(/-support/g, '');

  // 3. Max length 60
  if (newSlug.length > 60) {
    newSlug = newSlug.substring(0, 60).replace(/-$/, '');
  }

  return newSlug;
}

async function main() {
  console.log('--- Shortening College Slugs ---');
  const colleges = await prisma.college.findMany();
  for (const c of colleges) {
    const newSlug = shorten(c.slug);
    if (newSlug !== c.slug) {
      console.log(`Update College: ${c.slug} -> ${newSlug}`);
      try {
        await prisma.college.update({
          where: { id: c.id },
          data: { slug: newSlug }
        });
      } catch (err) {
        console.error(`Failed to update college ${c.slug}: ${err.message}`);
      }
    }
  }

  console.log('--- Shortening Post Slugs ---');
  const posts = await prisma.post.findMany();
  for (const p of posts) {
    const newSlug = shorten(p.slug);
    if (newSlug !== p.slug) {
      console.log(`Update Post: ${p.slug} -> ${newSlug}`);
      try {
        await prisma.post.update({
          where: { id: p.id },
          data: { slug: newSlug }
        });
      } catch (err) {
        console.error(`Failed to update post ${p.slug}: ${err.message}`);
      }
    }
  }

  process.exit(0);
}

main();
