const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Categories ──────────────────────────────
  const categories = [
    { name: 'Medical', slug: 'medical' },
    { name: 'Engineering', slug: 'engineering' },
    { name: 'Management', slug: 'management' },
    { name: 'Paramedical', slug: 'paramedical' },
    { name: 'Nursing', slug: 'nursing' },
    { name: 'Ayurveda', slug: 'ayurveda' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }
  console.log(`✅ ${categories.length} categories`);

  // ── Courses ─────────────────────────────────
  const courses = [
    { name: 'MBBS', slug: 'mbbs' },
    { name: 'BAMS', slug: 'bams' },
    { name: 'BDS', slug: 'bds' },
    { name: 'BHMS', slug: 'bhms' },
    { name: 'B.Sc Nursing', slug: 'bsc-nursing' },
    { name: 'GNM Nursing', slug: 'gnm-nursing' },
    { name: 'BPT (Physiotherapy)', slug: 'bpt' },
    { name: 'MPT (Physiotherapy)', slug: 'mpt' },
    { name: 'B.Pharm', slug: 'bpharm' },
    { name: 'B.Sc MLT', slug: 'bsc-mlt' },
    { name: 'B.Tech', slug: 'btech' },
    { name: 'M.Tech', slug: 'mtech' },
    { name: 'MBA', slug: 'mba' },
    { name: 'MCA', slug: 'mca' },
    { name: 'Diploma Engineering', slug: 'diploma-engineering' },
  ];

  for (const course of courses) {
    await prisma.course.upsert({ where: { slug: course.slug }, update: {}, create: course });
  }
  console.log(`✅ ${courses.length} courses`);

  // ── Exams ───────────────────────────────────
  const exams = [
    { name: 'NEET UG', slug: 'neet-ug', description: 'National Eligibility cum Entrance Test for undergraduate medical admissions (MBBS, BDS, BAMS, BHMS, B.Sc Nursing).' },
    { name: 'KCET', slug: 'kcet', description: 'Karnataka Common Entrance Test for admission to engineering, pharmacy, and agriculture courses in Karnataka.' },
    { name: 'COMEDK UGET', slug: 'comedk', description: 'Consortium of Medical, Engineering and Dental Colleges of Karnataka entrance exam for private institutions.' },
    { name: 'CAT', slug: 'cat', description: 'Common Admission Test for MBA/PGDM programs in IIMs and other top business schools.' },
    { name: 'MAT', slug: 'mat', description: 'Management Aptitude Test conducted by AIMA for MBA/PGDM admissions.' },
    { name: 'GATE', slug: 'gate', description: 'Graduate Aptitude Test in Engineering for M.Tech/PhD admissions and PSU recruitment.' },
    { name: 'Karnataka PGCET', slug: 'karnataka-pgcet', description: 'Post Graduate Common Entrance Test for MBA, MCA, M.Tech admissions in Karnataka.' },
    { name: 'RGUHS Exams', slug: 'rguhs', description: 'Rajiv Gandhi University of Health Sciences conducts exams for medical and allied health science courses in Karnataka.' },
  ];

  for (const exam of exams) {
    await prisma.exam.upsert({ where: { slug: exam.slug }, update: {}, create: exam });
  }
  console.log(`✅ ${exams.length} exams`);

  // ── Scholarships ────────────────────────────
  const scholarships = [
    { name: 'Karnataka State Merit Scholarship', slug: 'karnataka-merit', description: 'Merit-based scholarship for top-performing students in Karnataka state board exams.', amount: 'Up to ₹50,000/year', eligibility: 'Karnataka domicile, 85%+ in 12th' },
    { name: 'OBC/SC/ST Fee Concession', slug: 'obc-sc-st-concession', description: 'Government fee concession for students from OBC, SC, and ST categories in Karnataka.', amount: 'Up to 100% fee waiver', eligibility: 'Valid caste certificate, Karnataka domicile' },
    { name: 'Management Quota Scholarship', slug: 'management-scholarship', description: 'Partial scholarships offered by private colleges for management quota admissions based on entrance exam performance.', amount: '10-30% fee reduction', eligibility: 'NEET/KCET/COMEDK score' },
    { name: 'Sports Achievement Scholarship', slug: 'sports-scholarship', description: 'Scholarship for students with state/national level sports achievements.', amount: 'Up to ₹1,00,000/year', eligibility: 'State or national level sports certification' },
    { name: 'NEET Score Based Scholarship', slug: 'neet-scholarship', description: 'Special scholarship for students scoring above certain percentile in NEET UG.', amount: '₹25,000 - ₹2,00,000/year', eligibility: 'NEET score above 500' },
  ];

  for (const s of scholarships) {
    await prisma.scholarship.upsert({ where: { slug: s.slug }, update: {}, create: s });
  }
  console.log(`✅ ${scholarships.length} scholarships`);

  // ── Link Courses & Exams to Colleges ────────
  const allColleges = await prisma.college.findMany({ select: { id: true, name: true, slug: true } });
  const allCourses = await prisma.course.findMany();
  const allExams = await prisma.exam.findMany();
  const allCategories = await prisma.category.findMany();

  const courseMap = Object.fromEntries(allCourses.map((c: any) => [c.slug, c.id]));
  const examMap = Object.fromEntries(allExams.map((e: any) => [e.slug, e.id]));
  const catMap = Object.fromEntries(allCategories.map((c: any) => [c.slug, c.id]));

  // Mapping rules based on college names/slugs
  for (const college of allColleges) {
    const name = college.name.toLowerCase();
    const slug = college.slug.toLowerCase();
    const linkedCourses: string[] = [];
    const linkedExams: string[] = [];
    let categorySlug = 'medical'; // default

    // Course linking based on college name patterns
    if (name.includes('ayurved') || name.includes('bams')) {
      linkedCourses.push('bams');
      linkedExams.push('neet-ug', 'rguhs');
      categorySlug = 'ayurveda';
    }
    if (name.includes('medical') || name.includes('mbbs')) {
      linkedCourses.push('mbbs', 'bds');
      linkedExams.push('neet-ug', 'kcet', 'rguhs');
      categorySlug = 'medical';
    }
    if (name.includes('engineering') || name.includes('bms') || name.includes('rvce') || name.includes('rv college') || name.includes('pes') || name.includes('btech') || slug.includes('engineering')) {
      linkedCourses.push('btech', 'mtech');
      linkedExams.push('kcet', 'comedk', 'gate');
      categorySlug = 'engineering';
    }
    if (name.includes('nursing')) {
      linkedCourses.push('bsc-nursing', 'gnm-nursing');
      linkedExams.push('neet-ug', 'rguhs');
      categorySlug = 'nursing';
    }
    if (name.includes('physiotherapy') || name.includes('bpt')) {
      linkedCourses.push('bpt', 'mpt');
      linkedExams.push('neet-ug', 'rguhs');
      categorySlug = 'paramedical';
    }
    if (name.includes('pharmacy') || name.includes('pharm')) {
      linkedCourses.push('bpharm');
      linkedExams.push('kcet', 'rguhs');
      categorySlug = 'paramedical';
    }
    if (name.includes('management') || name.includes('mba') || name.includes('business')) {
      linkedCourses.push('mba', 'mca');
      linkedExams.push('cat', 'mat', 'karnataka-pgcet');
      categorySlug = 'management';
    }
    if (name.includes('homeopath') || name.includes('bhms')) {
      linkedCourses.push('bhms');
      linkedExams.push('neet-ug', 'rguhs');
      categorySlug = 'medical';
    }
    // If nothing matched, give generic medical courses
    if (linkedCourses.length === 0) {
      linkedCourses.push('bams', 'bpt');
      linkedExams.push('neet-ug', 'rguhs');
    }

    // Connect courses
    const courseIds = Array.from(new Set(linkedCourses)).filter(s => courseMap[s]).map(s => ({ id: courseMap[s] }));
    if (courseIds.length > 0) {
      await prisma.college.update({ where: { id: college.id }, data: { courses: { connect: courseIds } } });
    }

    // Connect exams
    const examIds = Array.from(new Set(linkedExams)).filter(s => examMap[s]).map(s => ({ id: examMap[s] }));
    if (examIds.length > 0) {
      await prisma.college.update({ where: { id: college.id }, data: { exams: { connect: examIds } } });
    }

    // Set category
    if (catMap[categorySlug]) {
      await prisma.college.update({ where: { id: college.id }, data: { categoryId: catMap[categorySlug] } });
    }

    console.log(`  → ${college.slug}: ${linkedCourses.join(', ')} | ${linkedExams.join(', ')} | ${categorySlug}`);
  }

  console.log(`✅ Linked courses & exams to ${allColleges.length} colleges`);
  console.log('🎉 Seed complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
