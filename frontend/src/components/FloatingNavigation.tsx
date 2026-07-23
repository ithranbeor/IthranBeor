import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LuArrowUp,
  LuBriefcase,
  LuFolderCode,
  LuHouse,
  LuFileText,
  LuStar,
  LuUser,
} from "react-icons/lu";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
};

const items: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: LuHouse,
    href: "#hero",
  },
  {
    id: "projects",
    label: "Projects",
    icon: LuFolderCode,
    href: "#projects",
  },
  {
    id: "about",
    label: "About",
    icon: LuUser,
    href: "#about",
  },
  {
    id: "skills",
    label: "Skills",
    icon: LuStar,
    href: "#skills",
  },
  {
    id: "services",
    label: "Services",
    icon: LuBriefcase,
    href: "#services",
  },
  {
    id: "resume",
    label: "Resume",
    icon: LuFileText,
    href: "#resume",
  },
];

const pillVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function FloatingSidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id],main[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    if (id === "top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setOpen(false);
      return;
    }

    const element = document.querySelector(`[id="${id.slice(1)}"]`);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpen(false);
  }

  return (
    <div
      className="fixed right-6 bottom-6 z-999"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative flex items-end">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-2"
            >
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={pillVariants}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => go(item.href)}
                    className={`flex items-center rounded-full px-4 py-3 text-sm font-medium transition duration-200 shadow-lg ring-1 ring-white/20 backdrop-blur-xl ${
                      isActive
                        ? "bg-white text-slate-950"
                        : "bg-black/40 text-white hover:bg-black/50"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="ml-3 whitespace-nowrap">{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => go("top")}
          aria-label="Back to top"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-black shadow-[0_20px_50px_rgba(15,23,42,0.25)] ring-1 ring-white/20 backdrop-blur-xl transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <LuArrowUp size={24} />
        </button>
      </div>
    </div>
  );
}
