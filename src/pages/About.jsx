import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";
import {
  Target,
  Sparkles,
  Compass,
  ArrowRight,
  Search,
  ListChecks,
  Code2,
  TrendingUp,
} from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiVite,
  SiPostgresql,
} from "react-icons/si";
import ABOUT_IMAGE from "../assets/img/gustavo.jpeg";
import logoImg from "@/assets/img/logoGustavo.png";

const VALUES = [
  {
    icon: Target,
    title: "Precisão",
    desc: "Cada linha de código, cada interação e cada detalhe são desenvolvidos com atenção e cuidado, focando em entregar a melhor experiência possível.",
  },
  {
    icon: Sparkles,
    title: "Qualidade",
    desc: "Código limpo e boas práticas são fundamentais. Interfaces modernas e responsivas que se destacam pela excelência.",
  },
  {
    icon: Compass,
    title: "Visão",
    desc: "Sempre aprendendo e evoluindo, construindo interfaces que não apenas funcionam, mas entregam valor real aos usuários.",
  },
];

const KNOWLEDGE = [
  { name: "HTML5", level: 85 },
  { name: "CSS3", level: 80 },
  { name: "Responsividade", level: 60 },
  { name: "JavaScript", level: 50 },
  { name: "React", level: 45 },
  { name: "Git", level: 40 },
  { name: "Tailwind CSS", level: 25 },
  { name: "APIs REST", level: 15 },
  { name: "TypeScript", level: 10 },
  { name: "SQL", level: 10 },
];

const STACK = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Git", Icon: SiGit, color: "#F05033" },
  { name: "GitHub", Icon: SiGithub, color: "#E5E7EB" },
  { name: "Vite", Icon: SiVite, color: "#8B8FF7" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4B8BBE" },
];

const PROCESS = [
  {
    icon: Search,
    title: "Entender",
    desc: "Analiso o problema, o público e os objetivos antes de qualquer linha de código.",
  },
  {
    icon: ListChecks,
    title: "Planejar",
    desc: "Organizo estrutura, fluxo de telas e prioridades técnicas.",
  },
  {
    icon: Code2,
    title: "Desenvolver",
    desc: "Construo com código limpo, componentizado e de fácil manutenção.",
  },
  {
    icon: TrendingUp,
    title: "Evoluir",
    desc: "Refino, otimizo performance e aplico o que aprendo em cada entrega.",
  },
];

const TERMINAL_LINE =
  "const dev = { nome: 'Gustavo Leão', foco: 'front-end', status: 'em evolução' };";

// Cursor piscante — cursor único, reutilizado via CSS animation
function BlinkCursor() {
  return (
    <span
      className="inline-block w-[6px] h-[12px] bg-cyan-400/70 translate-y-[1px] ml-0.5"
      style={{ animation: "blink-caret 1.1s step-end infinite" }}
    />
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-4">
      {children}
      <BlinkCursor />
    </div>
  );
}

function TerminalTypeline({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [chars, setChars] = useState(shouldReduceMotion ? text.length : 0);
  const [done, setDone] = useState(shouldReduceMotion);

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(id);
  }, [inView, text, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      className="font-mono text-[11px] sm:text-xs text-slate-500 mb-5 break-all"
    >
      <span className="text-cyan-400/60">{"&gt; "}</span>
      <span className="text-slate-400">{text.slice(0, chars)}</span>
      {done && <BlinkCursor />}
    </div>
  );
}

function ViewCounter({ value, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1,
      delay,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, delay, shouldReduceMotion]);

  return <span ref={ref}>{display}%</span>;
}

// Indicador circular — backdrop-blur removido do card (era o mais pesado nos 10 cards simultâneos)
function RadialSkill({ name, level, index }) {
  const shouldReduceMotion = useReducedMotion();
  const size = 92;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/[0.07] bg-slate-950/70 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-slate-900/80 hover:shadow-[0_22px_45px_rgba(34,211,238,0.13)]"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#knowledgeGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference - (level / 100) * circumference,
            }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              delay: index * 0.06 + 0.15,
              duration: 1,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-mono font-semibold text-slate-100 tabular-nums">
            <ViewCounter value={level} delay={index * 0.06 + 0.15} />
          </span>
        </div>
      </div>
      <span className="text-xs text-slate-300 text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

// StackCard otimizado: sem useMotionValue por card (era 11 pares de springs simultâneos)
// Mantém o efeito hover via CSS transform — visualmente idêntico, muito mais leve
function StackCard({ name, Icon, color, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="group relative flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-slate-950/70 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_20px_45px_rgba(34,211,238,0.16)] cursor-default"
    >
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Icon
        className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform duration-500 group-hover:scale-110"
        style={{ color }}
      />
      <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors duration-500 relative z-10 text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

// ProcessStep: animação de scroll via CSS + IntersectionObserver em vez de múltiplos useTransform
function ProcessStep({ step, index, isLast, shouldReduceMotion }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <div className="flex items-center gap-4 lg:flex-1" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className={`group relative flex-1 p-5 rounded-2xl border bg-slate-950/70 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:bg-slate-900/80 hover:shadow-[0_22px_50px_rgba(34,211,238,0.14)] ${
          inView ? "border-cyan-400/25" : "border-white/[0.07]"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl border border-cyan-400/20 flex items-center justify-center mb-4 transition-all duration-500 ${
            inView ? "bg-cyan-500/20 scale-105" : "bg-cyan-500/08"
          }`}
        >
          <Icon className="w-5 h-5 text-cyan-300" />
        </div>
        <h4 className="font-heading font-semibold text-slate-100 mb-1.5">
          {step.title}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
      </motion.div>

      {!isLast && (
        <ArrowRight className="hidden lg:block w-4 h-4 text-cyan-400/30 shrink-0" />
      )}
    </div>
  );
}

function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 6,
  }));
}

