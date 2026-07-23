// frontend/src/components/EducationCard.tsx

import { motion } from 'framer-motion';
import type { EducationEntry } from '../data/education';

const springy = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

const themes = {
  blue: {
    photo:
      'bg-gradient-to-br from-sky-100/40 via-white/25 to-blue-300/20 border-white/50',
    panel:
      'bg-gradient-to-br from-white/55 via-sky-100/30 to-blue-200/20 border-white/50',
    badge:
      'bg-gradient-to-r from-sky-100/70 to-blue-100/50 border-sky-200/70 text-sky-800',
    accent: 'text-sky-700',
  },

  red: {
    photo:
      'bg-gradient-to-br from-rose-100/40 via-white/25 to-pink-300/20 border-white/50',
    panel:
      'bg-gradient-to-br from-white/55 via-rose-100/30 to-pink-200/20 border-white/50',
    badge:
      'bg-gradient-to-r from-rose-100/70 to-pink-100/50 border-rose-200/70 text-rose-800',
    accent: 'text-rose-700',
  },
};

export default function EducationCard({
  entry,
  index = 0,
}: {
  entry: EducationEntry;
  index?: number;
}) {
  const theme = themes[entry.theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springy, delay: index * 0.08 }}
      className="flex w-full max-w-xs flex-col items-center"
    >
      {/* Level */}
      <p className={`mb-4 text-sm font-semibold tracking-widest uppercase ${theme.accent}`}>
        {entry.level}
      </p>

      {/* Photo */}
      <div className="relative w-full">
        <motion.div
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          transition={springy}
          className={`
            aspect-3/4
            w-full
            overflow-hidden
            rounded-[2.5rem]
            border
            backdrop-blur-3xl
            shadow-[0_20px_60px_rgba(15,23,42,0.18)]
            ring-1
            ring-white/40
            ${theme.photo}
          `}
        >
          <img
            src={entry.photo}
            alt={entry.school}
            className="h-full w-full object-cover"
          />

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Logo */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-white/70
              bg-white/90
              backdrop-blur-xl
              shadow-[0_15px_35px_rgba(0,0,0,0.18)]
              ring-4
              ring-white/40
            "
          >
            <img
              src={entry.logo}
              alt={entry.school}
              className="h-10 w-10 rounded-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div
        className={`
          mt-12
          w-full
          rounded-[1.75rem]
          border
          px-6
          py-6
          text-center
          backdrop-blur-3xl
          shadow-[0_15px_45px_rgba(0,0,0,0.12)]
          ring-1
          ring-white/30
          ${theme.panel}
        `}
      >
        <h3 className="text-lg font-bold leading-tight text-slate-900">
          {entry.degree}
        </h3>

        <p className={`mt-3 text-sm font-semibold ${theme.accent}`}>
          {entry.school}
        </p>
      </div>

      {/* Date Badge */}
      <div
        className={`
          mt-5
          inline-flex
          rounded-full
          border
          px-5
          py-2
          text-sm
          font-semibold
          tracking-wide
          backdrop-blur-xl
          shadow-lg
          ${theme.badge}
        `}
      >
        {entry.dateRange}
      </div>
    </motion.div>
  );
}