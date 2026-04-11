// lib/templates.ts

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
