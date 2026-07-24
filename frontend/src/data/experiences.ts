// frontend/src/data/experiences.ts

// USTP Internship Experience Images
import USTPLogo from '../assets/logo/USTPLogo.jpg'
import exp1_1 from '../assets/images/Work Experiences/USTP Internship/img1.jpg'
import exp1_2 from '../assets/images/Work Experiences/USTP Internship/img2.jpg'
import exp1_3 from '../assets/images/Work Experiences/USTP Internship/img3.jpg'
import exp1_4 from '../assets/images/Work Experiences/USTP Internship/img4.jpg'

// Capstone Project Experience Images
import exp2_1 from '../assets/images/Work Experiences/Capstone/img1.jpg'
import exp2_2 from '../assets/images/Work Experiences/Capstone/img2.jpg'
import exp2_3 from '../assets/images/Work Experiences/Capstone/img3.jpg'
import exp2_4 from '../assets/images/Work Experiences/Capstone/img4.jpg'

import type { ExperienceItem } from '../components/ExperienceAccordion';

export const experiences: ExperienceItem[] = [
  {
    id: 'exp1',
    logo: USTPLogo,
    title: 'Full-Stack Developer & Administrative Support Intern',
    subtitle: 'February 2026 – May 2026',
    images: [
      exp1_1,
      exp1_2,
      exp1_3,
      exp1_4
    ],
    orgName: 'USTP – CITC DEAN\'S OFFICE',
    address: 'USTP, Information and Communications Technology Building, Cagayan De Oro City, Misamis Oriental',
    pills: [
      "Full-Stack & UI/UX",
      "Backend Engineering",
      "Feature Optimization",
      "Database & Integration",
      "Digital Design",
      "Admin Operations"
    ],
    details: [
      {
        label: 'Full-Stack Development',
        description:
          'Collaborated within an agile team to develop iPerform (a faculty evaluation portal) and the CITC Portal, specializing in UI/UX enhancements, dynamic category rendering, and role-based filtering systems.',
      },
      {
        label: 'Feature Optimization',
        description:
          'Resolved critical technical debt by implementing pagination fixes, site-wide search improvements, and a PDF export functionality.',
      },
      {
        label: 'Backend Engineering',
        description:
          'Managed backend modules for ExamSync V2 using Django; successfully built and deployed drag-and-drop scheduling, section assignments, faculty account management, and automated email notifications to proctors.',
      },
      {
        label: 'Database & Integration',
        description:
          'Executed relational database migrations using Django and assisted with the system integration of SyllabEase and the GreenWatts platform merging.',
      },
      {
        label: 'Digital Asset Design',
        description:
          'Designed high-fidelity digital assets using Figma and Canva, producing official CITC virtual backgrounds, Facebook headers, and presentation templates for operational benchmarking.',
      },
      {
        label: 'Administrative Operations',
        description:
          'Streamlined office operations by routing documentation, encoding Graduate Tracer data, and processing graduation applications across four computing programs (BSIT, BSCS, BSTCM, BSDS).',
      },
    ],
    supervisionNote:
      "Maintained direct accountability and reporting under the supervision of Dr. Junar A. Landicho (USTP CITC Dean), Mr. Dario Cruz Miñoza, and Mr. Marlon Tumamak.",
  },
  {
    id: 'exp2',
    logo: USTPLogo,
    title: 'Full-Stack Developer',
    subtitle: 'A.Y 2024-2025 & A.Y 2025-2026',
    images: [
      exp2_1,
      exp2_2,
      exp2_3,
      exp2_4
    ],
    orgName: 'USTP - IT Department',
    address: 'USTP, Information and Communications Technology Building, Cagayan De Oro City, Misamis Oriental',
    pills: [
      "Front-End Engineer",
      "Back-End Engineer",
      "Web Designer"
    ],
  },
];