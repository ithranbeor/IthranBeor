import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import IthranLogo from "../assets/logo/IthranLogo.png";
import {
  LuBriefcase,
  LuChevronDown,
  LuImage,
  LuPencil,
  LuPlus,
  LuTrash2,
  LuX,
} from "react-icons/lu";

interface WorkExperience {
  id: number | string;
  logo: string;
  title: string;
  subtitle?: string;
  company_name: string;
  company_address: string;
  pills: string[];
  images: Array<{ id: number; image: string }>;
}

interface FormData {
  logo: File | null;
  title: string;
  subtitle: string;
  company_name: string;
  company_address: string;
  pills: string[];
}

const cardSpring = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

/* ---------------------------------------------------------
   Shared glass shell used by every admin accordion section.
   Add new sections (e.g. Contact) by wrapping them the same
   way further down the page.
--------------------------------------------------------- */
function AdminSection({
  title,
  subtitle,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      transition={cardSpring}
      className="group relative overflow-hidden rounded-[28px] bg-white/20 backdrop-blur-2xl backdrop-saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 h-1/2 w-full bg-linear-to-b from-white/20 to-transparent pointer-events-none" />

      <button
        type="button"
        onClick={onToggle}
        className="relative z-10 flex w-full items-center gap-4 px-6 py-5 sm:px-8 text-left"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/80 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            {subtitle}
          </p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
            {title}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={cardSpring}
          className="shrink-0 text-gray-600"
        >
          <LuChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={cardSpring}
            className="relative z-10 px-6 sm:px-8"
          >
            <div className="border-t border-white/30 pt-6 pb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SkillTagInput({
  skills,
  onChange,
}: {
  skills: string[];
  onChange: (skills: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const commit = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && input === "" && skills.length > 0) {
      onChange(skills.slice(0, -1));
    }
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-3 min-h-13 focus-within:ring-2 focus-within:ring-gray-900/20">
        {skills.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="flex items-center gap-1.5 rounded-full bg-gray-900 text-white text-xs font-semibold pl-3 pr-1.5 py-1.5"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(i)}
              aria-label={`Remove ${skill}`}
              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-white/20 transition"
            >
              <LuX size={11} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          placeholder={skills.length === 0 ? "Type a skill, press Enter…" : ""}
          className="flex-1 min-w-30 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 py-1"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1.5">
        Press Enter after each skill to add it as its own tag.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   Work Experience section content (form + list). This lives
   inside the "Work Experience" AdminSection below.
--------------------------------------------------------- */
function WorkExperienceManager() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<
    Array<{ id: number; image: string }>
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    logo: null,
    title: "",
    subtitle: "",
    company_name: "",
    company_address: "",
    pills: [],
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:8000/api/work-experience/",
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setExperiences(data);
      setError("");
    } catch (err) {
      setError("Failed to load work experiences");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!editingId && !formData.logo) {
      setError("Logo is required for new experiences");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("company_name", formData.company_name);
      data.append("company_address", formData.company_address);

      // Each skill is already its own tag, so append each directly —
      // no comma-splitting needed anymore.
      formData.pills.forEach((p) => data.append("pills", p));

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      let response;
      if (editingId) {
        response = await fetch(
          `http://localhost:8000/api/work-experience/${editingId}/`,
          { method: "PATCH", body: data },
        );
      } else {
        response = await fetch(
          "http://localhost:8000/api/work-experience/",
          {
            method: "POST",
            body: data,
          },
        );
      }

      if (!response.ok) throw new Error("Failed to save");

      const savedExperience = await response.json();

      if (newImages.length > 0) {
        for (const image of newImages) {
          const imageData = new FormData();
          imageData.append("image", image);
          await fetch(
            `http://localhost:8000/api/work-experience/${savedExperience.id}/images/`,
            { method: "POST", body: imageData },
          );
        }
      }

      await fetchExperiences();
      resetForm();
      setShowForm(false);
      setError("");
    } catch (err) {
      setError("Failed to save work experience");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (exp: WorkExperience) => {
    setFormData({
      logo: null,
      title: exp.title,
      subtitle: exp.subtitle || "",
      company_name: exp.company_name,
      company_address: exp.company_address,
      pills: [...exp.pills],
    });
    setEditingId(Number(exp.id));
    setShowForm(true);
    setNewImages([]);
    setExistingImages([...exp.images]);
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Delete this image?")) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/work-experience/${editingId}/images/${imageId}/`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete image");
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      setError("Failed to delete image");
      console.error(err);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/work-experience/${id}/`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete");
      await fetchExperiences();
      setError("");
    } catch (err) {
      setError("Failed to delete work experience");
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      logo: null,
      title: "",
      subtitle: "",
      company_name: "",
      company_address: "",
      pills: [],
    });
    setEditingId(null);
    setNewImages([]);
    setExistingImages([]); // <-- add this
  };

  const inputClasses =
    "w-full px-3.5 py-2.5 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div>
      {error && (
        <div className="mb-5 rounded-2xl border border-red-300/50 bg-red-50/80 backdrop-blur-md px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 text-sm font-semibold shadow-sm transition"
        >
          <LuPlus size={16} />
          Add New Experience
        </button>
      )}

      {/* Form */}
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={cardSpring}
            className="overflow-hidden"
          >
            <div className="mb-8 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-xl p-5 sm:p-7">
              <h4 className="text-base font-bold text-gray-900 mb-5">
                {editingId ? "Edit Experience" : "Add New Experience"}
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>
                      Logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="w-full text-sm text-gray-700 file:mr-3 file:rounded-xl file:border-0 file:bg-gray-900 file:text-white file:px-3.5 file:py-2 file:text-xs file:font-semibold"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      required
                      className={inputClasses}
                      placeholder="e.g., Full-Stack Developer"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleFormChange}
                      className={inputClasses}
                      placeholder="e.g., February 2026 – May 2026"
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleFormChange}
                      required
                      className={inputClasses}
                      placeholder="e.g., USTP - CITC"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>
                    Company Address
                  </label>
                  <textarea
                    name="company_address"
                    value={formData.company_address}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    className={inputClasses}
                    placeholder="Full company address"
                  />
                </div>

                <div>
                  <label className={labelClasses}>
                    Skills
                  </label>
                  <SkillTagInput
                    skills={formData.pills}
                    onChange={(pills) =>
                      setFormData((prev) => ({
                        ...prev,
                        pills,
                      }))}
                  />
                </div>

                <div>
                  {editingId && existingImages.length > 0 && (
                    <div>
                      <label className={labelClasses}>Current Images</label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {existingImages.map((img) => (
                          <div key={img.id} className="relative group">
                            <img
                              src={img.image}
                              alt=""
                              className="h-16 w-16 rounded-lg object-cover border border-white/50"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteImage(img.id)}
                              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 transition"
                              aria-label="Delete image"
                            >
                              <LuX size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <label className={labelClasses}>
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                    className="w-full text-sm text-gray-700 file:mr-3 file:rounded-xl file:border-0 file:bg-gray-900 file:text-white file:px-3.5 file:py-2 file:text-xs file:font-semibold"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Select multiple images. You can upload as many as you want.
                  </p>
                  {newImages.length > 0 && (
                    <p className="text-xs text-gray-700 font-medium mt-2">
                      {newImages.length} image(s) selected
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-2xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white text-sm font-semibold py-2.5 transition"
                  >
                    {isSubmitting ? "Saving…" : "Save Experience"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="flex-1 rounded-2xl border border-white/50 bg-white/50 hover:bg-white/70 text-gray-800 text-sm font-semibold py-2.5 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
          {experiences.length} {experiences.length === 1 ? "Entry" : "Entries"}
        </p>

        {loading
          ? <p className="text-sm text-gray-600">Loading…</p>
          : experiences.length === 0
          ? (
            <p className="text-sm text-gray-600">
              No work experiences yet. Add one to get started!
            </p>
          )
          : (
            <div className="grid grid-cols-1 gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 backdrop-blur-md p-5 transition hover:bg-white/60"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <img
                      src={exp.logo}
                      alt={exp.company_name}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover border border-white/50"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 truncate">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">
                        {exp.company_name}
                      </p>
                      {exp.subtitle && (
                        <p className="text-xs text-gray-500">
                          {exp.subtitle}
                        </p>
                      )}

                      {exp.pills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.pills.map((
                            pill,
                            i,
                          ) => (
                            <span
                              key={i}
                              className="rounded-full bg-gray-900/90 text-white text-[11px] font-semibold px-2.5 py-1"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      )}

                      {exp.images.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3">
                          <LuImage
                            size={14}
                            className="text-gray-500"
                          />
                          <div className="flex gap-1.5 overflow-x-auto">
                            {exp.images.slice(0, 4)
                              .map((img) => (
                                <img
                                  key={img.id}
                                  src={img
                                    .image}
                                  alt=""
                                  className="h-9 w-9 shrink-0 rounded-lg object-cover border border-white/50"
                                />
                              ))}
                            {exp.images.length >
                                4 && (
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900/80 text-white text-[10px] font-semibold">
                                +{exp.images
                                  .length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 sm:flex-col shrink-0">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white px-3.5 py-2 text-xs font-semibold transition"
                      >
                        <LuPencil size={13} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-red-300/60 bg-red-50/70 hover:bg-red-100/80 text-red-700 px-3.5 py-2 text-xs font-semibold transition"
                      >
                        <LuTrash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>(
    "work-experience",
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#D6D6D6] font-poppins relative overflow-hidden">
      {/* Background effects, matching the rest of the site */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gray-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="px-4 py-6 md:px-10 md:py-5 relative z-10">
        <nav className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={IthranLogo}
              alt="Ithran Beor"
              className="h-10 w-10 object-cover"
            />
            <div className="min-w-0">
              <h1 className="text-lg font-medium text-gray-800 truncate">
                Ithran Beor
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Admin
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl bg-black/80 hover:bg-black text-white px-4 py-2.5 text-sm font-semibold shadow-sm transition"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="mb-10">
          <p className="uppercase tracking-[0.25em] text-sm text-gray-500 mb-3">
            Dashboard
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Manage Your Site
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          <AdminSection
            title="Work Experience"
            subtitle="Section"
            icon={<LuBriefcase size={22} />}
            isOpen={openSection === "work-experience"}
            onToggle={() => toggleSection("work-experience")}
          >
            <WorkExperienceManager />
          </AdminSection>

          {
            /* Next admin page goes here, e.g.:
          <AdminSection
              title="Contact"
              subtitle="Section"
              icon={<LuMail size={22} />}
              isOpen={openSection === "contact"}
              onToggle={() => toggleSection("contact")}
          >
              <ContactManager />
          </AdminSection>
          */
          }
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
