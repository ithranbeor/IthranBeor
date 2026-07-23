import { useEffect, useState } from "react";
import api from "../services/api";

interface Project {
  id: number;
  title: string;
  description: string;
  github_url: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get("/projects/")
      .then((res) => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        My Portfolio
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="border rounded-xl p-5"
          >
            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>

            <p className="mt-2">
              {project.description}
            </p>

            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;