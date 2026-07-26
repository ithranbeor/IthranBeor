import USTP from '../assets/images/USTPGradPic.png'
import CU from '../assets/images/CUGradPic.png'
import USTPLogo from '../assets/logo/USTPLogo.jpg'
import CULogo from '../assets/logo/CULogo.png'

export interface EducationEntry {
  id: string;
  level: string;
  photo: string;
  logo: string;
  degree: string;
  school: string;
  dateRange: string;
  theme: 'blue' | 'red';
}

export const education: EducationEntry[] = [
  {
    id: 'college',
    level: 'College',
    photo: USTP,
    logo: USTPLogo,
    degree: 'Bachelor of Science in Information Technology',
    school: 'University of Science and Technology of Southern Philippines',
    dateRange: 'August 2022 – June 2026',
    theme: 'blue',
  },
  {
    id: 'shs',
    level: 'Senior High School',
    photo: CU,
    logo: CULogo,
    degree: 'Science, Technology, Engineering, and Mathematics (STEM) - Nursing Aide',
    school: 'Capitol University',
    dateRange: 'August 2020 – March 2022',
    theme: 'red',
  },
];