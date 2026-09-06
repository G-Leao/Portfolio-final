import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from "framer-motion";
import {
  ArrowRight,
  Mail,
  Sparkles,
  Code2,
  Braces,
  FileCode2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import MagneticButton from "@/components/MagneticButton";

const NAME = "Gustavo Leão";

const STATS = [
  {
    id: "projects",
    suffix: "+",
    counter: true,
    size: "text-xl md:text-2xl",
  },
  { id: "technology", value: "React", size: "text-base md:text-xl" },
  {
    id: "education",
    valueKey: "hero.stats.values.education",
    size: "text-[0.6rem] leading-tight sm:text-xs md:text-sm",
  },
];

const FLOATING_TAGS = [
  { label: "React", icon: Code2, className: "top-[16%] left-[6%] xl:left-[10%]", duration: 6, delay: 0 },
  { label: "JavaScript", icon: Braces, className: "top-[22%] right-[5%] xl:right-[9%]", duration: 7, delay: 0.4 },
  { label: "TypeScript", icon: FileCode2, className: "bottom-[20%] right-[9%] xl:right-[13%]", duration: 6.5, delay: 0.8 },
];

// Pontos do background — gerados uma vez, no cliente, para evitar mismatch de hydration.
function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 1 + Math.random() * 1.6,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 5,
  }));
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Home({ onNavigate, activePage }) {
  const { t } = useTranslation();
  const headline = t("hero.headline", { returnObjects: true });
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [count, setCount] = useState(0);

  const particles = useMemo(() => makeParticles(18), []);

  // Mouse tracking via motion values — não gera re-render a cada movimento.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });

  const interactive = mounted && !isTouch && !shouldReduceMotion;

  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || shouldReduceMotion) {
      setCount(10);
      return;
    }
    const controls = animate(0, 10, {
      duration: 1.1,
      delay: 1.35,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [mounted, shouldReduceMotion]);

  const handleMouseMove = (e) => {
    if (!interactive || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlightBackground = useTransform([springX, springY], ([x, y]) =>
    `radial-gradient(560px circle at ${x}px ${y}px, rgba(34,211,238,0.10), transparent 55%)`
  );

  // Parallax discreto no bloco central do Hero
  const parallaxX = useTransform(springX, (x) => {
    if (!sectionRef.current) return 0;
    const w = sectionRef.current.offsetWidth || 1;
    return ((x / w) - 0.5) * -10;
  });
  const parallaxY = useTransform(springY, (y) => {
    if (!sectionRef.current) return 0;
    const h = sectionRef.current.offsetHeight || 1;
    return ((y / h) - 0.5) * -8;
  });

  return (
    <section
      ref={sectionRef}
      
      data-active={activePage}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-14 pb-4"
    >
      {/* ===== BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Grid técnico sutil */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 35%, black 35%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 35%, black 35%, transparent 80%)",
          }}
        />

        {/* Glows radiais lentos */}
        <div
          className="absolute top-[-10%] left-[10%] w-[38rem] h-[38rem] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-slow"
        />
        <div
          className="absolute bottom-[-15%] right-[8%] w-[32rem] h-[32rem] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        {/* Partículas + linhas conectadas */}
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {particles.slice(1).map((p, i) => {
              const prev = particles[i];
              return (
                <line
                  key={`line-${p.id}`}
                  x1={prev.x}
                  y1={prev.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(103,232,249,0.10)"
                  strokeWidth="0.1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            {particles.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.r * 0.12}
                fill="rgba(103,232,249,0.55)"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: [0.2, 0.9, 0.2], cy: [p.y, p.y - 2, p.y] }
                }
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              />
            ))}
          </svg>
        )}

        {/* Spotlight acompanhando o cursor */}
        {interactive && (
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            style={{ background: spotlightBackground }}
          />
        )}
      </div>

      {/* ===== ELEMENTOS FLUTUANTES (desktop) ===== */}
      {mounted &&
        FLOATING_TAGS.map(({ label, icon: Icon, className, duration, delay }) => (
          <motion.div
            key={label}
            className={`hidden lg:flex absolute ${className} items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-400/15 bg-cyan-500/5 backdrop-blur-sm text-[11px] font-mono tracking-wider text-cyan-200/80 z-0`}
            initial={{ opacity: 0, y: 10 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: [0, -8, 0] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.8, delay: 1.3 }
                : {
                    opacity: { duration: 0.8, delay: 1.3 + delay },
                    y: { duration, repeat: Infinity, ease: "easeInOut", delay: 1.3 + delay },
                  }
            }
          >
            <Icon className="w-3 h-3 text-cyan-300" />
            {label}
          </motion.div>
        ))}

      {/* ===== HERO CONTENT ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={
          interactive ? { x: parallaxX, y: parallaxY } : undefined
        }
        className="relative flex flex-col items-center text-center max-w-3xl w-full"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="group inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-400/20 bg-cyan-500/5 backdrop-blur-sm mb-3 md:mb-5 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-300/90">
            {t("hero.available")}
          </span>
        </motion.div>

        {/* Título Principal */}
        <h1 className="font-heading font-bold tracking-[-0.03em] leading-[0.95] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          {headline.map((word, i) => (
            <motion.span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.9,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <motion.span
                  className={i === 1 ? "inline-block text-gradient bg-[length:200%_auto]" : "inline-block text-slate-50"}
                  animate={
                    i === 1 && !shouldReduceMotion
                      ? {
                          backgroundPosition: ["0% center", "200% center"],
                          x: [0, -2, 2, -1, 0],
                        }
                      : undefined
                  }
                  transition={
                    i === 1
                      ? {
                          backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear", delay: 1.2 },
                          x: { duration: 0.4, delay: 1.05, times: [0, 0.2, 0.45, 0.7, 1] },
                        }
                      : undefined
                  }
                >
                  {word}
                </motion.span>
              </motion.span>
            </motion.span>
          ))}
        </h1>

        {/* Nome */}
        <motion.h2
          variants={fadeUp}
          className="mt-2 md:mt-3 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-slate-100"
        >
          {NAME}
        </motion.h2>

        {/* Descrição */}
        <motion.p
          variants={fadeUp}
          className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed px-2"
        >
          {t("hero.description")}
        </motion.p>

        {/* Botões */}
        <motion.div
          variants={fadeUp}
          className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 justify-center w-full sm:w-auto"
        >
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full sm:w-auto rounded-full shadow-[0_0_0_rgba(34,211,238,0)] hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] transition-shadow duration-500"
          >
            <MagneticButton
              onClick={() => onNavigate("projects")}
              className="group w-full sm:w-auto"
            >
              {t("hero.viewProjects")}{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <MagneticButton
              onClick={() => onNavigate("contact")}
              variant="secondary"
              className="group w-full sm:w-auto"
            >
              {t("hero.contact")}{" "}
              <Mail className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          variants={fadeUp}
          className="mt-5 md:mt-8 grid grid-cols-3 gap-3 sm:gap-8 md:gap-16 w-full max-w-lg"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 + i * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <div className={`font-heading font-bold text-gradient-subtle ${s.size}`}>
                {s.counter
                  ? `${count}${s.suffix ?? ""}`
                  : s.valueKey
                    ? t(s.valueKey)
                    : s.value}
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-slate-500 mt-1">
                {t(`hero.stats.labels.${s.id}`).toUpperCase()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => onNavigate("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.25em] text-slate-500 hover:text-cyan-300 transition-colors duration-300 flex flex-col items-center gap-1.5"
      >
        {t("hero.scrollDown")}
        <span className="relative w-px h-5 overflow-hidden bg-slate-700/50">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-cyan-400 to-transparent"
            animate={shouldReduceMotion ? undefined : { top: ["-20%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}