import { motion } from "framer-motion";
import { Target, Sparkles, Compass, ArrowRight } from "lucide-react";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop";

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

const JOURNEY = [
  {
    year: "2024 //",
    title: "Estudante de Engenharia de Software",
    org: "Universidade",
    desc: "Focado em desenvolvimento web e interfaces modernas, desenvolvendo projetos próprios para construir uma carreira sólida na área de tecnologia.",
  },
  {
    year: "2023 //",
    title: "Consultor de Vendas",
    org: "Gravina Jóias e Relógios",
    desc: "Atendimento ao cliente, organização, negociação e desenvolvimento de habilidades interpessoais essenciais para o trabalho em equipe.",
  },
  {
    year: "2022 //",
    title: "Início do Aprendizado",
    org: "Autodidata",
    desc: "Comecei a estudar desenvolvimento web com HTML, CSS e JavaScript. Apaixonado por tecnologia e interfaces modernas.",
  },
  {
    year: "2021 //",
    title: "O Início",
    org: "Primeiros Passos",
    desc: "Descobri a paixão pela programação e pelo desenvolvimento front-end. Decidi seguir carreira na área de tecnologia.",
  },
];

export default function About({ onNavigate }) {
  return (
    <section className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16">
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

        {/* Right: Chronology */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-4">
              // JORNADA
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-10">
              Minha Trajetória
            </h3>
          </motion.div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-indigo-500/30 to-transparent" />

            {JOURNEY.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2 + i * 0.14,
                  duration: 0.7,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="relative mb-10 last:mb-0"
              >
                <div className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] ring-4 ring-[#020617]" />
                <div className="text-[11px] font-mono text-cyan-400/70 mb-1">
                  {item.year}
                </div>
                <h4 className="text-lg font-semibold text-slate-50 mb-0.5">
                  {item.title}
                </h4>
                <div className="text-sm text-indigo-300/80 mb-2">
                  {item.org}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => onNavigate("experience")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors group"
          >
            Ver experiência completa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
