// lib/templates.ts

import { truncate, stripHtml } from './utils';

export function generateCollegeDescription(college: any) {
  const { name, location, courses, fees, cutoff, ranking } = college;
  const courseList = courses?.map((c: any) => c.name).join(', ') || 'various programs';
  const city = location.split(',')[0].trim();

  return `
    <p><strong>${name}</strong>, located in the heart of <strong>${location}</strong>, is one of the premier educational institutions in India. Known for its academic excellence and state-of-the-art infrastructure, the college has consistently ranked <strong>${ranking || 'among the top'}</strong> in the region.</p>
    
    <h2>Admission Process 2026</h2>
    <p>The admission process for ${name} is primarily based on merit and entrance exam scores. For students seeking <strong>direct admission under management quota</strong>, specific seats are reserved. Candidates must meet the eligibility criteria defined by the university and regulatory bodies.</p>
    <ul>
      <li>Qualification in relevant entrance exams (NEET/CET/COMEDK).</li>
      <li>Submission of application forms through the official portal.</li>
      <li>Document verification and personal interview rounds.</li>
      <li>Final seat allotment based on availability and merit.</li>
    </ul>

    <h2>Fees Structure</h2>
    <p>The fee structure at ${name} for ${courseList} varies depending on the course and category of admission. The estimated fees range from <strong>${fees || 'competitive rates'}</strong> per annum. Scholarships are available for meritorious students and those from economically weaker sections.</p>

    <h2>Entrance Exam Cutoff</h2>
    <p>To secure a seat in ${name}, students typically need to achieve a cutoff score of <strong>${cutoff || 'as per university norms'}</strong>. The competition is high, and early application is recommended for management quota seats.</p>

    <h2>Campus Facilities</h2>
    <p>The campus is equipped with modern facilities designed to provide a holistic learning experience:</p>
    <ul>
      <li>Advanced laboratories and research centers.</li>
      <li>Digital library with access to international journals.</li>
      <li>Separate hostels for boys and girls with 24/7 security.</li>
      <li>Sports complex, gymnasium, and cafeteria.</li>
    </ul>

    <h2>Placement Highlights</h2>
    <p>${name} has a dedicated placement cell that works tirelessly to connect students with top recruiters. Major companies from various sectors visit the campus annually, offering attractive packages to graduating students.</p>

    <h2>Frequently Asked Questions (FAQs)</h2>
    <h3>1. Does ${name} offer direct admission?</h3>
    <p>Yes, direct admission through management quota is available for eligible candidates in ${courseList}.</p>
    
    <h3>2. What is the location of the campus?</h3>
    <p>The college is situated in ${city}, providing easy access to public transport and essential services.</p>
    
    <h3>3. Are there any scholarships?</h3>
    <p>Yes, the college offers merit-based and category-based scholarships to support deserving students.</p>
    
    <h2>Contact for Direct Admission 2026</h2>
    <p>For detailed guidance on fee structure, management quota seats, and enrollment process at <strong>${name}</strong>, contact our experts:</p>
    <p><strong>Email:</strong> <a href="mailto:support@collegeadm.org">support@collegeadm.org</a><br>
    <strong>Phone:</strong> <a href="tel:+917707055155">+91 77070 55155</a></p>
  `;
}

