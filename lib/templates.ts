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
    <p>Looking for the <strong>best ${target} in ${cityName}</strong>? You've come to the right place. ${cityName} has emerged as a major educational hub in India, attracting students from all across the country. With its mix of historic institutions and modern universities, the city offers unparalleled opportunities for academic growth and career development.</p>
    <p>In this comprehensive guide, we'll explore the top-ranked ${target} in ${cityName}, their admission processes for the ${year}-${nextYear} academic session, fee structures, and how you can secure a seat through <strong>direct admission or management quota</strong>.</p>
  `;

  const admissionProcess = `
    <h2 class="text-3xl font-bold text-navy-800 mb-6">Admission Process & Eligibility ${year}</h2>
    <p>Admission to premier ${target} in ${cityName} typically follows a structured process. While merit-based admission through entrance exams is the primary route, many institutions also offer <strong>management quota seats</strong> for direct enrollment.</p>
    <h3 class="text-xl font-bold text-navy-700 mt-6 mb-4">General Eligibility Criteria:</h3>
    <ul class="space-y-3 mb-6">
      <li class="flex items-start gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
        <span>Successful completion of 10+2 or equivalent from a recognized board.</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
        <span>Minimum aggregate marks (usually 50% for general, 45% for reserved categories).</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
        <span>Valid scores in relevant entrance exams like NEET, JEE Main, KCET, COMEDK, or PGCET.</span>
      </li>
    </ul>
    <p>For students who might have missed the entrance exam cutoffs, <strong>direct admission in ${cityName}</strong> provides a valuable alternative to secure their future in a top-tier institution.</p>
  `;

  const whyStudy = `
    <h2 class="text-3xl font-bold text-navy-800 mb-6">Why Study in ${cityName}?</h2>
    <p>${cityName} offers a unique blend of academic rigor and vibrant campus life. Here are the top reasons why students choose ${cityName} for their higher education:</p>
    <div class="grid md:grid-cols-2 gap-8 my-10">
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
          <Sparkles class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-navy-800 mb-2">Industry Hub</h4>
        <p class="text-gray-600 text-sm">Proximity to major corporate offices and industrial zones provides excellent internship and placement opportunities.</p>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
          <Building2 class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-navy-800 mb-2">Research Excellence</h4>
        <p class="text-gray-600 text-sm">Many colleges in ${cityName} are known for their research facilities and collaborations with international universities.</p>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
          <MapPin class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-navy-800 mb-2">Cultural Diversity</h4>
        <p class="text-gray-600 text-sm">The cosmopolitan nature of the city ensures a diverse student population and a rich multicultural experience.</p>
      </div>
      <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
          <Info class="w-5 h-5" />
        </div>
        <h4 class="font-bold text-navy-800 mb-2">Networking</h4>
        <p class="text-gray-600 text-sm">Studying in a major hub allows you to build a strong professional network that will last a lifetime.</p>
      </div>
    </div>
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
    }
  ];

  return {
    intro,
    admissionProcess,
    whyStudy,
    faqs
  };
}
