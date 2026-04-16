const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const post = await prisma.post.findUnique({
    where: { slug: 'complete-admission-guide-for-medical-colleges-in-bangalore-2026' },
  });

  if (post) {
    console.log('Post Content:', post.content);
  } else {
    console.log('Post not found');
  }

  process.exit(0);
}

main();
