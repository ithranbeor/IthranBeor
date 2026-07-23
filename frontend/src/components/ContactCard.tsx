// frontend/src/components/ContactCard.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiIndeed } from 'react-icons/si';
import { FaGithub, FaYahoo } from 'react-icons/fa6';
import type { CSSProperties } from 'react';

import gmailIcon from '../assets/icons/gmail.png';
import linkedinIcon from '../assets/icons/linkedin.png';

const springy = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

interface ContactLink {
  id: string;
  label: string;
  href: string;
  image?: string;
  Icon?: React.ComponentType<{ size?: number; style?: CSSProperties }>;
  color?: string;
}

const GMAIL_ADDRESS = 'ithranbeorturno07@gmail.com';
const ICLOUD_ADDRESS = 'ithranbeor.turno@icloud.com';
const YAHOO_ADDRESS = 'ithranbeorturno07@gmail.com';

const links: ContactLink[] = [
  {
    id: 'gmail',
    label: 'Gmail',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_ADDRESS}`,
    image: gmailIcon,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ithran-beor-turno-95b869414/',
    image: linkedinIcon,
  },
  {
    id: 'indeed',
    label: 'Indeed',
    href: 'https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-homepage',
    Icon: SiIndeed,
    color: '#2164F3',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/ithranbeor',
    Icon: FaGithub,
    color: '#111111',
  },
  {
    id: 'yahoo',
    label: 'Yahoo',
    href: `https://compose.mail.yahoo.com/?to=${YAHOO_ADDRESS}`,
    Icon: FaYahoo,
    color: '#6001D2',
  },
];

export default function ContactCard({ resumeUrl = '/IthranBeorTurnoResume.pdf' }: { resumeUrl?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyIcloud = async () => {
    try {
      await navigator.clipboard.writeText(ICLOUD_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={springy}
      className="w-full max-w-sm rounded-4xl border border-white/40 bg-white/10 px-8 py-7 text-center shadow-lg backdrop-blur-xl"
    >
      <h2 className="text-base font-semibold text-gray-800">Get in Touch</h2>

      <div className="mt-4 flex items-center justify-center gap-4">
        {links.map((link) => {
          const isExternal = link.href.startsWith('http');
          const Icon = link.Icon;
          return (
            <motion.a
              key={link.id}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              aria-label={link.label}
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springy}
              className="flex h-8 w-8 items-center justify-center"
            >
              {link.image ? (
                <img src={link.image} alt={link.label} className="h-6 w-6 object-contain" />
              ) : (
                Icon && <Icon size={24} style={{ color: link.color }} />
              )}
            </motion.a>
          );
        })}
      </div>

      <motion.a
        href={resumeUrl}
        download
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={springy}
        className="mt-6 inline-flex items-center justify-center rounded-full border border-white/30 bg-gray-500/50 px-6 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition hover:bg-gray-500/85"
      >
        Download Resume
      </motion.a>

      <div className="relative mt-4 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={handleCopyIcloud}
          className="text-xs text-gray-600 underline decoration-dotted underline-offset-2 transition hover:text-gray-800"
        >
          Also on iCloud — {ICLOUD_ADDRESS}
        </button>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={springy}
              className="text-[11px] font-medium text-emerald-600"
            >
              Copied to clipboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}