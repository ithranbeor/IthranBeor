import '../App.css';
import IthranLogo from '../assets/logo/IthranLogo.png';
import BreadcrumbNav from '../components/BreadcrumbNav.tsx';
import EducationCard from '../components/EducationCard.tsx';
import { education } from '../data/education.ts';

function EducationPage() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#EBEBEB]">

        {/* ===================== BACKGROUND ===================== */}

        {/* Large Blue Gradient */}
        <div
          className="
            absolute
            -left-72
            -top-56
            h-225
            w-225
            rounded-full
            bg-linear-to-br
            from-sky-400/45
            via-blue-300/30
            to-transparent
            blur-[170px]
          "
        />

        {/* Large Red Gradient */}
        <div
          className="
            absolute
            -right-72
            -top-56
            h-[900px]
            w-[900px]
            rounded-full
            bg-gradient-to-bl
            from-rose-400/45
            via-pink-300/30
            to-transparent
            blur-[170px]
          "
        />

        {/* Bottom Blue Glow */}
        <div
          className="
            absolute
            bottom-[-280px]
            left-[8%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-sky-300/25
            blur-[170px]
          "
        />

        {/* Bottom Red Glow */}
        <div
          className="
            absolute
            bottom-[-280px]
            right-[8%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-rose-300/25
            blur-[170px]
          "
        />

        {/* Middle Glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[420px]
            w-[420px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/35
            blur-[130px]
          "
        />

        {/* Frosted Glass */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[110px]" />

        {/* Soft Top Light */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-white/25
            via-transparent
            to-transparent
          "
        />

        {/* Bottom Fade */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-white/10
            via-transparent
            to-transparent
          "
        />

        {/* Mesh Pattern */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.045]
            mix-blend-soft-light
            bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)]
            bg-[length:22px_22px]
          "
        />

        {/* ===================== CONTENT ===================== */}

        <div className="relative z-10">

          {/* HEADER */}

          <header className="px-4 py-6 md:px-10 md:py-5 font-poppins">
            <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:flex-wrap">

              <div className="flex items-center gap-3 min-w-0">

                <img
                  src={IthranLogo}
                  alt="Ithran Beor"
                  className="h-10 w-10 object-cover"
                />

                <h1 className="truncate text-xl font-semibold text-slate-800">
                  Ithran Beor
                </h1>

              </div>

              <BreadcrumbNav currentPath="/education" />

            </nav>
          </header>

          {/* MAIN */}

          <main className="relative z-10 flex w-full items-center justify-center px-4 pb-20 pt-8 font-poppins md:px-10">

            <div className="flex w-full max-w-5xl flex-wrap justify-center gap-12 md:gap-20">

              {education.map((entry, i) => (
                <EducationCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                />
              ))}

            </div>

          </main>

        </div>

      </div>
    </>
  );
}

export default EducationPage;