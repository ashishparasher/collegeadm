const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { content: { contains: '2025' } },
        { content: { contains: '2026' } },
      ],
    },
  });

  const colleges = await prisma.college.findMany({
    where: {
      OR: [
        { description: { contains: '2025' } },
        { description: { contains: '2026' } },
      ],
    },
  });

  console.log(`Found ${posts.length} posts with year-based links/text.`);
  console.log(`Found ${colleges.length} colleges with year-based links/text.`);

  // Check specifically for hrefs with years
  const postsWithLinks = posts.filter(p => p.content.includes('href="/') && (p.content.includes('-2025') || p.content.includes('-2026')));
  const collegesWithLinks = colleges.filter(c => c.description.includes('href="/') && (c.description.includes('-2025') || c.description.includes('-2026')));

  console.log(`Posts with year-based hrefs: ${postsWithLinks.length}`);
  console.log(`Colleges with year-based hrefs: ${collegesWithLinks.length}`);
  
  if (postsWithLinks.length > 0) {
    console.log('Sample post slug:', postsWithLinks[0].slug);
  }
  if (collegesWithLinks.length > 0) {
    console.log('Sample college slug:', collegesWithLinks[0].slug);
  }

  process.exit(0);
}

main();
