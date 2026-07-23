import '../App.css'
import IthranLogo from '../assets/logo/IthranLogo.png'
import BreadcrumbNav from '../components/BreadcrumbNav.tsx';
import ContactCard from '../components/ContactCard.tsx';
import Map from '../assets/images/map.png'

function ContactPage() {
  return (
    <>
      <div className="min-h-screen overflow-hidden relative bg-[#D6D6D6]">

        <img
          src={Map}
          alt="Contact Background"
          className="w-full h-full object-cover absolute inset-0 scale-105 bg-cover bg-center blur-sm"
        />
        <div className="absolute inset-0 bg-white/10" />

        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl"></div>

        {/* HEADER */}
        <header className="px-4 py-6 md:px-10 md:py-5 font-poppins relative z-10">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={IthranLogo}
                alt="Ithran Beor"
                className="h-10 w-10 object-cover"
              />
              <h1 className="text-xl font-medium text-gray-800 truncate">
                Ithran Beor
              </h1>
            </div>
            <div className="min-w-0">
              <BreadcrumbNav currentPath="/contact" />
            </div>
          </nav>
        </header>

        <main className="font-poppins flex min-h-[calc(100vh-116px)] w-full items-center justify-center relative z-10 px-4 pb-16">
          <ContactCard />
        </main>

      </div>
    </>
  )
}

export default ContactPage