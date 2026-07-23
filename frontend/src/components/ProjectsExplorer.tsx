// frontend/src/components/ProjectsExplorer.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import type { Project, ProjectCategory, ProjectProof } from '../data/projects.ts';
import { useDominantColor } from '../hooks/useDominantColor.ts';

const springy = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

// Converts a base hex color into a translucent rgba string for the glass tint.
function tint(hex: string, alpha: number) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const CATEGORY_LABELS: Record<'all' | ProjectCategory, string> = {
  all: 'All',
  solo: 'Solo',
  group: 'Group',
  collaboration: 'Collaboration',
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const color = useDominantColor(project.logo);
  const cover = project.proofs[0];

  return (
    <motion.button
      layoutId={`project-${project.id}`}
      type="button"
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={springy}
      className="group relative w-full max-w-xl overflow-hidden rounded-3xl border shadow-sm backdrop-blur-md"
      style={{
        backgroundColor: tint(color, 0.28),
        borderColor: tint(color, 0.45),
      }}
    >
      {cover ? (
        <>
          <img
            src={cover.src}
            alt={project.name}
            className="block w-full h-auto transition duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/10 to-transparent p-4 pt-10">
            <span className="text-sm font-medium text-white drop-shadow-sm">
              {project.name}
            </span>
          </div>
        </>
      ) : (
        <span className="flex h-52 w-full items-center justify-center text-sm font-medium text-gray-700">
          {project.name}
        </span>
      )}
    </motion.button>
  );
}

function SiblingButton({
  project,
  isActive,
  onSelect,
}: {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
}) {
  const color = useDominantColor(project.logo);

  return (
    <motion.button
      layout
      type="button"
      onClick={onSelect}
      transition={springy}
      className="flex h-10 items-center gap-2 rounded-2xl border shadow-sm backdrop-blur-md"
      style={{
        paddingLeft: 4,
        paddingRight: isActive ? 16 : 4,
        backgroundColor: tint(color, isActive ? 0.5 : 0.32),
        borderColor: tint(color, 0.55),
      }}
    >
      <img
        src={project.logo}
        alt={project.name}
        className="h-7 w-7 shrink-0 rounded-full bg-white object-cover"
      />
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={springy}
            className="overflow-hidden whitespace-nowrap text-sm font-medium text-gray-800"
          >
            {project.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ProjectDetailHeader({
  category,
  siblings,
  activeId,
  onSelect,
  onBack,
}: {
  category: ProjectCategory;
  siblings: Project[];
  activeId: string;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 rounded-2xl border border-white/40 bg-white/50 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white/70"
      >
        <LuChevronLeft size={20} />
        <span>{CATEGORY_LABELS[category]}</span>
      </button>

      {siblings.map((p) => (
        <SiblingButton
          key={p.id}
          project={p}
          isActive={p.id === activeId}
          onSelect={() => onSelect(p.id)}
        />
      ))}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/35 px-4 py-2.5 text-xs backdrop-blur-sm">
      <p className="font-medium text-gray-500">{label}:</p>
      <p className="mt-0.5 text-gray-800">{value}</p>
    </div>
  );
}

function ProofStack({
  proofs,
  onSelect,
}: {
  proofs: ProjectProof[];
  onSelect: (index: number) => void;
}) {
  if (!proofs.length) return null;

  const featured = proofs[0];
  const rest = proofs.slice(1);

  return (
    <div className="space-y-4">
      {/* Featured Image */}
      <motion.button
        type="button"
        onClick={() => onSelect(0)}
        whileHover={{ scale: 1.015 }}
        transition={springy}
        className="group relative w-full overflow-hidden rounded-3xl border border-white/40 shadow-lg"
      >
        <img
          src={featured.src}
          alt={featured.label}
          className="h-82.5 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
      </motion.button>

      {/* Gallery */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {rest.map((proof, index) => (
            <motion.button
              key={proof.id}
              type="button"
              onClick={() => onSelect(index + 1)}
              whileHover={{ y: -4 }}
              transition={springy}
              className="group relative overflow-hidden rounded-2xl border border-white/40 shadow-md"
            >
              <img
                src={proof.src}
                alt={proof.label}
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

function Lightbox({
  proofs,
  index,
  onClose,
  onNavigate,
}: {
  proofs: ProjectProof[];
  index: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}) {
  const proof = proofs[index];

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        key={proof.id}
        className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/30 bg-black shadow-2xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={springy}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={proof.src} alt={proof.label} className="max-h-[85vh] w-full object-contain" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
        >
          <LuX size={18} />
        </button>

        {proofs.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
            >
              <LuChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
            >
              <LuChevronRight size={20} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ProjectDetailCard({ project }: { project: Project }) {
  const color = useDominantColor(project.logo);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const navigate = (dir: 1 | -1) => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const len = project.proofs.length;
      return (i + dir + len) % len;
    });
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      transition={springy}
      className="grid gap-6 rounded-[3rem] border p-6 shadow-md backdrop-blur-lg md:grid-cols-[260px_1fr] md:p-8"
      style={{
        backgroundColor: tint(color, 0.4),
        borderColor: tint(color, 0.5),
      }}
    >
      {/* Left: identity + info */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center rounded-2xl bg-white/35 px-4 py-6 text-center backdrop-blur-sm">
          <img
            src={project.logo}
            alt={project.name}
            className="h-16 w-16 rounded-full bg-white object-cover shadow-sm"
          />
          <p className="mt-3 text-sm font-medium text-gray-800">{project.name}</p>
        </div>

        <InfoRow label="About" value={project.description} />
        <InfoRow label="Target Audience" value={project.targetAudience} />
        <InfoRow label="Version" value={project.version} />
        <InfoRow label="Core Stack Featured" value={project.coreStack} />
      </div>

      {/* Right: proofs */}
      <div className="flex flex-col justify-center">
        <p className="mb-4 text-center text-sm font-semibold text-gray-700">Proofs</p>
        <ProofStack proofs={project.proofs} onSelect={setLightboxIndex} />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            proofs={project.proofs}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsExplorer({
  projects,
  category,
  onProjectOpenChange,
}: {
  projects: Project[];
  category: "all" | ProjectCategory;
  onProjectOpenChange?: (open: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    onProjectOpenChange?.(selectedId !== null);
  }, [selectedId, onProjectOpenChange]);

  useEffect(() => {
    setSelectedId(null);
  }, [category]);

  const filtered =
    category === "all"
      ? projects
      : projects.filter((p) => p.category === category);

  const selected =
    projects.find((p) => p.id === selectedId) ?? null;

  const siblings = selected
    ? projects.filter((p) => p.category === selected.category)
    : [];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {!selected ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springy}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2">
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onOpen={() => setSelectedId(p.id)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={springy}
          >
            <ProjectDetailHeader
              category={selected.category}
              siblings={siblings}
              activeId={selected.id}
              onSelect={setSelectedId}
              onBack={() => setSelectedId(null)}
            />

            <ProjectDetailCard project={selected} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}