export default function About({ onNavigate, activePage }) {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(() => makeParticles(10), []);

  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setMounted(true);
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  const tiltEnabled = mounted && !isTouch && !shouldReduceMotion;

  const sectionRef = useRef(null);
  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  // Spring mais suave = menos cálculos por frame
  const spotSpringX = useSpring(spotX, { stiffness: 80, damping: 25 });
  const spotSpringY = useSpring(spotY, { stiffness: 80, damping: 25 });
  const spotlightBg = useMotionTemplate`radial-gradient(480px circle at ${spotSpringX}px ${spotSpringY}px, rgba(34,211,238,0.05), transparent 65%)`;

  const handleSectionMouseMove = (e) => {
    if (!tiltEnabled || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  // useScroll apenas para blobs de fundo — sem scroll observer no ProcessStep
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  // Tilt 3D na foto
  const imgRef = useRef(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springRX = useSpring(tiltY, { stiffness: 150, damping: 18 });
  const springRY = useSpring(tiltX, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(springRX, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springRY, [-0.5, 0.5], [-7, 7]);

  const handleImageMouseMove = (e) => {
    if (!tiltEnabled || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleImageMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      data-active={activePage}
      onMouseMove={handleSectionMouseMove}
      className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Gradiente usado nos indicadores circulares */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="knowledgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Spotlight cursor — apenas desktop sem reduced motion */}
      {tiltEnabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: spotlightBg }}
        />
      )}

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 20% 10%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 20% 10%, black 30%, transparent 75%)",
          }}
        />
        <motion.div
          className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-cyan-500/8 blur-[100px]"
          style={{ y: shouldReduceMotion ? 0 : blob1Y }}
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[24rem] h-[24rem] rounded-full bg-indigo-600/8 blur-[100px]"
          style={{ y: shouldReduceMotion ? 0 : blob2Y }}
          animate={shouldReduceMotion ? undefined : { opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        {mounted && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {particles.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={0.15}
                fill="rgba(103,232,249,0.45)"
                animate={shouldReduceMotion ? undefined : { opacity: [0.15, 0.65, 0.15] }}
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
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-6 left-6 md:top-8 md:left-10 lg:left-16 z-10"
      >
        <img src={logoImg} alt="Gustavo Leão" className="h-6 md:h-10 w-auto object-contain" loading="lazy" />
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
        {/* SOBRE MIM */}
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <SectionLabel>// SOBRE MIM</SectionLabel>

            <motion.div
              ref={imgRef}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              style={{
                ...(tiltEnabled ? { rotateX, rotateY, transformPerspective: 800 } : {}),
                y: shouldReduceMotion ? 0 : imageParallaxY,
              }}
              className="relative rounded-2xl overflow-hidden border border-white/10 mb-8 group max-w-sm mx-auto lg:mx-0"
            >
              <img
                src={ABOUT_IMAGE}
                alt="Gustavo Leão - Desenvolvedor Front-end"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(34,211,238,0.10)]" />

              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-cyan-300/40 rounded-tl-sm" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-cyan-300/40 rounded-tr-sm" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cyan-300/40 rounded-bl-sm" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cyan-300/40 rounded-br-sm" />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-mono tracking-[0.2em] text-cyan-300/70">
                  DESENVOLVEDOR FRONT-END
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-center"
          >
            <TerminalTypeline text={TERMINAL_LINE} />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
              Desenvolvedor <span className="text-gradient">Front-end</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5 text-[15px]">
              Sou estudante de Engenharia de Software e desenvolvedor focado em
              criar aplicações web modernas, responsivas e funcionais. Gosto de
              transformar ideias em interfaces bem estruturadas e experiências
              simples de utilizar.
            </p>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Atualmente, estou aprofundando meus conhecimentos em React,
              TypeScript, APIs e desenvolvimento Full Stack, sempre colocando o
              aprendizado em prática através de projetos próprios.
            </p>

            <div className="mt-8 grid gap-3">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                    className="group relative flex gap-4 p-4 rounded-2xl border border-white/[0.07] bg-slate-950/60 shadow-[0_8px_25px_rgba(0,0,0,0.22)] transition-all duration-500 overflow-hidden hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-slate-900/70 hover:shadow-[0_18px_40px_rgba(34,211,238,0.12)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-100 mb-0.5 text-sm">{v.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* NÍVEL DE CONHECIMENTO */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>// NÍVEL DE CONHECIMENTO</SectionLabel>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Tecnologias que domino
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
            {KNOWLEDGE.map((skill, i) => (
              <RadialSkill key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>
        </div>

        {/* STACK */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>// STACK</SectionLabel>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Ferramentas do dia a dia
            </h3>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {STACK.map(({ name, Icon, color }, i) => (
              <StackCard
                key={name}
                name={name}
                Icon={Icon}
                color={color}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* COMO EU TRABALHO */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>// COMO EU TRABALHO</SectionLabel>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Meu processo
            </h3>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4">
            {PROCESS.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={i}
                isLast={i === PROCESS.length - 1}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start"
        >
          <button
            onClick={() => onNavigate("experience")}
            className="group relative inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            Ver experiência completa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-400/60 transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
