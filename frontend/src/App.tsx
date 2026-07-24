import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import HomePage from "./pages/Homepage.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/EducationPage";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NavSlider from "./components/NavSlider";

function AnimatedRoutes() {
  const location = useLocation();

  // This survives route changes because AnimatedRoutes stays mounted.
  const [hintVisible, setHintVisible] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>

      {!location.pathname.startsWith("/admin") && (
        <NavSlider
          hintVisible={hintVisible}
          onHideHint={() => setHintVisible(false)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}