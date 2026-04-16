const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  for (const post of posts) {
    if (post.content.includes('-2025') || post.content.includes('-2026')) {
      const newContent = post.content
        .replace(/(href="\/[^"]*)-2025/g, '$1')
        .replace(/(href="\/[^"]*)-2026/g, '$1');
      
      if (newContent !== post.content) {
        console.log(`Updating post: ${post.slug}`);
        await prisma.post.update({
          where: { id: post.id },
          data: { content: newContent }
        });
      }
    }
  }

  const colleges = await prisma.college.findMany();
  for (const college of colleges) {
    if (college.description.includes('-2025') || college.description.includes('-2026')) {
      const newContent = college.description
        .replace(/(href="\/[^"]*)-2025/g, '$1')
        .replace(/(href="\/[^"]*)-2026/g, '$1');
      
      if (newContent !== college.description) {
        console.log(`Updating college: ${college.slug}`);
        await prisma.college.update({
          where: { id: college.id },
          data: { description: newContent }
        });
      }
    }
  }

  process.exit(0);
}

main();
