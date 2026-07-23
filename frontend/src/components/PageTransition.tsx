// frontend/src/components/PageTransition.tsx
import { motion } from "framer-motion";
import { type ReactNode } from "react";

// Same mid-paced spring feel as the breadcrumb card
const appleSpring = {
  type: 'spring' as const,
  stiffness: 170,
  damping: 22,
  mass: 1,
};

export default function PageTransition({ children, direction = 1 }: { children: ReactNode; direction?: number }) {
  const offset = 120;
  const initialX = direction > 0 ? offset : -offset;
  const exitX = direction > 0 ? -offset : offset;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: exitX }}
      transition={appleSpring}
    >
      {children}
    </motion.div>
  );
}