import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react";

const ROLES = [
  {
    period: "2023 — Presente",
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
    period: "2023 — Presente",
    role: "Engenharia de Software",
    company: "Universidade",
    desc: "Em andamento. Foco em desenvolvimento web, programação e engenharia de software.",
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

export default function Experience({ onNavigate }) {
  return (
    <section className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-3">
            // EXPERIÊNCIA
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
            A <span className="text-gradient">Trajetória</span>
          </h2>
        </motion.div>

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
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-4 h-4 text-cyan-300" />
            <h3 className="text-sm font-mono tracking-[0.2em] text-slate-300 uppercase">
              Formação
            </h3>
          </div>
          <div className="relative pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 to-transparent" />
            {EDUCATION.map((e, i) => (
              <TimelineEntry
                key={e.period}
                item={e}
                index={i}
                icon={GraduationCap}
              />
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
