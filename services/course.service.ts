import { prisma } from '@/lib/prisma';

// Course data for rich content on detail pages
export const COURSE_DATA: Record<string, { duration: string; eligibility: string; career: string; icon: string }> = {
  mbbs: { duration: '5.5 years', eligibility: 'NEET UG qualified, 50% in PCB (12th)', career: 'Doctor, Surgeon, Specialist, Researcher', icon: '🩺' },
  bams: { duration: '5.5 years', eligibility: 'NEET UG qualified, 50% in PCB (12th)', career: 'Ayurvedic Doctor, Panchakarma Specialist, Researcher', icon: '🌿' },
  bds: { duration: '5 years', eligibility: 'NEET UG qualified, 50% in PCB (12th)', career: 'Dentist, Oral Surgeon, Orthodontist', icon: '🦷' },
  bhms: { duration: '5.5 years', eligibility: 'NEET UG qualified, 50% in PCB (12th)', career: 'Homeopathic Doctor, Clinic Owner', icon: '💊' },
  'bsc-nursing': { duration: '4 years', eligibility: 'NEET UG / Direct, 45% in PCB (12th)', career: 'Staff Nurse, Nursing Officer, Hospital Admin', icon: '👩‍⚕️' },
  'gnm-nursing': { duration: '3.5 years', eligibility: '40% in 12th (Science)', career: 'General Nurse, Midwife, Community Health', icon: '🏥' },
  bpt: { duration: '4.5 years', eligibility: 'NEET UG / Direct, 50% in PCB (12th)', career: 'Physiotherapist, Sports Physio, Rehab Specialist', icon: '🏃' },
  mpt: { duration: '2 years', eligibility: 'BPT degree, Entrance Exam', career: 'Senior Physiotherapist, Professor, Researcher', icon: '🦴' },
  bpharm: { duration: '4 years', eligibility: 'KCET / Direct, 45% in PCM (12th)', career: 'Pharmacist, Drug Inspector, Pharma Sales', icon: '💉' },
  'bsc-mlt': { duration: '3 years', eligibility: '45% in 12th (Science)', career: 'Lab Technician, Pathologist, Quality Control', icon: '🔬' },
  btech: { duration: '4 years', eligibility: 'KCET / COMEDK / JEE, 45% in PCM (12th)', career: 'Software Engineer, Data Scientist, IT Manager', icon: '💻' },
  mtech: { duration: '2 years', eligibility: 'GATE / PGCET, B.Tech or B.E.', career: 'R&D Engineer, Professor, Tech Lead', icon: '⚙️' },
  mba: { duration: '2 years', eligibility: 'CAT / MAT / PGCET, Any Graduate', career: 'Business Manager, Consultant, Entrepreneur', icon: '📊' },
  mca: { duration: '2 years', eligibility: 'PGCET / Direct, BCA or B.Sc CS', career: 'Software Developer, System Architect, IT Manager', icon: '🖥️' },
  'diploma-engineering': { duration: '3 years', eligibility: '10th Pass, 35% minimum', career: 'Junior Engineer, Technician, Supervisor', icon: '🔧' },
};

export async function getAllCourses() {
  return prisma.course.findMany({ include: { colleges: { select: { id: true } } }, orderBy: { name: 'asc' } });
}

export async function getCourseBySlug(slug: string) {
  return prisma.course.findUnique({ where: { slug }, include: { colleges: { include: { category: true } } } });
}

export async function getCourseCount() {
  return prisma.course.count();
}