export function generateCitySEOTemplate(city: string, colleges: any[], courseName?: string) {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const target = courseName ? `${courseName} colleges` : 'colleges';
  const year = new Date().getFullYear();
  const nextYear = year + 1;

  const intro = `
    <p>${cityName} has emerged as a premier educational hub in India, offering a wide range of opportunities for students seeking quality higher education. If you are looking for the <strong>best ${target} in ${cityName}</strong>, you have arrived at the definitive guide. The city's educational landscape is a vibrant mix of historic institutions and modern research-driven universities, making it a top choice for aspirants from across the country.</p>
    <p>Choosing the right institution is critical for your career trajectory. In ${cityName}, students benefit from a unique ecosystem that blends academic rigor with industry exposure. Whether you are interested in engineering, management, or medical sciences, the ${target} in this region are known for their state-of-the-art infrastructure and excellent placement records. In this comprehensive guide, we'll explore the admission processes for the ${year}-${nextYear} academic session, fee structures, and how you can secure a seat through <strong>direct admission or management quota</strong>.</p>
    <p>The competition for seats in top-tier colleges is intense. Understanding the nuances of the application process, entrance exam requirements, and eligibility criteria is essential. Our experts have curated this list based on latest rankings, student feedback, and placement statistics to help you make an informed decision about your future in ${cityName}.</p>
  `;

  const admissionProcess = [
    { step: '1', process: 'Entrance Exam (CAT/MAT/CET/JEE)' },
    { step: '2', process: 'Online Application & Registration' },
    { step: '3', process: 'Counselling & Document Verification' },
    { step: '4', process: 'College Selection & Seat Allotment' },
    { step: '5', process: 'Fee Payment & Final Admission' },
  ];

  const eligibility = [
    { requirement: 'Minimum Qualification', details: courseName?.includes('MBA') || courseName?.includes('Postgraduate') ? 'Graduation (Any Stream)' : '10+2 (Higher Secondary)' },
    { requirement: 'Minimum Marks', details: '50% Aggregate (45% for Reserved Categories)' },
    { requirement: 'Entrance Exams', details: courseName || 'National/State Level Exams' },
    { requirement: 'Age Limit', details: 'As per University/Council Norms' },
  ];

  const courseOverview = [
    { parameter: 'Course Name', details: courseName || 'Professional Degree' },
    { parameter: 'Duration', details: courseName?.includes('MBA') ? '2 Years' : '3-4 Years' },
    { parameter: 'Course Level', details: courseName?.includes('MBA') ? 'Postgraduate' : 'Undergraduate' },
    { parameter: 'Average Fees', details: '₹2.5L – ₹15L (Total)' },
    { parameter: 'Average Salary', details: '₹4.5L – ₹22L LPA' },
  ];

  const placementInsights = `
    <p>${cityName} is widely recognized as one of the strongest placement hubs in India. The city's proximity to major IT parks, industrial zones, and corporate headquarters ensures that students in ${target} have unparalleled access to internships and career opportunities. Major recruiters including Fortune 500 companies regularly visit campuses in ${cityName} for their annual hiring drives.</p>
    <p>The placement ecosystem here is driven by a strong synergy between academia and industry. Most top colleges have dedicated training and placement cells that work year-round to enhance students' employability through soft skills workshops, mock interviews, and industry-specific training. The average salary packages in ${cityName} for ${courseName || 'professional courses'} have seen a steady upward trend, reflecting the high demand for skilled professionals in the region.</p>
  `;

  const careerScope = `
    <p>Graduating from a top college in ${cityName} opens up a plethora of career paths across various sectors. For ${courseName || 'professional'} graduates, the scope extends from core technical roles to strategic management positions. The diverse economy of ${cityName} ensures that there are opportunities in Information Technology, Manufacturing, Healthcare, Finance, and the booming Startup ecosystem.</p>
    <p>Common job roles for graduates include Project Manager, Systems Architect, Business Analyst, Data Scientist, and Consultant. Furthermore, the entrepreneurial spirit of the city encourages many students to start their own ventures, supported by robust incubation centers within many colleges. The global recognition of degrees from ${cityName}'s premier institutions also facilitates opportunities for higher studies and careers abroad.</p>
  `;

  const faqs = [
    {
      q: `What are the best ${target} in ${cityName}?`,
      a: `Based on rankings and student feedback, some of the top institutions include ${colleges.slice(0, 3).map(c => c.name).join(', ')}, and more.`
    },
    {
      q: `Can I get direct admission in ${cityName} colleges?`,
      a: `Yes, most private colleges in ${cityName} have a percentage of seats reserved under the management quota for direct admission. Eligibility criteria still apply.`
    },
    {
      q: `What is the average fee for ${courseName || 'courses'} in ${cityName}?`,
      a: `The fee structure varies significantly by institution and category, typically ranging from ₹1.5 Lakh to ₹15 Lakh per annum depending on the course.`
    },
    {
      q: `Are there hostels available in ${cityName} colleges?`,
      a: `Yes, almost all major colleges in ${cityName} provide comprehensive on-campus or off-campus hostel facilities for both boys and girls.`
    },
    {
      q: `What entrance exams are required for ${cityName} college admission?`,
      a: `Common exams include ${courseName?.includes('Medical') ? 'NEET' : 'JEE Main/CET'} for undergraduate courses, and PGCET/GATE/CAT for postgraduate programs.`
    },
    {
      q: `Is ${cityName} safe for outstation students?`,
      a: `Absolutely. ${cityName} is known for its welcoming culture and safe environment, making it a preferred destination for students from all over India.`
    }
  ];

  return {
    intro,
    admissionProcess,
    eligibility,
    courseOverview,
    placementInsights,
    careerScope,
    faqs,
    whyStudy: [
      { title: 'Industry Exposure', desc: 'Direct interaction with top corporate leaders and regular industrial visits.', icon: 'Sparkles' },
      { title: 'Campus Infrastructure', desc: 'Modern laboratories, digital libraries, and smart classrooms.', icon: 'Building2' },
      { title: 'Placement Ecosystem', desc: 'Consistent track record of 90%+ placements with global MNCs.', icon: 'TrendingUp' },
      { title: 'Startup Hub', desc: 'Access to one of the world\'s most vibrant startup and innovation ecosystems.', icon: 'Info' },
    ]
  };
}
