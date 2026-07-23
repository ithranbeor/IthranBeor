// frontend/src/components/BreadcrumbNav.tsx
import { LuChevronRight } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CRUMB_LABELS: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/work': 'Work Experience',
  '/education': 'Education',
  '/contact': 'Get in Touch',
};

interface BreadcrumbNavProps {
  currentPath: string;
}

// Apple-esque spring: mid-paced, slightly bouncy, no linear/ease-out feel
const appleSpring = {
  type: 'spring' as const,
  stiffness: 170,
  damping: 22,
  mass: 1,
};

function BreadcrumbNav({ currentPath }: BreadcrumbNavProps) {
  const navigate = useNavigate();

  // Home is always present and never animates.
  // The current-page crumb is the only thing that enters/exits.
  const currentCrumb = currentPath !== '/' ? currentPath : null;
  const isHomeActive = currentPath === '/';

  return (
    <motion.ol
      layout
      transition={appleSpring}
      className="flex flex-wrap items-center gap-1 md:gap-2 max-w-full bg-white/20 rounded-2xl border px-3 py-2 text-sm font-medium backdrop-blur-md shadow-sm border-white/20"
    >
      {/* Home crumb: static, never animates */}
      <li className="inline-flex min-w-0 items-center gap-1.5 leading-none">
        {isHomeActive ? (
          <span className="inline-flex items-center text-sm font-medium leading-none text-gray-800">
            {CRUMB_LABELS['/']}
          </span>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-sm font-medium leading-none text-body hover:text-fg-brand cursor-pointer bg-transparent border-none p-0"
          >
            {CRUMB_LABELS['/']}
          </button>
        )}
      </li>

      {/* Current page crumb: only this animates in/out on navigation */}
      <AnimatePresence mode="popLayout">
        {currentCrumb && (
          <motion.li
            key={currentCrumb}
            className="inline-flex min-w-0 items-center gap-1.5 leading-none"
            layout
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={appleSpring}
          >
            <LuChevronRight
              className="text-gray-500 shrink-0 self-center"
              size={14}
            />
            <span className="inline-flex items-center text-sm font-medium leading-none text-gray-800">
              {CRUMB_LABELS[currentCrumb]}
            </span>
          </motion.li>
        )}
      </AnimatePresence>
    </motion.ol>
  );
}

export default BreadcrumbNav;