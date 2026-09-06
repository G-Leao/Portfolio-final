import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
  Layers,
  Wrench,
  Target,
  Sparkles,
} from "lucide-react";
import WatchHub from "../assets/img/WATCHHUB.png";
import { useTranslation } from "react-i18next";
import Port from "../assets/img/Portfolio.png";
import Gestao from "../assets/img/siSTEMAGESTAO.png";
import Ar from "../assets/img/aresportes.png";
import Cadastro from "../assets/img/cadastro.png";
import login from "../assets/img/login.png";
import Advocacia from "../assets/img/bilobran.png";
import PubliBus from "../assets/img/publibus.png"; 

const PROJECTS = [
  {
    id: "portfolio",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    image: Port,
    github: "https://github.com/G-Leao/Portfolio-final",
    live: "https://gustavol.vercel.app/",
  },
  {
    id: "gestao",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Gestao,
    github: "https://github.com/G-Leao/Sistema-de-gestao-de-vendas",
    live: "https://sistema-de-gestao-de-vendas-black.vercel.app/",
  },
  {
    id: "watchhub",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    image: WatchHub,
    github: "https://github.com/G-Leao/watch-hub",
    live: "https://watch-hub-nine.vercel.app/",
  },
  {
    id: "publibus",
    tech: ["React", "JavaScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Vercel", "Railway"],
    image: PubliBus,
    github: "https://github.com/G-Leao/PUBLI-BUS",
    live: "https://publi-bus.vercel.app/",
  },
  {
    id: "aresportes",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Ar,
    github: "https://github.com/G-Leao/ar-esportes-landing-page",
    live: "https://ar-hazel-tau.vercel.app/",
  },
  {
    id: "advocacia",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Advocacia,
    github: "https://github.com/G-Leao/advocacia",
    live: "https://www.bilobranpalaciadvogados.com.br/",
  },
  {
    id: "cadastro",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Cadastro,
    github: "https://github.com/G-Leao/pagina-de-cadastro",
    live: "https://pagina-de-cadastro-nu.vercel.app/",
  },
  {
    id: "login",
    tech: ["HTML", "CSS", "JavaScript"],
    image: login,
    github: "https://github.com/G-Leao/login",
    live: "https://login-page-eight-blush.vercel.app/",
  },
];

// Resolve os textos de um projeto a partir das traduções do i18n
function getProjectItem(id, t) {
  const item = t(`projects.items.${id}`, { returnObjects: true });
  return {
    ...item,
    category: t(`projects.categories.${item.categoryKey}`),
    status: t("projects.status.completed"),
  };
}

// Variantes definidas fora do componente — evita recriação a cada render
const cubeVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    transformOrigin: "center center",
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    transformOrigin: direction > 0 ? "right center" : "left center",
  }),
};

const textVariants = {
  enter: (direction) => ({
    opacity: 0,
    y: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    y: direction > 0 ? -24 : 24,
  }),
};

