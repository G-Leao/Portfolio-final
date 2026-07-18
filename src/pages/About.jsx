import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Compass,
  ArrowRight,
  Code2,
  Palette,
  Database,
  Layout,
  Globe,
  Smartphone,
  GitBranch,
  Terminal,
} from "lucide-react";
import ABOUT_IMAGE from "../assets/img/gustavo.jpeg";
import logoImg from "@/assets/img/logoGustavo.png";

const About_Image = ABOUT_IMAGE;

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

const SKILLS = [
  { name: "HTML5", level: 85, icon: Code2 },
  { name: "CSS3", level: 80, icon: Palette },
  { name: "JavaScript", level: 50, icon: Terminal },
  { name: "React", level: 45, icon: Layout },
  { name: "Tailwind CSS", level: 25, icon: Palette },
  { name: "TypeScript", level: 10, icon: Code2 },
  { name: "Git", level: 40, icon: GitBranch },
  { name: "Responsividade", level: 60, icon: Smartphone },
  { name: "APIs REST", level: 15, icon: Globe },
  { name: "SQL", level: 10, icon: Database },
];

export default function About({ onNavigate }) {
  return (
    <section className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16">
      {/* Logo no canto superior esquerdo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-6 left-6 md:top-8 md:left-10 lg:left-16 z-10"
      >
        <img
          src={logoImg}
          alt="Gustavo Leão"
          className="h-8 md:h-40 w-auto object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-16">
        {/* Left: Identity */}
        <div className="lg:sticky lg:top-24 self-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-4">
              // IDENTIDADE
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-8 group">
              <img
                src={ABOUT_IMAGE}
                alt="Gustavo Leão - Desenvolvedor Front-end"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-mono tracking-[0.2em] text-cyan-300/70">
                  DESENVOLVEDOR FRONT-END
                </div>
              </div>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
              Desenvolvedor <span className="text-gradient">Front-end</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5 text-[15px]">
              Sou estudante de Engenharia de Software apaixonado por
              desenvolvimento web e interfaces modernas. Tenho experiência com
              HTML, CSS, JavaScript e React, criando aplicações responsivas,
              elegantes e focadas na experiência do usuário.
            </p>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Estou em constante evolução, estudando novas tecnologias e
              desenvolvendo projetos próprios para construir uma carreira sólida
              na área de tecnologia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 grid gap-3"
          >
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                  className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-colors duration-500"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-100 mb-0.5 text-sm">
                      {v.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right: Skills */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-4">
              // SKILLS
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Tecnologias & Ferramentas
            </h3>
          </motion.div>

          <div className="grid gap-4">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 border border-white/[0.06] flex items-center justify-center group-hover:from-cyan-400/20 group-hover:to-indigo-500/20 group-hover:border-cyan-400/20 transition-all duration-500">
                      <Icon className="w-4 h-4 text-cyan-300/80 group-hover:text-cyan-200 transition-colors duration-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-500">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-[11px] font-mono text-slate-500 group-hover:text-cyan-400/70 transition-colors duration-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        delay: 0.3 + i * 0.08,
                        duration: 1,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400/60 via-indigo-400/50 to-cyan-400/60 group-hover:from-cyan-400/80 group-hover:via-indigo-400/70 group-hover:to-cyan-400/80 transition-all duration-500"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Idiomas & Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-12"
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-4">
              // EXTRAS
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Idiomas */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h4 className="text-xs font-mono tracking-wider text-cyan-300/70 mb-3 uppercase">
                  Idiomas
                </h4>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-200">Português</span>
                      <span className="text-[10px] font-mono text-cyan-400/60">
                        Nativo
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400/60 to-indigo-400/50"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-200">Inglês</span>
                      <span className="text-[10px] font-mono text-cyan-400/60">
                        Intermediário
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400/60 to-indigo-400/50"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <h4 className="text-xs font-mono tracking-wider text-cyan-300/70 mb-3 uppercase">
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Comunicação",
                    "Criatividade",
                    "Proatividade",
                    "Trabalho em Equipe",
                    "Resolução de Problemas",
                    "Adaptabilidade",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06] rounded-full hover:border-cyan-400/20 hover:text-cyan-300 transition-all duration-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={() => onNavigate("experience")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors group"
          >
            Ver experiência completa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
