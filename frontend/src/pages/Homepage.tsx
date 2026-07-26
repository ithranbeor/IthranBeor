import '../App.css'
import { Link } from 'react-router-dom';
import Ithran from '../assets/images/ithran.png'
import IthranLogo from '../assets/logo/IthranLogo.png'
import Canvaicon from '../assets/logo/Canvaicon.png'
import { motion } from 'framer-motion';
import Breadcrumbs from '../components/BreadcrumbNav.tsx';
import FloatingNavigation from "../components/FloatingNavigation";
import { projects } from '../data/projects.ts';

// const Highlight = ({ children }: { children: React.ReactNode }) => (
//   <span className="inline px-1 py-1 mx-0.5 rounded-md bg-white/70 text-gray-900 font-medium shadow-sm">
//     {children}
//   </span>
// );

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <p className="uppercase tracking-[0.25em] text-sm text-gray-500 mb-3">
      {subtitle}
    </p>

    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
      {title}
    </h2>
  </div>
);

function HomePage() {
  const techCategories = [
    {
      title: 'Frontend & Mobile Development',
      items: [
        { name: 'React JS', icon: 'https://cdn.simpleicons.org/react/61DAFB', caption: 'Web Development' },
        { name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB', caption: 'Mobile Development' },
        { name: 'HTML5 & CSS3', icon: 'https://cdn.simpleicons.org/html5/E34F26', caption: 'Responsive Web Design' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', caption: 'ES6+' },
      ],
    },
    {
      title: 'Systems & Tools',
      items: [
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', caption: 'Version control' },
        { name: 'Agile Methodology', icon: 'https://cdn.simpleicons.org/jirasoftware/0052CC', caption: 'Task execution' },
      ],
    },
    {
      title: 'User Interface/UX & Digital Design',
      items: [
        { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E', caption: 'Interactive Prototyping' },
        { name: 'Canva', icon: Canvaicon, caption: 'Digital asset design' },
      ],
    },
    {
      title: 'Backend & Database Engineering',
      items: [
        { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20', caption: 'Framework' },
        { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3FCF8E', caption: 'BaaS' },
        { name: 'RESTful APIs', icon: 'https://cdn.simpleicons.org/fastapi/009688', caption: 'Integration' },
      ],
    },
  ];

  const softSkills = [
    {
      title: 'Strong Technical Communication',
      caption: 'Translating complex requirements into simple solutions',
    },
    {
      title: 'Team Collaboration',
      caption: 'Working with developers, designers, and administrators',
    },
    {
      title: 'Client Relations & Adaptability',
      caption: 'Managing expectations and pivoting to feedback',
    },
    {
      title: 'Problem-Solving',
      caption: 'Debugging, technical debt reduction, and logic building',
    },
    {
      title: 'Personal Discipline & Reliability',
      caption: 'Meticulous administrative tasks, inventory control, and precision',
    },
  ];

  const services = [
    {
      title: 'Frontend Development',
      description:
        'Building responsive and modern user interfaces with React, TypeScript, and TailwindCSS while focusing on accessibility and smooth user experience.',
    },
    {
      title: 'UI/UX Design',
      description:
        'Designing clean and user-friendly interfaces in Figma with focus on usability, clarity, and modern visual aesthetics.',
    },
    {
      title: 'Backend Development',
      description:
        'Developing scalable backend systems using Django, PostgreSQL, and Supabase with proper database structure and API integration.',
    },
  ];

  const projectStats = [
    '1 Group Project',
    '2 Solo Projects',
    '2 Collaborative Projects',
  ];

  return (
    <>
      <div id="hero" className="bg-[#EBEBEB] min-h-screen overflow-hidden relative">

        {/* BACKGROUND EFFECTS */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl"></div>

        {/* HEADER */}
        <header className="px-4 py-6 md:px-10 md:py-5 font-poppins relative z-1">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:flex-wrap">
            <div className="flex items-center gap-1 min-w-0">
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
              <Breadcrumbs currentPath="/" />
            </div>
          </nav>
        </header>

        {/* HERO SECTION */}
        <main className="relative min-h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)] overflow-hidden font-poppins pb-20 lg:pb-0">

          {/* Background circles */}
          <div className="absolute -left-40 top-10 h-112.5 w-112.5 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-gray-300/40 blur-3xl" />

          {/* Portrait */}
          <motion.img
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src={Ithran}
            alt="Ithran"
            className="
              absolute
              bottom-0
              right-0
              h-[40%]
              sm:h-[50%]
              md:h-[65%]
              lg:h-[105%]
              object-contain
              pointer-events-none
              select-none
              opacity-25
              sm:opacity-35
              lg:opacity-100
              z-0
              lg:z-20
              transition-opacity
            "
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              relative
              lg:absolute
              px-6
              sm:px-8
              lg:left-16
              lg:top-1/2
              lg:-translate-y-1/2
              max-w-4xl
              pt-14
              lg:pt-0
              z-30
            "
          >

            <p className="text-xl sm:text-2xl text-gray-600">
              Hello!
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-1 mb-6">
              I'm Ithran Beor
            </h2>

            <h1 className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-[8rem]
              xl:text-[7rem]
              font-black
              leading-[0.95]
              lg:leading-[0.9]
              tracking-[-0.04em]
              lg:tracking-[-0.06em]
              text-white
              drop-shadow-2xl
            ">
              Web Developer
              <br />
              & Designer
            </h1>

            <p className="mt-6 lg:mt-8 max-w-2xl text-base sm:text-lg leading-8 lg:leading-9 text-gray-700">
              I design intuitive digital experiences and develop scalable
              full-stack applications using React, Django, and modern web
              technologies. My goal is turning ideas into polished products that
              people genuinely enjoy using.
            </p>

            <div className="mt-8 lg:mt-10 flex flex-wrap gap-3 lg:gap-4">
              {projectStats.map((item) => (
                <div
                  key={item}
                  className="text-white relative inline-flex items-center space-x-1.5 md:space-x-5 rounded-2xl bg-black/60 px-3 py-2 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

          </motion.div>

        </main>

        <section id="projects" className="bg-[#EBEBEB] px-6 md:px-12 lg:px-20 py-24 font-poppins relative z-10 backdrop-blur-2xl backdrop-saturate-150 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
          <SectionTitle
            subtitle="Projects"
            title="What I've Built"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {projects.slice(0, 3).map((project) => (

              <motion.li
                key={project.id}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="list-none"
              >
                <Link
                  to={`/projects?project=${project.id}`}
                  className="group flex items-center justify-center h-48 bg-white/70 backdrop-blur-2xl text-gray-500 relative overflow-hidden rounded-[28px] p-6
                  backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all
                  duration-300 hover:bg-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                  "
                >
                  {/* Glass highlight */}
                  <div
                    className="
                      absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none
                    "
                  />

                  {/* Subtle top shine */}
                  <div
                    className="
                      absolute top-0 left-0 h-1/2 w-full bg-linear-to-b from-white/20 to-transparent pointer-events-none
                    "
                  />

                  {/* Cover image — front and center by default, dims on hover so name/logo can take over */}
                  {project.proofs[0] && (
                    <img
                      src={project.proofs[0].src}
                      alt={project.name}
                      className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-30 transition-opacity duration-300"
                    />
                  )}

                  {/* Name + logo — hidden until hover */}
                  <div className="relative z-10 flex flex-col items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <img
                      src={project.logo}
                      alt={project.name}
                      className="h-10 w-10 rounded-full bg-white object-cover shadow-sm"
                    />
                    <p className="text-gray-900 text-lg font-semibold leading-tight text-center">
                      {project.name}
                    </p>
                  </div>

                  {/* Vanishing hint — appears briefly on load, fades away on its own; hidden entirely during hover since the name is already showing */}
                  <span
                    className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 group-hover:opacity-0 group-hover:animate-none"
                  >
                    <span
                      className="vanish-hint block rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                    >
                      Click to explore
                    </span>
                  </span>
                </Link>
              </motion.li>

            ))}

          </div>

        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="bg-[#CECECE] px-6 md:px-12 lg:px-20 py-24 font-poppins relative z-10">
          <SectionTitle
            subtitle="About Me"
            title="Passionate About Building Digital Experiences"
          />

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">

            <div className="space-y-6 text-gray-700 leading-relaxed text-justify">

              <p>
                I am an aspiring full-stack developer who enjoys creating systems
                that are both functional and visually appealing. My development
                journey started with curiosity about how websites and applications
                work behind the scenes, which eventually led me into frontend,
                backend, and UI/UX design.
              </p>

              <p>
                Over time, I developed projects involving scheduling systems,
                learning platforms, and management applications. Through these
                experiences, I gained practical understanding of frontend
                development, backend architecture, database management,
                authentication systems, and user-centered design principles.
              </p>

              <p>
                Beyond technical skills, I value communication, collaboration,
                and adaptability. I enjoy working with teams, learning from
                experienced developers, and continuously improving my craft
                through real-world projects and experimentation.
              </p>
            </div>

          <div id="skills" className="bg-white border border-gray-300 rounded-4xl p-8 shadow-lg">
            <SectionTitle
              subtitle="Tech Stack"
              title="Technologies I Work With"
            />

            {/* Technologies — glassmorphism list, mobile-first */}
            <div className="space-y-6 mb-16">
              {techCategories.map((category, index) => {

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="
                      group relative overflow-hidden rounded-[28px] p-6 sm:p-8
                      bg-white/20 backdrop-blur-2xl backdrop-saturate-150
                      border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)]
                      transition-all duration-300
                      hover:bg-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                    "
                  >
                    {/* Glass highlight */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 h-1/2 w-full bg-linear-to-b from-white/20 to-transparent pointer-events-none" />

                    {/* Ambient glow */}
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      {/* Header row */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                            {category.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {category.items.length} Technologies
                          </p>
                        </div>
                      </div>

                      {/* Tech chips — always visible, touch-friendly, wraps naturally on phone */}
                      <div className="flex flex-wrap gap-2.5">
                        {category.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="
                              flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5
                              bg-white/50 backdrop-blur-md border border-white/40
                              shadow-sm transition-all duration-200
                              active:scale-95 hover:bg-white/70 hover:shadow-md
                            "
                          >
                            <span
                              className="
                                flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                                bg-white shadow-inner p-1.5
                              "
                            >
                              <img
                                src={item.icon}
                                alt={item.name}
                                className="h-full w-full object-contain"
                                loading="lazy"
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-gray-600 truncate">
                                {item.caption}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <SectionTitle
              subtitle="Soft Skills"
              title="Core Soft Skills"
            />

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="group relative overflow-hidden rounded-[28px] p-6 bg-white/20 backdrop-blur-2xl
                    backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all
                    duration-300 hover:bg-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                  "
                >
                  {/* Glass highlight */}
                  <div
                    className="
                      absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none
                    "
                  />

                  {/* Subtle top shine */}
                  <div
                    className="
                      absolute top-0 left-0 h-1/2 w-full bg-linear-to-b from-white/20 to-transparent pointer-events-none
                    "
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-gray-900 text-lg font-semibold leading-tight">
                      {skill.title}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {skill.caption}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="bg-[#EBEBEB] px-6 md:px-12 lg:px-20 py-24 font-poppins relative z-10 backdrop-blur-2xl backdrop-saturate-150 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.10)]">

          <SectionTitle
            subtitle="What I Do"
            title="Areas I Focus On"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (

              <motion.li
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  className="group relative overflow-hidden rounded-[28px] p-6 bg-white/20 backdrop-blur-2xl
                    backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all
                    duration-300 hover:bg-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                  "
                >
                  {/* Glass highlight */}
                  <div
                    className="
                      absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none
                    "
                  />
                  {/* Subtle top shine */}
                  <div
                    className="
                      absolute top-0 left-0 h-1/2 w-full bg-linear-to-b from-white/20 to-transparent pointer-events-none
                    "
                  />
                <div className="relative z-10">
                  <p className="text-gray-900 text-lg font-semibold leading-tight">
                    {service.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {service.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </div>
        </section>

        {/* CURRENTLY WORKING */}
        <section className="bg-[#CECECE] px-6 md:px-12 lg:px-20 py-24 font-poppins relative z-10">

          <SectionTitle
            subtitle="Currently"
            title="What I'm Working On"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="group relative overflow-hidden rounded-[28px] p-6 bg-white backdrop-blur-2xl
                    backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all
                    duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Improving My Development Skills
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                I continue learning advanced frontend architecture, backend optimization,
                deployment workflows, and UI/UX practices while building real-world projects
                that strengthen both technical and problem-solving skills.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="resume" className="bg-[#EBEBEB] px-6 md:px-12 lg:px-20 py-24 font-poppins relative z-10">
          <div className="bg-gray-600 rounded-4xl p-10 md:p-16 text-center shadow-2xl">
            <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-5">
              Let's Build Something
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Interested in Working Together?
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              I'm always open to opportunities, collaborations, and projects
              where I can continue learning while contributing meaningful work.
            </p>

            <div className="flex justify-center flex-wrap gap-4">
              <a
                href="/projects"
                className="px-6 py-3 rounded-xl bg-white text-gray-900 font-medium hover:scale-105 transition-all duration-300"
              >
                Explore Projects
              </a>
              <a
                href="/resume/Ithran-Beor-Resume.pdf"
                download
                className="px-6 py-3 rounded-xl border border-gray-100 text-white hover:bg-white/10 transition-all duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>
        {/* FOOTER */}
        <footer className="text-center text-gray-500 text-xs py-8 relative z-20 font-poppins backdrop-blur-sm bg-white/10 border-t border-white/20">
          &copy; {new Date().getFullYear()} Ithran Beor. All rights reserved.
        </footer>
      </div>
      <FloatingNavigation />
    </>
  )
}

export default HomePage