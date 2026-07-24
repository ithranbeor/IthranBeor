import "../App.css";
// import api from "../services/api";
// import { useEffect, useState } from "react";
import IthranLogo from "../assets/logo/IthranLogo.png";
import Breadcrumbs from "../components/BreadcrumbNav.tsx";
import ExperienceAccordion from "../components/ExperienceAccordion.tsx";
import { experiences } from "../data/experiences.ts";

// interface ApiExperience {
//   id: number | string;
//   logo: string;
//   title: string;
//   subtitle?: string;
//   company_name: string;
//   company_address: string;
//   pills: string[];
//   images: Array<{ id: number; image: string }>;
// }

function WorkPage() {
  // const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetchExperiences();
  // }, []);

  // const fetchExperiences = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await api.get<ApiExperience[]>("/work-experience/");

  //     const transformedExperiences: ExperienceItem[] = response.data.map((exp) => ({
  //       id: String(exp.id),
  //       logo: exp.logo,
  //       title: exp.title,
  //       subtitle: exp.subtitle ?? "",
  //       images: exp.images.map((img) => img.image),
  //       orgName: exp.company_name,
  //       address: exp.company_address,
  //       pills: exp.pills,
  //     }));

  //     setExperiences(transformedExperiences);
  //     setError(null);
  //   } catch (err) {
  //     console.error("Error fetching experiences:", err);
  //     setError(
  //       "Failed to load work experiences. Make sure the backend server is running."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="bg-[#EBEBEB] min-h-screen overflow-hidden relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300/40 rounded-full blur-3xl">
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl">
        </div>

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
              <Breadcrumbs currentPath="/work" />
            </div>
          </nav>
        </header>

        <main className="font-poppins flex w-full items-center justify-center relative z-10">
          <div className="w-full max-w-2xl px-4 py-10 md:px-0">
            {experiences.length > 0 ? (
              <ExperienceAccordion items={experiences} />
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">
                  No work experiences found.
                </p>
              </div>
            )}

            {/* {loading && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">
                  Loading work experiences...
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
                <button
                  onClick={fetchExperiences}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )} */}
          </div>
        </main>
      </div>
    </>
  );
}

export default WorkPage;