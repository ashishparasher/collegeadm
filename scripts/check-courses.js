const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany();
  console.log('Courses:', JSON.stringify(courses, null, 2));
  process.exit(0);
}

main();
