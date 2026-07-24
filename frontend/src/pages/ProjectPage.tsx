import { useState } from 'react'
import '../App.css'
import IthranLogo from '../assets/logo/IthranLogo.png'
import Breadcrumbs from '../components/BreadcrumbNav.tsx';
import ProjectsExplorer from '../components/ProjectsExplorer.tsx';
import CategoryFilterSlider, { type FilterTab } from '../components/CategoryFilterSlider.tsx';
import { projects, type ProjectCategory } from '../data/projects.ts';

const FILTER_TABS: FilterTab[] = [
  { id: 'all', label: 'All' },
  { id: 'solo', label: 'Solo' },
  { id: 'group', label: 'Group' },
  { id: 'collaboration', label: 'Collaboration' },
];

function ProjectPage() {
  const [category, setCategory] = useState<'all' | ProjectCategory>('all');
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <>
      <div className="bg-[#EBEBEB] min-h-screen overflow-hidden relative">

        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl"></div>

        {/* HEADER */}
        <header className="px-4 py-6 md:px-10 md:py-5 font-poppins relative z-1">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={IthranLogo}
                alt="Ithran Beor"
                className="h-6 w-6 object-cover"
              />
              <h1 className="text-xl font-medium text-gray-800 truncate">
                Ithran Beor
              </h1>
            </div>
            <div className="min-w-0">
              <Breadcrumbs currentPath="/projects" />
            </div>
          </nav>
        </header>

        <main className="font-poppins flex min-h-[calc(100vh-116px)] w-full flex-col items-center relative z-10">
          {!projectOpen && (
            <div className="sticky top-4 z-30 mb-8 md:top-6">
              <CategoryFilterSlider
                tabs={FILTER_TABS}
                active={category}
                onChange={(id) =>
                  setCategory(id as "all" | ProjectCategory)
                }
              />
            </div>
          )}
    
          <div className="w-full max-w-5xl flex-1 px-4 pb-10 md:px-8">
            <ProjectsExplorer
              projects={projects}
              category={category}
              onProjectOpenChange={setProjectOpen}
            />
          </div>
        </main>

      </div>
    </>
  )
}

export default ProjectPage