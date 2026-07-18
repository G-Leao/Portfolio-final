import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";
import logoImg from "@/assets/img/logoGustavo.png";
import ParticleField from "@/components/ParticleField";

const ROLES = [
  {
    period: "2025 — Presente",
    role: "Consultor de Vendas",
    company: "Gravina Jóias e Relógios",
    desc: "Atendimento ao cliente, organização, negociação e desenvolvimento de habilidades interpessoais essenciais.",
    achievements: [
      "Atendimento ao cliente",
      "Organização e gestão",
      "Negociação",
      "Relacionamento com clientes",
      "Trabalho em equipe",
      "Resolução de problemas",
    ],
  },
];

const EDUCATION = [
  {
    period: "2025 — Presente",
    role: "Engenharia de Software",
    company: "Universidade",
    desc: "Em andamento. Foco em desenvolvimento web, programação, boas práticas e engenharia de software.",
    highlight: true,
  },
  {
    period: "2024 - Fim do ensino médio",
    role: "Ensino Médio",
    company: "Escola",
    desc: "Início na programação e fundamentos de lógica.",
  },
  {
    period: "2023 - Ensino médio",
    role: "Programação",
    company: "Escola",
    desc: "Início dos estudos em desenvolvimento web.",
  },
  {
    period: "2022 - Conhecendo a Tecnologia",
    role: "Escola",
    company: "Escola",
    desc: "Conhecendo o HTML e o CSS",
  },
];

function TimelineEntry({ item, index, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.15 + index * 0.12,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative mb-10 last:mb-0"
    >
      <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] ring-4 ring-[#020617]" />
      <div className="text-[11px] font-mono text-cyan-400/70 mb-1">
        {item.period}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4 text-indigo-300/70" />
        <h4 className="text-lg font-semibold text-slate-50">{item.role}</h4>
      </div>
      <div className="text-sm text-indigo-300/80 mb-2">{item.company}</div>
      <p className="text-sm text-slate-400 leading-relaxed mb-3 max-w-lg">
        {item.desc}
      </p>
      {item.achievements && (
        <ul className="space-y-1.5">
          {item.achievements.map((a) => (
            <li
              key={a}
              className="flex items-start gap-2 text-xs text-slate-400"
            >
              <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function EducationEntry({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15 + index * 0.15,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="relative mb-6 last:mb-0 group"
    >
      {/* Timeline dot with glow */}
      <div className="absolute -left-[37px] top-6 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-300 to-indigo-500 shadow-[0_0_16px_rgba(34,211,238,0.8)] ring-4 ring-[#020617] z-10 group-hover:shadow-[0_0_24px_rgba(34,211,238,1)] group-hover:scale-110 transition-all duration-500" />

      {/* Card with border */}
      <div className="relative ml-0 rounded-xl border border-white/[0.06] px-4 md:px-5 py-4 md:py-5 transition-all duration-500 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
        {/* Top row: period + badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] font-mono text-cyan-400/60 group-hover:text-cyan-300/80 transition-colors duration-500">
            {item.period}
          </div>
          {item.highlight && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider uppercase rounded-full bg-gradient-to-r from-cyan-400/15 to-indigo-500/15 border border-cyan-400/20 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]">
              <Sparkles className="w-2.5 h-2.5" />
              Atual
            </span>
          )}
        </div>

        {/* Role + Icon */}
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 border border-white/[0.06] flex items-center justify-center group-hover:from-cyan-400/20 group-hover:to-indigo-500/20 group-hover:border-cyan-400/20 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <GraduationCap className="w-4 h-4 text-cyan-300/80 group-hover:text-cyan-200 transition-colors duration-500" />
          </div>
          <h4 className="text-base md:text-lg font-semibold text-slate-50 group-hover:text-white transition-colors duration-500">
            {item.role}
          </h4>
        </div>

        {/* Company */}
        <div className="flex items-center gap-1.5 mb-2 ml-[42px]">
          <BookOpen className="w-3 h-3 text-indigo-400/60" />
          <span className="text-xs text-indigo-300/70 group-hover:text-indigo-200/90 transition-colors duration-500">
            {item.company}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed ml-[42px] group-hover:text-slate-300 transition-colors duration-500">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience({ onNavigate }) {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16">
      {/* Two-column Hero */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-3">
              //EXPERIÊNCIA
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95] mb-6">
              A <span className="text-gradient">Trajetória</span>
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-md text-[15px]">
              Cada etapa da minha carreira tem sido uma oportunidade de
              aprendizado e crescimento. Da descoberta da programação à
              construção de interfaces modernas, minha trajetória reflete
              dedicação e evolução constante.
            </p>
          </motion.div>

          {/* Right: Logo flutuante premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Halo azul */}
              <div className="absolute -inset-6 rounded-full bg-blue-400/20 blur-3xl" />

              {/* Brilho suave interno */}
              <div className="absolute -inset-3 rounded-full bg-blue-500/10 blur-2xl" />

              {/* Partículas dinâmicas */}
              <ParticleField isHovered={isLogoHovered} />

              {/* Logo */}
              <div className="relative">
                <img
                  src={logoImg}
                  alt="Gustavo Leão"
                  className="h-10 md:h-60 w-auto object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 0 25px rgba(59,130,246,0.30)) drop-shadow(0 0 60px rgba(59,130,246,0.15))",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Professional Experience */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="w-4 h-4 text-cyan-300" />
            <h3 className="text-sm font-mono tracking-[0.2em] text-slate-300 uppercase">
              Profissional
            </h3>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-indigo-500/30 to-transparent" />
            {ROLES.map((r, i) => (
              <TimelineEntry
                key={r.period}
                item={r}
                index={i}
                icon={Briefcase}
              />
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="relative mb-16">
          {/* Glow suave de fundo */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-400/[0.04] via-indigo-500/[0.06] to-transparent blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-4 h-4 text-cyan-300" />
            <h3 className="text-sm font-mono tracking-[0.2em] text-slate-300 uppercase">
              Formação
            </h3>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-indigo-500/30 to-transparent" />
            {EDUCATION.map((e, i) => (
              <EducationEntry key={e.period} item={e} index={i} />
            ))}
          </div>
        </div>

        <motion.button
          onClick={() => onNavigate("contact")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors group"
        >
          Vamos construir algo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
