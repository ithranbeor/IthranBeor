// frontend/src/components/ExperienceAccordion.tsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import {
  LuChevronDown,
  LuChevronRight,
  LuChevronLeft,
  LuX,
} from 'react-icons/lu';

export interface ExperienceItem {
  id: string;
  logo: string;
  title: string;
  subtitle: string;
  images: string[];
  orgName: string;
  address: string;
  pills: string[];
}

const cardSpring = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

const spring = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}) {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={spring}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]}
          alt=""
          className="max-h-[90vh] w-full object-contain"
        />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md"
        >
          <LuX size={20} />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={() => onNavigate(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md"
            >
              <LuChevronLeft size={22} />
            </button>

            <button
              onClick={() => onNavigate(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md"
            >
              <LuChevronRight size={22} />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}

function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  const navigateLightbox = (dir: 1 | -1) => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      return (i + dir + images.length) % images.length;
    });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  // 1–2 images
  if (images.length <= 2) {
    return (
      <>
        <div
          className={`grid gap-3 ${
            images.length === 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="overflow-hidden rounded-2xl border border-white/40 bg-white/10 backdrop-blur-sm"
            >
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                className="h-48 w-full object-cover transition hover:scale-105 md:h-56"
              />
            </button>
          ))}
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              images={images}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNavigate={navigateLightbox}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // 3+ images
  return (
    <>
      <div className="relative h-56 overflow-hidden rounded-2xl border border-white/40 bg-white/10 backdrop-blur-sm md:h-64">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            onClick={() => setLightboxIndex(index)}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={cardSpring}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover active:cursor-grabbing"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={next}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/40 backdrop-blur-md"
        >
          <LuChevronRight size={18} />
        </button>

        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ExperienceCard({
  item,
  isOpen,
  onToggle,
}: {
  item: ExperienceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      transition={cardSpring}
      className="overflow-hidden rounded-3xl border border-white/30 bg-white/25 backdrop-blur-md shadow-sm"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <img
          src={item.logo}
          alt=""
          className="h-9 w-9 shrink-0 rounded-full border border-white/40 object-cover bg-white/40"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-800">{item.title}</h3>
          <p className="truncate text-xs text-gray-500">{item.subtitle}</p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={cardSpring}
          className="shrink-0 text-gray-600"
        >
          <LuChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={cardSpring}
            className="px-5"
          >
            <div className="pb-5 pt-1">
              <ImageGallery images={item.images} alt={item.title} />

              <h4 className="mt-4 text-sm font-bold uppercase tracking-wide text-indigo-900">
                {item.orgName}
              </h4>
              <p className="mt-0.5 text-xs text-gray-500">{item.address}</p>

              <p className="mt-4 text-xs font-medium text-gray-500">Experiences</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/50 bg-white/40 px-4 py-1.5 text-xs font-semibold text-gray-800 backdrop-blur-sm shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ExperienceAccordion({ items }: { items: ExperienceItem[] }) {
  // First item open by default; opening another closes the current one.
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex w-full flex-col gap-4">
      {items.map((item) => (
        <ExperienceCard
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}