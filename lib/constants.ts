export const SITE = {
  name: 'CollegeAdm',
  tagline: "Direct Admission In India's Top Colleges",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? 'https://collegeadm.org',
  phone: '+917707055155',
  phoneDisplay: '77070 55155',
  email: 'support@collegeadm.org',
  address: 'Bangalore, Karnataka, India',
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/colleges', label: 'Colleges' },
  { href: '/courses', label: 'Courses' },
  { href: '/exams', label: 'Exams' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_COLLEGE_LINKS = [
  { href: '/college/ms-ramaiah-medical-college', label: 'MS Ramaiah Medical College' },
  { href: '/college/rv-college-of-engineering', label: 'RV College of Engineering' },
  { href: '/college/bms', label: 'BMS College of Engineering' },
  { href: '/college/jss-medical-college-mbbs', label: 'JSS Medical College' },
  { href: '/college/pes-university', label: 'PES University' },
] as const;

export const FOOTER_COURSE_LINKS = [
  { label: 'MBBS Admission', href: '/courses/mbbs' },
  { label: 'BAMS Admission', href: '/courses/bams' },
  { label: 'B.Tech Admission', href: '/courses/btech' },
  { label: 'MBA Admission', href: '/courses/mba' },
  { label: 'BPT Admission', href: '/courses/bpt' },
] as const;

export const FOOTER_QUICK_LINKS = [
  { href: '/compare', label: 'Compare Colleges' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/search', label: 'Search' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
] as const;