const imgTransition = { duration: 0.55, ease: [0.23, 1, 0.32, 1] };
const textTransition = { duration: 0.4, ease: [0.23, 1, 0.32, 1] };

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#020617]/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#020617] shadow-[0_0_60px_rgba(34,211,238,0.12)]"
        >
          {/* Borda estática com gradiente — substitui o conic-gradient rotativo */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)",
              maskImage: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />

          <div className="relative rounded-2xl bg-[#020617] max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-4 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/70">
                  {project.category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold mt-1">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label={t("projects.closeModal")}
                className="w-9 h-9 rounded-full border border-white/10 bg-[#020617]/80 flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a1128] to-[#020617] p-6 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="max-h-56 w-auto object-contain drop-shadow-[0_10px_40px_rgba(34,211,238,0.25)]"
                />
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-md" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-md" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-md" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400/50 rounded-br-md" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300 bg-emerald-400/5">
                  {project.status}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-cyan-300">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-mono text-xs tracking-[0.2em] uppercase">
                    {t("projects.modal.description")}
                  </h4>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-cyan-300">
                  <Layers className="w-4 h-4" />
                  <h4 className="font-mono text-xs tracking-[0.2em] uppercase">
                    {t("projects.modal.features")}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/70 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-purple-300">
                    <Wrench className="w-4 h-4" />
                    <h4 className="font-mono text-xs tracking-[0.2em] uppercase">
                      {t("projects.modal.challenge")}
                    </h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3 text-purple-300">
                    <Target className="w-4 h-4" />
                    <h4 className="font-mono text-xs tracking-[0.2em] uppercase">
                      {t("projects.modal.solution")}
                    </h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">
                  {t("projects.modal.objective")}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.objective}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">
                  {t("projects.modal.tech")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("projects.live")}
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  {t("projects.code")}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects({ onNavigate }) {
  const { t } = useTranslation();
  const [[index, direction], setIndexState] = useState([0, 0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(null);
  const wheelCooldown = useRef(null);

  const total = PROJECTS.length;
  const project = { ...PROJECTS[index], ...getProjectItem(PROJECTS[index].id, t) };

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const goTo = useCallback(
    (dir) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setIndexState(([prev]) => [(prev + dir + total) % total, dir]);
      setTimeout(() => {
        isAnimating.current = false;
      }, 550);
    },
    [total],
  );

  const handleWheel = useCallback((e) => {
    if (selectedProject) return;
    e.preventDefault();
    if (wheelCooldown.current) return;

    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) < 15) return;

    goTo(delta > 0 ? 1 : -1);

    wheelCooldown.current = setTimeout(() => {
      wheelCooldown.current = null;
    }, 600);
  }, [selectedProject, goTo]);

  const handleTouchStart = useCallback((e) => {
    if (selectedProject) return;
    touchStartX.current = e.touches[0].clientX;
  }, [selectedProject]);

  const handleTouchEnd = useCallback((e) => {
    if (selectedProject) return;
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      goTo(deltaX < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  }, [selectedProject, goTo]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden px-6 md:px-10 lg:px-16 flex flex-col justify-center"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8 md:mb-10 flex items-end justify-between gap-4"
        >
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-3">
              {t("projects.sectionLabel")}
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95]">
              {t("projects.title")}{" "}
              <span className="text-gradient">{t("projects.titleHighlight")}</span>
            </h2>
          </div>
          <span className="font-mono text-cyan-400/60 text-sm hidden md:block">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative w-full aspect-[4/3]">
            {/* Borda estática com gradiente — muito mais leve que conic-gradient rotativo */}
            <div className="absolute -inset-[1px] rounded-2xl border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.12),inset_0_0_30px_rgba(34,211,238,0.04)]" />

            {/* Card real */}
            <div className="absolute inset-[1px] rounded-2xl bg-[#020617] overflow-hidden">
              <div
                className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a1128] to-[#020617] p-6 md:p-8"
                style={{ perspective: "1600px" }}
              >
                <AnimatePresence
                  custom={direction}
                  mode="popLayout"
                  initial={false}
                >
                  <motion.img
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    custom={direction}
                    variants={cubeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={imgTransition}
                    style={{ backfaceVisibility: "hidden" }}
                    className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-[0_10px_40px_rgba(34,211,238,0.25)]"
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Cantos decorativos estilo HUD */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-md" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-md" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-md" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400/50 rounded-br-md" />
              </div>
            </div>

            {/* Setas */}
            <button
              onClick={() => goTo(-1)}
              aria-label={t("projects.prevProject")}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => goTo(1)}
              aria-label={t("projects.nextProject")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative min-h-[280px]">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={project.id}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={textTransition}
              >
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400/70">
                  {project.category}
                </span>

                <h3 className="font-heading text-2xl md:text-3xl font-bold mt-2 mb-4">
                  {project.title}
                </h3>

                <p className="text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t("projects.live")}
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {t("projects.code")}
                  </a>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:text-cyan-200 hover:bg-cyan-400/5 transition-all duration-300"
                  >
                    {t("projects.details")}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex items-center gap-3 text-sm text-slate-500"
        >
          <span className="font-mono text-cyan-400/60 md:hidden">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-cyan-400/30 to-transparent" />
          <button
            onClick={() => onNavigate("experience")}
            className="text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            {t("projects.seeExperience")}
          </button>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
