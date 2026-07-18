import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Experience from "@/pages/Experience";
import Contact from "@/pages/Contact";

const FORWARD_TRANSITIONS = {
  "home->about": "left",
  "home->projects": "left",
  "home->experience": "down",
  "home->contact": "down",
  "about->projects": "right",
  "about->experience": "down",
  "about->contact": "down",
  "projects->experience": "down",
  "projects->contact": "down",
  "experience->contact": "up",
};

const INVERSE = { left: "right", right: "left", up: "down", down: "up" };

function getDirection(from, to) {
  if (from === to) return "left";
  const fwd = FORWARD_TRANSITIONS[`${from}->${to}`];
  if (fwd) return fwd;
  const rev = FORWARD_TRANSITIONS[`${to}->${from}`];
  if (rev) return INVERSE[rev];
  return "left";
}

const PAGE_COMPONENTS = {
  home: Home,
  about: About,
  projects: Projects,
  experience: Experience,
  contact: Contact,
};

function buildVariants(reducedMotion) {
  if (reducedMotion) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return {
    enter: (dir) => ({
      rotateY: dir === "left" ? -90 : dir === "right" ? 90 : 0,
      rotateX: dir === "down" ? -90 : dir === "up" ? 90 : 0,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      rotateX: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      rotateY: dir === "left" ? 90 : dir === "right" ? -90 : 0,
      rotateX: dir === "down" ? 90 : dir === "up" ? -90 : 0,
      opacity: 0,
    }),
  };
}

export default function CubeStage({ activePage, onNavigate }) {
  const [direction, setDirection] = useState("left");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleNavigate = useCallback(
    (page) => {
      if (page === activePage) return;
      const dir = getDirection(activePage, page);
      setDirection(dir);
      onNavigate(page);
    },
    [activePage, onNavigate],
  );

  const variants = buildVariants(reducedMotion);
  const PageComponent = PAGE_COMPONENTS[activePage];

  return (
    <div
      className="relative w-full min-h-screen"
      style={{ perspective: 1200, perspectiveOrigin: "center center" }}
    >
      {/* Light-leak primitives during rotation */}
      <AnimatePresence custom={direction}>
        <motion.div
          key={activePage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reducedMotion ? 0.3 : 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="absolute inset-0 preserve-3d backface-hidden"
          aria-hidden={false}
        >
          <PageComponent onNavigate={handleNavigate} activePage={activePage} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
