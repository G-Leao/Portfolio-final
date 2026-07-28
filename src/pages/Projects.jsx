import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import WatchHub from "../assets/img/WATCHHUB.png";
import Port from "../assets/img/Portfolio.png";
import Gestao from "../assets/img/siSTEMAGESTAO.png";
import Ar from "../assets/img/aresportes.png";
import Cadastro from "../assets/img/cadastro.png";
import login from "../assets/img/login.png";

const PROJECTS = [
  {
    title: "Portfólio Profissional",
    category: "React",
    description:
      "Meu portfólio desenvolvido em React com foco em performance, design moderno e experiência do usuário.",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    image: Port,
    github: "https://github.com/G-Leao/Portfolio-final",
    live: "https://gustavol.vercel.app/",
  },
  {
    title: "Sistema de Gestão de Vendas",
    category: "Web App",
    description:
      "Sistema desenvolvido para gerenciamento de vendas, clientes e fluxo comercial.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Gestao,
    github: "https://github.com/G-Leao/Sistema-de-gestao-de-vendas",
    live: "https://sistema-de-gestao-de-vendas-black.vercel.app/",
  },
  {
    title: "Watch Hub",
    category: "Web App",
    description:
      "Aplicação para cadastro, gerenciamento e Comparação de Relógios.",
    tech: ["React", "Vite", " Css", "JavaScript"],
    image: WatchHub,
    github: "https://github.com/G-Leao/watch-hub",
    live: "https://watch-hub-nine.vercel.app/",
  },
  {
    title: "AR Esportes",
    category: "Web App",
    description: "Aplicação Institucional Para academia de judô",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Ar,
    github: "https://github.com/G-Leao/ar-esportes-landing-page",
    live: "https://ar-hazel-tau.vercel.app/",
  },
  {
    title: "Sistema de Cadastro",
    category: "Web App",
    description:
      "Aplicação para cadastro e gerenciamento de usuários utilizando JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Cadastro,
    github: "https://github.com/G-Leao/pagina-de-cadastro",
    live: "https://pagina-de-cadastro-nu.vercel.app/",
  },
  {
    title: "Interface de Login",
    category: "UI/UX",
    description:
      "Tela de autenticação moderna com design responsivo e experiência do usuário otimizada.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: login,
    github: "https://github.com/G-Leao/login",
    live: "https://login-page-eight-blush.vercel.app/",
  },
];

export default function Projects({ onNavigate }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 440, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen py-24 md:py-28 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400/80 mb-3">
              // PROJETOS
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
              Projetos <span className="text-gradient">Selecionados</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
            Uma seleção de projetos onde desenvolvimento front-end encontra
            design moderno. Passe o mouse para explorar.
          </p>
        </motion.div>

        <div className="relative group/carousel">
          <div
            ref={scrollRef}
            className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16"
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
            {/* End spacer */}
            <div className="shrink-0 w-1" />
          </div>

          {/* Arrows - always visible on mobile, hover on desktop */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Projetos anteriores"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#020617]/90 md:bg-[#020617]/80 backdrop-blur-xl flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 z-10"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Próximos projetos"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 bg-[#020617]/90 md:bg-[#020617]/80 backdrop-blur-xl flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 z-10"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex items-center gap-3 text-sm text-slate-500"
        >
          <span className="font-mono text-cyan-400/60">04 / 04</span>
          <span className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-cyan-400/30 to-transparent" />
          <button
            onClick={() => onNavigate("experience")}
            className="text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            Ver experiência →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
