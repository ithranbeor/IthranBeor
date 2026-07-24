// frontend/src/data/projects.ts
import LearnITLogo from '../assets/logo/LearnITLogo.jpg'
import LearnITPic1 from '../assets/images/LearnITPic1.png'

import ExamSyncLogo from '../assets/logo/ExamSyncLogo.jpg'
import ExamSyncPic1 from '../assets/images/examsync/Pic1.png'
import ExamSyncPic2 from '../assets/images/examsync/Pic2.png'
import ExamSyncPic3 from '../assets/images/examsync/Pic3.png'
import ExamSyncPic4 from '../assets/images/examsync/Pic4.png'
import ExamSyncVid1 from '../assets/images/examsync/ExamSyncVid1.mp4'

export type ProjectCategory = 'solo' | 'group' | 'collaboration';

export interface ProjectProof {
  id: string;
  label: string;
  src: string;
}

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  logo: string; 
  targetAudience: string;
  version: string;
  coreStack: string;
  description: string;
  proofs: ProjectProof[];
}

export const projects: Project[] = [
  {
    id: 'learnit',
    name: 'LearnIT',
    category: 'solo',
    logo: LearnITLogo, 
    targetAudience: 'IT Enthusiasts, Students, Teachers',
    version: '1.0.0',
    coreStack: 'Django, Python, Figma, JavaScript, UI/UX',
    description:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.',
    proofs: [
      { id: 'learnit-1', label: 'Pic 1', src: LearnITPic1 },
      { id: 'learnit-2', label: 'Pic 2', src: LearnITPic1 },
      { id: 'learnit-3', label: 'Pic 3', src: LearnITPic1 },
    ],
  },
  {
    id: 'examsync',
    name: 'ExamSync',
    category: 'group',
    logo: ExamSyncLogo,
    targetAudience: 'Dean, Faculty Members',
    version: '2.0.0',
    coreStack: 'Django, Django REST Framework, PostgreSQL database, React,TypeScript, Vite',
    description:
      'The original system’s source code was intended to be continued, but no response or access was ever provided. Because of this, the team decided to rebuild ExamSync completely from the ground up. Designed for academic institutions, ExamSync simplifies complex exam workflows into a single, secure platform accessible to all stakeholders.',
    proofs: [
      { id: 'examsync-1', label: 'Pic 1', src: ExamSyncPic1 },
      { id: 'examsync-2', label: 'Pic 2', src: ExamSyncPic2 },
      { id: 'examsync-3', label: 'Pic 3', src: ExamSyncPic3 },
      { id: 'examsync-4', label: 'Pic 4', src: ExamSyncPic4 },
      { id: 'examsync-5', label: 'Vid 1', src: ExamSyncVid1 },
    ],
  },
];