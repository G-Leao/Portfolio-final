import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import FloatingNav from "@/components/FloatingNav";

const HEADLINE = ["DESENVOLVEDOR", "FRONT-END"];
const NAME = "Gustavo Leão";

const STATS = [
  { value: "10+", label: "Projetos" },
  { value: "100%", label: "Dedicação" },
  { value: "24/7", label: "Aprendizado" },
];

export default function Home({ onNavigate, activePage }) {
  const sectionRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const tx = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const ty = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Header - Navegação */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="w-full mb-16"
      >
        <FloatingNav
          activePage={activePage}
          onNavigate={onNavigate}
          showLogo={true}
          fixed={false}
        />
      </motion.header>

      {/* Hero Content - Centralizado */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col items-center text-center max-w-3xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/5 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-300/90">
            DISPONÍVEL PARA PROJETOS
          </span>
        </motion.div>

        {/* Título Principal */}
        <h1 className="font-heading font-bold tracking-[-0.03em] leading-[0.92] text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[8rem]">
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word}
              className="block overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.9,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <span className={i === 1 ? "text-gradient" : "text-slate-50"}>
                  {word}
                </span>
              </motion.span>
            </motion.span>
          ))}
        </h1>

        {/* Nome */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-slate-100"
        >
          {NAME}
        </motion.h2>

        {/* Descrição */}
        <motion.p
          style={{ x: tx, y: ty }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          Construo interfaces modernas, rápidas e intuitivas utilizando HTML,
          CSS, JavaScript, React e tecnologias atuais, sempre buscando entregar
          experiências digitais de alta qualidade.
        </motion.p>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <MagneticButton onClick={() => onNavigate("projects")}>
            Ver Projetos <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            onClick={() => onNavigate("contact")}
            variant="secondary"
          >
            Contato <Mail className="w-4 h-4" />
          </MagneticButton>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-14 flex items-center justify-center gap-10 md:gap-16"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-bold text-gradient-subtle">
                {s.value}
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-slate-500 mt-1">
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => onNavigate("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.25em] text-slate-500 hover:text-cyan-300 transition-colors duration-300 flex flex-col items-center gap-2"
      >
        SAIBA MAIS
        <span className="w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent animate-pulse-glow" />
      </motion.button>
    </section>
  );
}
