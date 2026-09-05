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
import Port from "../assets/img/Portfolio.png";
import Gestao from "../assets/img/siSTEMAGESTAO.png";
import Ar from "../assets/img/aresportes.png";
import Cadastro from "../assets/img/cadastro.png";
import login from "../assets/img/login.png";
import Advocacia from "../assets/img/bilobran.png";
import PubliBus from "../assets/img/publibus.png"; 

const PROJECTS = [
  {
    title: "Portfólio Profissional",
    category: "React",
    description:
      "Portfólio pessoal desenvolvido em React para apresentar meus projetos, habilidades e experiências, com foco em uma interface moderna, responsiva e interativa..",
    fullDescription:
      "Desenvolvi este portfólio como uma forma de apresentar meu trabalho e minha evolução na área de desenvolvimento de software. A aplicação foi construída pensando não apenas no visual, mas também na experiência de navegação, utilizando animações, transições e componentes reutilizáveis para criar uma experiência mais dinâmica.",
    features: [
      "Navegação fluida entre seções com animações",
      "Design responsivo para mobile, tablet e desktop",
      "Componentização reutilizável em React",
      "Build otimizado com Vite para carregamento rápido",
    ],
    challenges:
      "Equilibrar um visual rico em animações (Framer Motion, gradientes, efeitos de glassmorphism) sem comprometer a performance de carregamento e a fluidez em dispositivos mais fracos.",
    solution:
      "Uso de componentes leves e reutilizáveis, lazy loading de assets e ajuste fino das transições do Framer Motion para manter 60fps mesmo em telas mais simples.",
    objective:
      "Servir como cartão de visitas técnico, demonstrando domínio de React, animações e boas práticas de UI/UX.",
    status: "Concluído",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    image: Port,
    github: "https://github.com/G-Leao/Portfolio-final",
    live: "https://gustavol.vercel.app/",
  },
  {
    title: "Sistema de Gestão de Vendas",
    category: "Web App",
    description:
      "Sistema web desenvolvido para organizar vendas, clientes e informações comerciais em uma única plataforma. ",
    fullDescription:
      "Sistema web voltado para times comerciais, permitindo cadastrar clientes, registrar vendas e acompanhar o fluxo comercial do dia a dia de forma organizada. O objetivo foi substituir controles manuais (planilhas soltas) por uma interface única e centralizada.",
    features: [
      "Cadastro e gerenciamento de clientes",
      "Registro e histórico de vendas",
      "Organização do fluxo comercial em uma única tela",
      "Interface pensada para uso rápido no dia a dia",
    ],
    challenges:
      "Estruturar os dados de vendas e clientes de forma organizada usando apenas tecnologias base (HTML, CSS e JavaScript puro), sem um framework para gerenciar estado.",
    solution:
      "Modelagem cuidadosa dos dados em JavaScript e manipulação direta do DOM para manter a interface reativa e sincronizada com as informações cadastradas.",
    objective:
      "Facilitar a rotina do time comercial, reduzindo erros e retrabalho causados por controles manuais dispersos.",
    status: "Concluído",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Gestao,
    github: "https://github.com/G-Leao/Sistema-de-gestao-de-vendas",
    live: "https://sistema-de-gestao-de-vendas-black.vercel.app/",
  },
  {
    title: "Watch Hub",
    category: "Web App React",
    description:
      "Aplicação para cadastro, gerenciamento e comparação de relógios.",
    fullDescription:
      "Aplicação voltada para colecionadores e entusiastas de relógios, permitindo cadastrar peças da coleção, organizar informações de cada modelo e compará-los lado a lado para apoiar decisões de compra ou apenas organizar o acervo pessoal.",
    features: [
      "Cadastro de relógios com detalhes específicos de cada modelo",
      "Comparação lado a lado entre dois ou mais relógios",
      "Organização visual da coleção do usuário",
      "Interface reativa construída em componentes React",
    ],
    challenges:
      "Criar uma lógica de comparação que fosse clara visualmente, destacando diferenças entre os modelos sem poluir a tela com informação demais.",
    solution:
      "Divisão da interface em componentes independentes por relógio e uso de estado do React para sincronizar a seleção e a exibição comparativa em tempo real.",
    objective:
      "Oferecer uma ferramenta simples e visual para organizar e comparar itens de uma coleção.",
    status: "Concluído",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    image: WatchHub,
    github: "https://github.com/G-Leao/watch-hub",
    live: "https://watch-hub-nine.vercel.app/",
  },
  {
    title: "PUBLI-BUS",
    category: "Sistema Web Full Stack",
    description:
      "Plataforma para gerenciamento de publicidade em ônibus, permitindo controlar anunciantes, campanhas e espaços publicitários.",
    fullDescription:
      "Sistema desenvolvido para facilitar o gerenciamento de campanhas publicitárias veiculadas em ônibus. A plataforma centraliza informações de anunciantes, campanhas e espaços publicitários, oferecendo uma interface administrativa para acompanhar e organizar as operações de forma mais prática e eficiente.",
    features: [
      "Cadastro e gerenciamento de anunciantes",
      "Criação e gerenciamento de campanhas publicitárias",
      "Controle de espaços e dispositivos de exibição",
      "Sistema de autenticação e gerenciamento de usuários",
      "Dashboard para acompanhamento das informações",
      "Integração entre frontend, API e banco de dados",
    ],
    challenges:
      "Criar uma aplicação completa que conectasse o frontend ao backend e ao banco de dados, mantendo os dados seguros, organizados e sincronizados.",
    solution:
      "Desenvolvimento de uma arquitetura full stack utilizando React no frontend, Node.js e Express no backend, Prisma para comunicação com o banco de dados e autenticação para controle de acesso.",
    objective:
      "Criar uma plataforma centralizada para gerenciar publicidade em ônibus, tornando o controle de anunciantes e campanhas mais organizado e eficiente.",
    status: "Concluído",
    tech: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Vercel",
      "Railway",
    ],
    image: PubliBus,
    github: "https://github.com/G-Leao/PUBLI-BUS",
    live: "https://publi-bus.vercel.app/",
  },

  {
    title: "AR Esportes",
    category: "Web App",
    description:
      "Site institucional para academia de judô, apresentando marca e modalidades.",
    fullDescription:
      "Landing page institucional desenvolvida para uma academia de judô, com o objetivo de apresentar a marca, as modalidades oferecidas e os canais de contato de forma clara, direta e responsiva, facilitando a captação de novos alunos.",
    features: [
      "Seção de apresentação da marca e modalidades",
      "Layout responsivo para acesso via celular",
      "Chamadas para contato e matrícula em destaque",
      "Estrutura leve, com carregamento rápido",
    ],
    challenges:
      "Transmitir a identidade e a energia de uma academia esportiva usando apenas HTML, CSS e JavaScript, sem recorrer a bibliotecas visuais prontas.",
    solution:
      "Uso de CSS customizado com foco em tipografia forte, contrastes e uma estrutura de seções objetiva, priorizando a jornada do visitante até o contato.",
    objective:
      "Aumentar a presença digital da academia e facilitar o primeiro contato de possíveis alunos.",
    status: "Concluído",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Ar,
    github: "https://github.com/G-Leao/ar-esportes-landing-page",
    live: "https://ar-hazel-tau.vercel.app/",
  },
  {
    title: "Advocacia Bilobran & Palaci",
    category: "Web App",
    description:
      "Site institucional para escritório de advocacia, com áreas de atuação e contato.",
    fullDescription:
      "Site institucional desenvolvido para um escritório de advocacia, apresentando as áreas de atuação, a proposta de valor do escritório e os canais de contato, com um visual mais sóbrio e profissional, alinhado ao segmento jurídico.",
    features: [
      "Apresentação das áreas de atuação do escritório",
      "Seção institucional sobre o escritório",
      "Canais de contato em destaque",
      "Layout responsivo e visual sóbrio, adequado ao segmento",
    ],
    challenges:
      "Adaptar a linguagem visual para um público e segmento diferente do usual (jurídico), priorizando seriedade e confiança em vez de elementos mais chamativos.",
    solution:
      "Definição de uma paleta e tipografia mais sóbrias, com foco em legibilidade e organização clara das informações institucionais e de contato.",
    objective:
      "Fortalecer a presença digital do escritório e transmitir credibilidade a potenciais clientes.",
    status: "Concluído",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Advocacia,
    github: "https://github.com/G-Leao/advocacia",
    live: "https://www.bilobranpalaciadvogados.com.br/",
  },
  {
    title: "Sistema de Cadastro",
    category: "Web App",
    description:
      "Aplicação para cadastro e gerenciamento de usuários em JavaScript puro.",
    fullDescription:
      "Aplicação de cadastro de usuários construída em JavaScript puro, com validação de formulário e persistência simples de dados, focada em consolidar conceitos fundamentais de manipulação do DOM e lógica de validação sem depender de frameworks.",
    features: [
      "Formulário de cadastro com validação de campos",
      "Persistência simples dos dados cadastrados",
      "Listagem e gerenciamento dos usuários cadastrados",
      "Feedback visual de erros de preenchimento",
    ],
    challenges:
      "Implementar validações robustas de formulário e persistência de dados sem o auxílio de bibliotecas, utilizando apenas JavaScript puro.",
    solution:
      "Criação de funções de validação reutilizáveis e uso do armazenamento local do navegador para simular persistência dos dados entre sessões.",
    objective:
      "Reforçar fundamentos de JavaScript puro aplicados a um caso real de cadastro e validação de dados.",
    status: "Concluído",
    tech: ["HTML", "CSS", "JavaScript"],
    image: Cadastro,
    github: "https://github.com/G-Leao/pagina-de-cadastro",
    live: "https://pagina-de-cadastro-nu.vercel.app/",
  },
  {
    title: "Interface de Login",
    category: "UI/UX",
    description:
      "Tela de autenticação moderna com foco em experiência de conversão.",
    fullDescription:
      "Tela de autenticação (login) desenvolvida com foco em design moderno, transições suaves e boa experiência do usuário, priorizando clareza visual e redução de fricção no processo de entrada do usuário na aplicação.",
    features: [
      "Layout responsivo para diferentes tamanhos de tela",
      "Transições e microinterações suaves nos campos",
      "Validação visual de campos de e-mail e senha",
      "Design focado em conversão e clareza",
    ],
    challenges:
      "Criar uma experiência de autenticação que parecesse moderna e agradável sem exagerar em elementos visuais que atrapalhassem a usabilidade.",
    solution:
      "Uso de microinterações discretas em CSS/JS, hierarquia visual clara entre os campos e botões, e testes de usabilidade focados em reduzir a fricção do preenchimento.",
    objective:
      "Demonstrar boas práticas de UI/UX aplicadas a um fluxo crítico: a entrada do usuário no sistema.",
    status: "Concluído",
    tech: ["HTML", "CSS", "JavaScript"],
    image: login,
    github: "https://github.com/G-Leao/login",
    live: "https://login-page-eight-blush.vercel.app/",
  },
];

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
                aria-label="Fechar detalhes"
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
                    Descrição
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
                    Principais funcionalidades
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
                      Desafio
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
                      Solução
                    </h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">
                  Objetivo / Foco
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.objective}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">
                  Tecnologias
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-slate-300"
                    >
                      {t}
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
                  Ver ao vivo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Código
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
  const [[index, direction], setIndexState] = useState([0, 0]);
  const [selectedProject, setSelectedProject] = useState(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(null);
  const wheelCooldown = useRef(null);

  const total = PROJECTS.length;
  const project = PROJECTS[index];

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
              // PROJETOS
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95]">
              Projetos <span className="text-gradient">Selecionados</span>
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
                    key={project.title}
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
              aria-label="Projeto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => goTo(1)}
              aria-label="Próximo projeto"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative min-h-[280px]">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={project.title}
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
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 text-slate-300"
                    >
                      {t}
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
                    Ver ao vivo
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Código
                  </a>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/60 hover:text-cyan-200 hover:bg-cyan-400/5 transition-all duration-300"
                  >
                    Ver detalhes
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
            Ver experiência →
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
